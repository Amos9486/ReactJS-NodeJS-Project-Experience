import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
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

function OneInput(props) {
  const {
    width,
    color,
    fontSize,
    placeholder,
    addrRef,
    func,
    setAddrIndex,
    setFadeout,
  } = props
  return (
    <>
      <InputTemplate
        width={width}
        color={color}
        fontSize={fontSize}
        inputRef={addrRef}
        placeholder={placeholder}
        endAdornment={
          // 此處透過是否傳入按鈕專用的function，來判斷icon要不要包在link內
          <InputAdornment position="end">
            {func ? (
              <IconButton
                onClick={() => {
                  if (addrRef.current.value) setAddrIndex(addrRef.current.value)
                  func()
                }}
              >
                <FaSearch style={{ color: color }} />
              </IconButton>
            ) : (
              <Link
                to="/shop-map/shop-map-APIpage"
                onClick={(e) => {
                  e.preventDefault()
                  if (addrRef.current !== null)
                    setAddrIndex(addrRef.current.value)
                  setFadeout(true)
                }}
              >
                <IconButton>
                  <FaSearch style={{ color: color }} />
                </IconButton>
              </Link>
            )}
          </InputAdornment>
        }
      />
    </>
  )
}

export default withRouter(OneInput)
