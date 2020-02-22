import sys
import json
from urllib.request import urlopen
from xml.etree.ElementTree import parse
from cloudant.client import CouchDB

RESOURCE_URL = 'http://imagenet.stanford.edu/python/tree.py/SubtreeXML?rootid='
ROOT_ID = 82127
ROOT_NAME = 'ImageNet 2011 Fall Release'
DELIMITER = ' > '

DEBUG = False
DB_SAVE_ON_FLY = False

def parse_subtree(raw_data):
  return parse(raw_data)

def fetch_subtree(root_id):
  return urlopen(RESOURCE_URL + str(root_id))

def fetch_rec(id, prefix, db, acc_list = []):
  raw_tree = fetch_subtree(id)
  parsed_tree = parse_subtree(raw_tree)

  for synset in parsed_tree.iterfind('synset'):
    num_children = synset.attrib['num_children']
    if num_children == 0:
      continue

    synset_id = synset.attrib['synsetid']
    size = int(synset.attrib['subtree_size']) - 1
    words = synset.attrib['words']
    name = prefix + DELIMITER + words

    if DEBUG:
      print(name)

    synset_data = {
      'name': name,
      'size': size,
    }
    acc_list.append(synset_data)

    if DB_SAVE_ON_FLY:
      doc = db.create_document(synset_data)
      if not doc.exists():
        print('Error writing doc')

    fetch_rec(synset_id, name, db, acc_list)

  return acc_list


def db_connect(db_name = 'testing3'):
  client = CouchDB("admin", "admin", url='http://127.0.0.1:5984', connect=True)
  try:
    return client[db_name]
  except:
    return client.create_database(db_name)


def print_db(db_name):
  db = db_connect(db_name)
  for doc in db:
    print(doc)


def load_to_db(db_name, file_name):
  db_list = db_connect(db_name)

  with open(file_name) as f:
    data = json.load(f)
    
    for entry in data:
      doc = db_list.create_document(entry)
      if not doc.exists():
        print('problem with creating document')


def fetch_data(file = 'data.json'):  
  db = db_connect()
  linear_data = fetch_rec(ROOT_ID, ROOT_NAME, db)

  with open(file, 'w') as f:
    json.dump(linear_data, f)

  print('Done')


def list_to_tree(db_list_name, db_tree_name):
  db_list = db_connect(db_list_name)
  db_tree = db_connect(db_tree_name)

  # create a root in the tree datab\se
  try:
    db_doc = db_tree['root']
  except:
    db_tree.create_document({ '_id': 'root', 'children': [] })
    db_doc = db_tree['root']

  for doc in db_list:
    name = doc['name']
    size = doc['size']

    if (DEBUG):
      print('processing ' + name + " " + str(size))

    path_parts = name.split(DELIMITER)
    db_doc_children = db_doc['children']
    for part in path_parts:
      try:
        found = [child for child in db_doc_children if child['name'] == part]
        if len(found) == 0:
          raise KeyError

        db_doc_children = found[0]['children']
        continue
      except:
        subtree_children = []
        subtree = { 'name': part, 'size': 444, 'children': subtree_children }
        db_doc_children.append(subtree)
        db_doc.save()
        db_doc_children = subtree_children


def main():
  if len(sys.argv) < 2 or sys.argv[1] == '-h':
    print('help')

  cmd = sys.argv[1]

  data_file = 'data.json'
  db_list_name = 'imagenet-list-full'
  db_tree_name = 'imagenet-tree-full'

  # save to file and db
  if cmd == 'fetch-data':
    fetch_data(data_file)

  # load from file to db (as a list)
  if cmd == 'file-to-db':
    load_to_db(db_name=db_list_name, file_name=data_file)

  # convert from list db to tree db
  if cmd == 'list-to-tree':
    list_to_tree(db_list_name, db_tree_name)

  if cmd == 'print-list':
    print_db(db_list_name)

  if cmd == 'print-tree':
    print_db(db_tree_name)

main()
