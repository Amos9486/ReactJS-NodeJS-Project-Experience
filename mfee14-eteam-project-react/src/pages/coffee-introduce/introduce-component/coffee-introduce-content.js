import React, { useState, useEffect } from 'react'
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import styled from 'styled-components'
import ButtonBase from '@material-ui/core/ButtonBase'
import Dialog from '@material-ui/core/Dialog'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { MdClose } from 'react-icons/md'
import ItemCard from './ItemCard'

const CloseBtn = styled(ButtonBase)`
  color: #002875;
  font-size: 2rem;
`
const DescriptionBox = styled(Box)`
  height: 76%;
  font-size: 1.2rem;
  padding: 40px;
  box-sizing: border-box;
  overflow: auto;

  /* 整個捲軸 */
  &::-webkit-scrollbar {
    width: 15px;
  }
  /* 捲軸的軌道 */
  &::-webkit-scrollbar-track {
    background: #f9f9f940;
  }
  /*捲軸尚未滑到的軌道*/
  &::-webkit-scrollbar-track-piece {
    background: #f9f9f940;
  }
  /* 滑動的區塊 */
  &::-webkit-scrollbar-thumb {
    background: #fcf5e9;
  }
  /* 滑鼠移到滑動的區塊上 */
  &::-webkit-scrollbar-thumb:hover {
    background: #659de1;
  }
`

function CoffeeIntroduceContent(props) {
  const { open, setOpen, nowCityRef, setRotate, showRef } = props
  const [relatedItems, setRelatedItems] = useState([])

  // 後端相關function
  async function getRelatedItems() {
    // 開啟載入指示
    // setDataLoading(true)

    // 連接的伺服器資料網址
    const url = 'http://localhost:7000/coffeeIntroduce/relatedItems/'

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log('伺服器回傳的json資料by read', data)

    // 設定資料
    setRelatedItems(data)
  }

  useEffect(() => {
    if (open) getRelatedItems()
  }, [open])

  return (
    <>
      <Dialog fullScreen open={open} transitionDuration={1000}>
        <Grid
          container
          justify="center"
          style={{
            width: '100%',
            height: '62.5vw',
            background: `url('https://material-ui.com/static/images/cards/contemplative-reptile.jpg') no-repeat`,
            backgroundSize: 'cover',
          }}
        >
          <Grid
            container
            item
            justify="flex-end"
            sm={12}
            style={{
              height: '6.25vw',
              borderBottom: '1px solid #fcf5e9',
              marginBottom: '-6.25vw',
            }}
          >
            <Grid
              container
              item
              justify="center"
              sm={1}
              style={{
                height: '6.25vw',
                backgroundColor: '#fcf5e980',
              }}
            >
              <CloseBtn
                onClick={() => {
                  setOpen(false)
                  setRotate(1)
                  showRef.current = false
                }}
                aria-label="close"
                disableRipple={true}
              >
                <MdClose />
                CLOSE
              </CloseBtn>
            </Grid>
          </Grid>
          <Grid
            container
            item
            justify="center"
            alignItems="flex-end"
            sm={10}
            style={{
              height: '62.5vw',
              borderLeft: '1px solid #fcf5e9',
              borderRight: '1px solid #fcf5e9',
              color: '#002875',
              overflow: 'hidden',
            }}
          >
            <Grid
              container
              item
              sm={12}
              style={{
                height: '37.5%',
                marginTop: '6.25vw',
                alignSelf: 'stretch',
              }}
            >
              <Grid
                item
                sm={5}
                style={{
                  height: '100%',
                  backgroundColor: '#fcf5e980',
                }}
              >
                <Box
                  style={{
                    height: '24%',
                    borderBottom: '1px solid #002875',
                    fontSize: '3rem',
                    lineHeight: '108px',
                    paddingLeft: '20px',
                  }}
                >
                  {nowCityRef.current.city}
                </Box>
                <DescriptionBox>
                  {nowCityRef.current.description}
                </DescriptionBox>
              </Grid>
            </Grid>
            <Grid
              item
              sm={10}
              style={{
                height: '35%',
                backgroundColor: '#fcf5e980',
              }}
            >
              <Box
                style={{
                  height: '24%',
                  borderBottom: '1px solid #002875',
                  fontSize: '2.125rem',
                  lineHeight: '108px',
                  paddingLeft: '20px',
                }}
              >
                Related Products
              </Box>
              <Grid container justify="space-around">
                {relatedItems.map((v) => {
                  return <ItemCard key={v.iId} item={v} />
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  )
}

export default CoffeeIntroduceContent
