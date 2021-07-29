import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import Zoom from '@material-ui/core/Zoom'
import Taiwan from './introduce-component/react-taiwan'
import { GiReturnArrow } from 'react-icons/gi'

const EarthGrid = styled(Grid)`
  background: linear-gradient(45deg, #002875, #0065b4);
  width: 100%;
  height: 50vw;
  ${'' /* padding: 7.8125%; */}
  box-sizing: border-box;
`
const EarthInfoBox = styled(Box)`
  width: 100%;
  height: 50vw;
  background-color: #fcf5e9;
  padding: 0;
  box-sizing: border-box;
`
const TopTitleBox = styled(Box)`
  width: 100%;
  box-sizing: border-box;
  border-image: linear-gradient(to right, #fcf5e9 30%, #002875 30%);
  border-image-slice: 1;
  border-bottom: 5px solid;
  font-size: 6rem;
  color: #fcf5e9;
  margin-left: -30%;
  margin-top: 1.5625vw;
`
const BottomTitleBox = styled(Box)`
  width: 100%;
  box-sizing: border-box;
  border-image: linear-gradient(to right, #fcf5e9 30%, #002875 30%);
  border-image-slice: 1;
  border-top: 5px solid;
  color: #002875;
  margin-left: -30%;
`
const SubBottomBox1 = styled(Box)`
  font-size: 3.75rem;
  margin-left: 32%;
  margin-top: 1vw;
`
const SubBottomBox2 = styled(Box)`
  text-align: right;
  letter-spacing: 9px;
`
const ArrowBox = styled(Box)`
  margin: 6vw 3.125vw;
`
const Arrow = styled(Box)`
  width: 220px;
  height: 24px;
  background-color: #ff5554;
  clip-path: polygon(0 100%, 15% 0%, 17% 0%, 3.5% 90%, 100% 90%, 100% 100%);
`
const ArrowText = styled(Box)`
  margin-bottom: -12px;
  margin-left: 60px;
  font-size: 1.5rem;
  color: #002875;
`
const DecoBox = styled(Box)`
  padding: 3.125vw;
  box-sizing: border-box;
`
const boxCut = keyframes`
  from {
    margin-bottom: -14.0625vw;
    margin-left: 0;
  }

  to {
    margin-bottom: -17.1875vw;
    margin-left: 3.125vw;
  }
`
const DecoPic = styled(Box)`
  width: 25vw;
  height: 14.0625vw;
  background: url('https://material-ui.com/static/images/cards/contemplative-reptile.jpg')
    no-repeat;
  background-size: cover;
  color: #f9f9f9;
  font-size: 1.5rem;
  text-align: center;
  line-height: 14.0625vw;
`
const DecoBg = styled(Box)`
  width: 25vw;
  height: 14.0625vw;
  background-color: #659de1;
  margin-bottom: -17.1875vw;
  margin-left: 3.125vw;
  animation: ${boxCut} 2s ease;
`
function CoffeeIntroduceTaiwan() {
  const [area, setArea] = useState(['', '', ''])

  return (
    <>
      <Grid container style={{ marginTop: '120px' }}>
        <EarthGrid container item sm={7} justify="flex-end" alignItems="center">
          <Zoom
            in={true}
            style={{
              transitionDelay: '100ms',
              position: 'absolute',
              top: '190px',
              left: '30px',
            }}
            unmountOnExit
          >
            <Fab
              color="secondary"
              onClick={() => {
                if (area[0] === '') return
                const tempArr = [...area]
                if (area[1] === '') {
                  tempArr[0] = ''
                  setArea(tempArr)
                  return
                }
                if (area[2] === '') {
                  tempArr[1] = ''
                  setArea(tempArr)
                  return
                } else {
                  tempArr[2] = ''
                  setArea(tempArr)
                  return
                }
              }}
            >
              <GiReturnArrow />
            </Fab>
          </Zoom>
          <Grid item>
            <Taiwan area={area} setArea={setArea} />
          </Grid>
        </EarthGrid>
        <Grid container item sm={5}>
          <EarthInfoBox>
            <TopTitleBox>尋根</TopTitleBox>
            <BottomTitleBox>
              <SubBottomBox1>踏破鐵鞋無覓處</SubBottomBox1>
              <SubBottomBox2>Find the Beans in Taiwan</SubBottomBox2>
            </BottomTitleBox>
            <ArrowBox>
              <ArrowText>請點選座標以探索產地</ArrowText>
              <Arrow></Arrow>
            </ArrowBox>
            <DecoBox>
              <DecoBg></DecoBg>
              <DecoPic>我們有著相同的目標</DecoPic>
            </DecoBox>
          </EarthInfoBox>
        </Grid>
      </Grid>
    </>
  )
}

export default CoffeeIntroduceTaiwan
