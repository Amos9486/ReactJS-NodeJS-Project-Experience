import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import styled from 'styled-components'
import { GiCoffeeBeans } from 'react-icons/gi'

const HintBar = styled(SnackbarContent)`
  background-color: #ff5554;
`
const HintWord = styled.span`
  color: #f9f9f9;
  margin: 0 10px;
`

const MarkerPopover = (props) => {
  const { showRef, place } = props

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={showRef.current}
        autoHideDuration={6000}
      >
        <HintBar
          message={
            <>
              <GiCoffeeBeans />
              <HintWord>產地：{place && place}</HintWord>
            </>
          }
        />
      </Snackbar>
    </>
  )
}

export default MarkerPopover
