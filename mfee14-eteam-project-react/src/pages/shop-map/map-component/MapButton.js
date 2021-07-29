import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import ButtonBase from '@material-ui/core/ButtonBase'
import styled from 'styled-components'
import OneInput from './OneInput'
import TwoInput from './TwoInput'

// css及控制區塊的顯示差異，均透過此處進行設定
const MapBtn = styled(ButtonBase)`
  width: 100px;
  height: 100px;
  color: #fcf5e9;
  font-size: 0.875rem;
  background-color: #0065b4;
  flex-direction: column;
  justify-content: space-evenly;
  border-top: ${(props) => (props.index === 0 ? 'unset' : '1px solid #fcf5e9')};
`
const ControlBox = styled(Box)`
  width: 360px;
  height: 100px;
  color: #fcf5e9;
  font-size: 1.25rem;
  background-color: #002875b2;
  position: absolute;
  top: 0px;
  left: 100px;
  display: ${(props) =>
    props.index === 0 ? 'none' : props.show ? 'flex' : 'none'};
  justify-content: space-evenly;
  align-items: center;
`

function MapButton(props) {
  const { index, mapBtnObj, showArr, setShowArr, setAddrIndex } = props
  return (
    <>
      <Grid
        item
        style={{
          position: 'relative',
        }}
      >
        {/* 按鈕主體 */}
        <MapBtn
          index={index}
          onClick={() => {
            const tempArr = [...showArr]
            if (showArr[index]) {
              tempArr[index] = !showArr[index]
            } else {
              tempArr.forEach((v, i) => {
                i === index ? (tempArr[i] = true) : (tempArr[i] = false)
              })
            }
            console.log(tempArr)
            setShowArr(tempArr)
            if (index === 0) mapBtnObj.func()
          }}
        >
          <Box
            style={{
              width: '50%',
              height: '50%',
              borderRadius: '50%',
              backgroundColor: '#fcf5e9',
              color: '#0065b4',
              fontSize: '50px',
              lineHeight: '50px',
            }}
          >
            {mapBtnObj.icon}
          </Box>
          <Box>{mapBtnObj.name}</Box>
        </MapBtn>
        {/* 點選按鈕後開啟的控制區塊，當座標要輸入時使用不同的欄位 */}
        <ControlBox index={index} show={showArr[index]}>
          {index === 2 ? (
            <TwoInput
              width={'30%'}
              color={'#fcf5e9'}
              fontSize={'1rem'}
              func={mapBtnObj.func}
              addrRef={mapBtnObj.ref}
            />
          ) : (
            <OneInput
              width={'80%'}
              color={'#fcf5e9'}
              fontSize={'1.25rem'}
              placeholder={mapBtnObj.placeholder}
              func={mapBtnObj.func}
              addrRef={mapBtnObj.ref}
              setAddrIndex={setAddrIndex}
            />
          )}
        </ControlBox>
      </Grid>
    </>
  )
}

export default MapButton
