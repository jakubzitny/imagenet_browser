// @flow

import React from 'react'

import styled from 'styled-components'

const InputContainer = styled.div`
  width: 60%;
`

const Input = styled.input`
  border: #ccc;
  font-size: 1.2rem;
  line-height: 35px;

  padding: 5px 10px;
  border-radius: 4px;
  margin-bottom: 50px;
  outline-width: 0;
  border: 1px solid #c5c6fe;
  width: 100%;

  &:focus {
    border: 1px solid #1532e2;
  }
`

type Props = {|
  onSearch?: ?(queryParam: string) => void;
|}

export default class SearchBox extends React.PureComponent<Props> {
  _handleSearch = (e: SyntheticInputEvent<*>) => {
    e.stopPropagation()
    
    if (this.props.onSearch) {
      this.props.onSearch(e.target.value)
    }
  }

  _handleSubmit = (e: SyntheticEvent<*>) => {
    e.preventDefault()

    return false
  }

  _handleKeyUp = (e: SyntheticKeyboardEvent<*>) => {
    if (e.keyCode === 13) {
      this._handleSearch(e)
    }
  }

  render() {
    return (
      <InputContainer>
        <Input placeholder="Search synsets" onBlur={this._handleSearch} onKeyUp={this._handleKeyUp} />
      </InputContainer>
    )
  }
}
