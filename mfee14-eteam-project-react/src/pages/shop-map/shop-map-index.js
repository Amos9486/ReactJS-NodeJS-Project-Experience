// import React, { useState, useEffect, useRef } from 'react'
// import { Link, withRouter } from 'react-router-dom'
// import styled, { keyframes } from 'styled-components'
// import Grid from '@material-ui/core/Grid'
// import Box from '@material-ui/core/Box'
// import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
// import OneInput from './map-component/OneInput'
// import MapKey from './map-component/MapKey'
// import GoogleMapReact from 'google-map-react'

// const TopTitleBox = styled(Box)`
//   width: 80%;
//   box-sizing: border-box;
//   border-bottom: 5px solid #ff5554;
//   color: #fcf5e9;
//   font-size: 1.5rem;
//   line-height: 1.5rem;
//   letter-spacing: 1.5rem;
//   margin: -2.6rem auto 0.5rem;
//   padding: 0.5rem;
// `
// const BottomTitleBox = styled(Box)`
//   color: #002875;
//   font-size: 2.125rem;
//   letter-spacing: 0.5rem;
// `
// const NormalText = styled(Typography)`
//   font-size: 1.5rem;
// `
// const HighlightlText = styled(Typography)`
//   font-size: 2.125rem;
//   color: #ff5554;
// `
// const NowPlaceButton = styled(Button)`
//   width: 80px;
//   height: 28px;
//   margin-left: 59%;
//   color: #f9f9f9;
//   border: 1px solid #f9f9f9;
//   border-radius: 50px;
// `
// const boxFadeout = keyframes`
//   0% {
//     opacity: 1;
//   }

//   40% {
//     opacity: 0;
//   }

//   100% {
//     opacity: 0;
//   }
// `
// const FindAddrGrid = styled(Grid)`
//   height: 100vh;
//   float: ${(props) => (props.fadeout ? 'left' : 'none')};
//   animation: ${(props) => (props.fadeout ? boxFadeout : 'none')} 1s ease-out;
//   animation-fill-mode: forwards;
// `
// const NowCoordinateBox = styled(Box)`
//   background-color: #659de1;
//   width: 12.5vw;
//   height: 12.5vw;
//   padding: 1.2vw;
//   fontsize: 1.5rem;
//   color: #fcf5e9;
//   box-sizing: border-Box;
//   position: absolute;
//   z-index: 10;
//   top: 50%;
//   transform: translateY(-50%);
//   animation: ${(props) => (props.fadeout ? boxFadeout : 'none')} 1s ease-out;
//   animation-fill-mode: forwards;
// `
// const boxExtend = keyframes`
//   0% {
//     width: 12.5vw;
//   }

//   100% {
//     width: 100vw;
//   }
// `
// const IndexMapGrid = styled(Grid)`
//   background-color: #fcf5e9;
//   width: 12.5vw;
//   height: 100vh;
//   position: relative;
//   z-index: 9;
//   animation: ${(props) => (props.fadeout ? boxExtend : 'none')} 3s ease-out;
//   animation-fill-mode: forwards;
// `

// function ShopMapIndex(props) {
//   console.log(props)
//   const [mapInstance, setMapInstance] = useState(null)
//   const [mapApi, setMapApi] = useState(null)
//   const [fadeout, setFadeout] = useState(false)
//   const borderRef = useRef('')

//   // 當地圖載入完成，將地圖實體與地圖 API 傳入 state 供之後使用
//   const mapAndApiLoaded = (map, maps) => {
//     setMapInstance(map)
//     setMapApi(maps)
//   }

//   // didMount&willUnmount，設定初始化行為(取得當前位置)，未來可能採用google api比較誤差
//   useEffect(() => {
//     setFadeout(false)
//     props.setAddrIndex('')

//     navigator.geolocation.getCurrentPosition((position) => {
//       const tempPosi = {
//         lat: +position.coords.latitude,
//         lng: +position.coords.longitude,
//       }
//       if (tempPosi !== props.nowPosi) props.setNowPosi(tempPosi)
//       console.log('didMount完成，當前座標為', tempPosi)
//     })

//     return () => {
//       console.log('index willUnmount')
//     }
//   }, [])

//   const createMapOptions = (maps) => {
//     return {
//       panControl: false,
//       mapTypeControl: false,
//       scrollwheel: false,
//       zoomControl: false,
//       scaleControl: false,
//       fullscreenControl: false,
//     }
//   }

//   return (
//     <>
//       <Grid
//         container
//         justify="space-evenly"
//         style={{
//           width: '100%',
//           height: '100vh',
//           background: `url('https://material-ui.com/static/images/cards/contemplative-reptile.jpg') no-repeat`,
//           backgroundSize: 'cover',
//           marginTop: '120px',
//         }}
//       >
//         <FindAddrGrid
//           container
//           item
//           alignItems="center"
//           sm={4}
//           fadeout={fadeout}
//           ref={borderRef}
//           onCh
//         >
//           <Grid
//             item
//             style={{
//               backgroundColor: '#fcf5e980',
//               width: '100%',
//               height: '12.5vw',
//               textAlign: 'center',
//             }}
//           >
//             <TopTitleBox>店家地圖</TopTitleBox>
//             <BottomTitleBox>尋找您週邊的極品咖啡</BottomTitleBox>
//             <Box style={{ marginTop: '10%' }}>
//               <OneInput
//                 width={'70%'}
//                 color={'#002875'}
//                 fontSize={'1.5rem'}
//                 placeholder={'輸入地址以搜尋週邊店家'}
//                 addrRef={props.addrRef}
//                 setAddrIndex={props.setAddrIndex}
//                 setFadeout={setFadeout}
//               />
//             </Box>
//           </Grid>
//         </FindAddrGrid>
//         <IndexMapGrid
//           container
//           item
//           alignItems="center"
//           fadeout={fadeout}
//           onAnimationEnd={() => {
//             props.history.push('/shop-map/shop-map-APIpage')
//           }}
//         >
//           <NowCoordinateBox fadeout={fadeout}>
//             <NormalText gutterBottom>或者透過</NormalText>
//             <HighlightlText gutterBottom>當前座標</HighlightlText>
//             <NormalText gutterBottom>開始搜尋</NormalText>
//             <Link
//               to="/shop-map/shop-map-APIpage"
//               onClick={(e) => {
//                 e.preventDefault()
//                 setFadeout(true)
//               }}
//               style={{ textDecoration: 'none' }}
//             >
//               <NowPlaceButton variant="outlined">→</NowPlaceButton>
//             </Link>
//           </NowCoordinateBox>
//           <GoogleMapReact
//             bootstrapURLKeys={{ key: MapKey }}
//             defaultCenter={props.nowPosi}
//             defaultZoom={17}
//             yesIWantToUseGoogleMapApiInternals
//             onGoogleApiLoaded={({ map, maps }) => mapAndApiLoaded(map, maps)}
//             options={createMapOptions(mapApi)}
//             style={{
//               width: '100%',
//               height: '100%',
//               position: 'absolute',
//               zIndex: 5,
//             }}
//           ></GoogleMapReact>
//         </IndexMapGrid>
//       </Grid>
//     </>
//   )
// }

// export default withRouter(ShopMapIndex)
