import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { RiMapPinFill } from 'react-icons/ri'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import Tooltip from '@material-ui/core/Tooltip'

// 使用google-map-react自定義map pin時，需注意座標原點的位置，預設在左上角
// 這邊將容器透過變形移動，如此一來座標原點便轉為容器底部中央的位置，方便內部svg對齊
const PinBox = styled(Box)`
  height: 40px;
  width: 100px;
  color: #ff5554;
  cursor: pointer;
  transform: translate(-50%, -100%);
  display: ${(props) => (props.hidden ? 'none' : 'flex')};
  justify-content: center;
  align-items: flex-end;
  position: relative;

  &:hover {
    color: #659de1;
  }
`
// 標題文字，使用position懸浮後，脫離原始容器的控制，才能調整至svg上方
const PinTitle = styled(Box)`
  width: 100px;
  font-size: 1rem;
  text-align: center;
  position: absolute;
  bottom: 1.8rem;
  font-weight: 900;
`
const MapPin = styled(RiMapPinFill)`
  font-size: 1.6rem;
`

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#659de1',
    color: '#fcf5e9',
    fontSize: '1.25rem',
    width: 'auto',
    maxWidth: '200px',
    textAlign: 'center',
  },
}))(Tooltip)

const PlaceMarker = (props) => {
  const { name, shopIndex, setOpen, hidden, setNowChooseShop } = props
  return (
    <LightTooltip title={name} placement="top">
      <PinBox
        hidden={hidden}
        onClick={() => {
          if (setOpen) {
            setOpen(true)
            setNowChooseShop(shopIndex)
          }
        }}
      >
        <PinTitle>{name}</PinTitle>
        <MapPin />
      </PinBox>
    </LightTooltip>
  )
}

export default PlaceMarker
