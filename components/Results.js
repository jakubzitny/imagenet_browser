// @flow

import React from 'react'
import styled from 'styled-components'
import uuid from 'uuid'

import Synset from './Synset'

import type { SynsetData } from '../pages/index.js'


const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`

type Props = {|
  data: ?Array<SynsetData>,
|}

export default class Results extends React.PureComponent<Props> {
  render() {
    const { data } = this.props
    if (!data) {
      return <ResultContainer>loading...</ResultContainer>
    }

    return (
      <ResultContainer>
        {data.map((entry) => (
          <Synset key={uuid.v4()} entry={entry} />
        ))}
      </ResultContainer>
    )
  }
}
