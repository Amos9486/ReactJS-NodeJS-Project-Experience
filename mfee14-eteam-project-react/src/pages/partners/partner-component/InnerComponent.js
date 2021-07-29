import React from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import { TiInputChecked, TiDeleteOutline, TiEdit } from 'react-icons/ti'

const PaperBtnBox = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
  display: ${(props) => (props.open ? 'block' : 'none')};
`
const PaperBtn = styled.button`
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: ${(props) => (props.open ? 'inline' : 'none')};
`

function InnerComponent(props) {
  const {
    index,
    open,
    textField,
    blockFlag,
    setBlockFlag,
    handleDeleteBlock,
    setAnchorEl,
  } = props
  return (
    <>
      <PaperBtnBox open={open}>
        <PaperBtn
          open={!blockFlag[0] && blockFlag[1] === index}
          onClick={() => {
            console.log('confirm click')
            setBlockFlag([true, -1])
            setAnchorEl(null)
          }}
        >
          <TiInputChecked fontSize="1rem" />
        </PaperBtn>
        <PaperBtn
          open={blockFlag[0]}
          onClick={(event) => {
            console.log('edit click')
            setBlockFlag([false, index])
            setAnchorEl(event.currentTarget.parentNode.parentNode)
          }}
        >
          <TiEdit fontSize="1rem" />
        </PaperBtn>
        <PaperBtn
          open={true}
          onClick={() => {
            console.log('del click')
            handleDeleteBlock(index)
          }}
        >
          <TiDeleteOutline fontSize="1rem" />
        </PaperBtn>
      </PaperBtnBox>
      <Box
        style={{ wordBreak: 'break-all' }}
        dangerouslySetInnerHTML={{ __html: textField[index].html }}
      ></Box>
    </>
  )
}

export default InnerComponent
