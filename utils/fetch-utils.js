// @flow

const BACKEND_URL = 'http://127.0.0.1:5984'
const DB_NAME = 'testing3'

export default class FetchUtils {

  static queryParamToSelector(queryParam?: ?string) {
    if (!queryParam) {
      return {}
    }

    return {
      'name': {
        '$regex': `.*${queryParam}.*`
      },
    }
  }

  static async fetch(queryParam?: ?string) {
    const url = `${BACKEND_URL}/${DB_NAME}/_find`

    const fieldsToFetch = [ 'name', 'size' ]

    const response = await fetch(url, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        selector: FetchUtils.queryParamToSelector(queryParam),
        fields: fieldsToFetch,
      })
    })

    const data = await response.json()

    return data.docs
  }
}
