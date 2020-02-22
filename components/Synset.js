// @flow

import React from 'react'
import styled from 'styled-components'

import type { SynsetData } from '../pages/index.js'

type Props = {
  entry: SynsetData,
}

const Entry = styled.div`
  padding: 10px;
  font-size: 1.3rem;
  display: flex;
`

const EntryName = styled.div`
  flex: 1;
`

const EntrySize = styled.div`
  font-weight: 700;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Synset = (props: Props) => (
  <Entry>
    <EntryName>{props.entry.name}</EntryName>
    <EntrySize>{props.entry.size}</EntrySize>
  </Entry>
)

export default Synset
