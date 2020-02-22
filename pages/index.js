// @flow

import React from 'react'
import styled from 'styled-components'

import SearchBox from '../components/SearchBox'
import Results from '../components/Results'

import FetchUtils from '../utils/fetch-utils'


const Title = styled.div`
  font-size: 2.2rem;
  text-transform: uppercase;
  font-weight: 700;
  height: 100px;
  color: #1532e2;
`

const Container = styled.div`
  padding: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export type SynsetData = {
  name: string,
  size: number,
}

type State = {|
  data: ?Array<SynsetData>,
|}

export default class Home extends React.PureComponent<{}, State> {
  state: State = {
    data: null,
  }

  componentDidMount() {
    this._fetchAndStoreData()
  }

  _fetchAndStoreData(searchString: ?string) {
    setImmediate(async () => {
      const data = await FetchUtils.fetch(searchString)
      this.setState({ data })
    })
  }

  _handleSearch = (searchString: string) => {
    this._fetchAndStoreData(searchString)
  }

  render() {
    return (
      <Container>
        <Title>Imagenet category browser</Title>
        <SearchBox onSearch={this._handleSearch} />
        <Results data={this.state.data} />
      </Container>
    )
  }
}
