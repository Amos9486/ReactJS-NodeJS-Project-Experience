import React, { useEffect } from 'react'
import styled from 'styled-components'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ButtonBase from '@material-ui/core/ButtonBase'

const DrawerBTN = styled(ButtonBase)`
  color: #002875;
  font-size: 1.5rem;
  margin: 10px 20px;
`

function DetailEditDrawer(props) {
  const { open, btnObjArr, setOpen, setWillSave, setBlockFlag } = props

  // 元件卸載前的處理
  useEffect(() => {
    return () => {
      setOpen(false)
      setWillSave(null)
      setBlockFlag([true, -1])
    }
  }, [])

  return (
    <>
      <Drawer variant="persistent" anchor="top" open={open}>
        <Grid container justify="center">
          {btnObjArr.map((btnObj, index) => (
            <DrawerBTN key={index} onClick={btnObj.func}>
              <IconButton style={{ color: '#ff5554' }}>
                {btnObj.icon}
              </IconButton>
              {btnObj.name}
            </DrawerBTN>
          ))}
        </Grid>
      </Drawer>
    </>
  )
}

export default DetailEditDrawer
