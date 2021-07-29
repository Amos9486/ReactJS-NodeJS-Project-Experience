import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'

function Buttons(props) {
  const [buyNum, setBuyNum] = useState(1)

  const {
    handleClick,
    handleClose,
    anchorEl,
    getCartData,
    iId,
    productData,
    specIndex,
    setSpecIndex,
    specArr,
  } = props
  return (
    <>
      <Grid
        container
        item
        spacing={4}
        xs={8}
        justify="flex-end"
        style={{ marginTop: '60px', maxWidth: '800px' }}
      >
        <Grid item>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            variant="outlined"
            color="primary"
            onClick={handleClick}
          >
            規格
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {specArr.map((value, index) => {
              console.log(value)
              return (
                <MenuItem
                  key={index}
                  value={index}
                  onClick={(event) => {
                    handleClose()
                    setSpecIndex(event.currentTarget.value)
                  }}
                >
                  {value.sName}
                </MenuItem>
              )
            })}
          </Menu>
        </Grid>

        <Grid item>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button
              onClick={() => {
                if (buyNum <= 1) return
                setBuyNum(buyNum - 1)
              }}
            >
              -
            </Button>
            <Button component="p">{buyNum}</Button>
            <Button
              onClick={() => {
                if (buyNum >= productData.iIdData.iQty) return
                setBuyNum(buyNum + 1)
              }}
            >
              +
            </Button>
          </ButtonGroup>
        </Grid>

        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              getCartData(iId, buyNum, specArr[specIndex].sId)
            }}
          >
            加入購物車
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              getCartData(iId, buyNum, specArr[specIndex].sId)
            }}
          >
            直接購買
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default Buttons
