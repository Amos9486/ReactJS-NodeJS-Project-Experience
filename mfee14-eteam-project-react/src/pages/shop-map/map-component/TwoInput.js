import React from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import { FaSearch } from 'react-icons/fa'

const InputTemplate = styled(Input)`
  width: ${(props) => props.width};
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  line-height: ${(props) => props.fontSize};
`
const PrefixBox = styled(Box)`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
`

function TwoInput(props) {
  const { width, color, fontSize, func, addrRef } = props
  return (
    <>
      <InputTemplate
        width={width}
        color={color}
        fontSize={fontSize}
        inputRef={addrRef[0]}
        startAdornment={
          <InputAdornment position="start">
            <PrefixBox color={color} fontSize={fontSize}>
              經度
            </PrefixBox>
          </InputAdornment>
        }
      />
      <InputTemplate
        width={width}
        color={color}
        fontSize={fontSize}
        inputRef={addrRef[1]}
        startAdornment={
          <InputAdornment position="start">
            <PrefixBox color={color} fontSize={fontSize}>
              緯度
            </PrefixBox>
          </InputAdornment>
        }
      />
      <IconButton
        onClick={() => {
          func()
        }}
      >
        <FaSearch style={{ color: props.color }} />
      </IconButton>
    </>
  )
}

export default TwoInput
