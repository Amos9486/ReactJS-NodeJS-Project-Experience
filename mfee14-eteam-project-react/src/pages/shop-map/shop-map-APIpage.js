// import React, { useEffect, useRef, useState } from 'react'
// import { withRouter } from 'react-router'
// import GoogleMap from './map-component/GoogleMap'
// import Box from '@material-ui/core/Box'
// import Grid from '@material-ui/core/Grid'
// import MapButton from './map-component/MapButton'
// import ShopIntroduceContent from './map-component/shop-introduce-content'
// import { GiReturnArrow, GiCompass, GiPin, GiShoppingBag } from 'react-icons/gi'

// // const initPosi = { lat: 25.033493, lng: 121.564101 }

// function APIpage(props) {
//   console.log(props)
//   const [mapInstance, setMapInstance] = useState(null)
//   const [mapApi, setMapApi] = useState(null)
//   const [open, setOpen] = useState(false)
//   const [showArr, setShowArr] = useState([false, false, false, false])
//   const [hidden, setHidden] = useState(true)
//   const latKeyin = useRef(null)
//   const lngKeyin = useRef(null)
//   const [coordinate, setCoordinate] = useState({})
//   const [geocoder, setGeocoder] = useState(null)
//   const [shopInfo, setShopInfo] = useState([])
//   const [nowChooseShop, setNowChooseShop] = useState({})
//   console.log(nowChooseShop)

//   // 按鈕的function，未來可能拆出去做成元件
//   const backInitPosition = () => {
//     mapInstance.setCenter(props.nowPosi)
//   }
//   const addrToCoordinate = () => {
//     console.log(geocoder)
//     let tempAddr = ''
//     // 使用ref沒辦法跨頁(轉址)取得資料，存成state又有異步問題，暫時先採取這種解決方式
//     props.addrRef.current.value
//       ? (tempAddr = props.addrRef.current.value)
//       : (tempAddr = props.addrIndex)
//     geocoder.geocode({ address: tempAddr }, (results, status) => {
//       if (status === mapApi.GeocoderStatus.OK) {
//         const lat = results[0].geometry.location.lat
//         const lng = results[0].geometry.location.lng
//         console.log(results[0])
//         console.log(`經度：${lat(0)}, 緯度：${lng(0)}`)
//         setHidden(false)
//         setCoordinate({ ...coordinate, lat: lat(0), lng: lng(0) })
//         mapInstance.setCenter(results[0].geometry.location)
//       } else {
//         console.log(`錯誤訊息(status)：${status}`)
//       }
//     })
//   }
//   const goSearchPosition = () => {
//     console.log(latKeyin.current.value, lngKeyin.current.value)
//     const tempCoordinate = {
//       lat: +latKeyin.current.value,
//       lng: +lngKeyin.current.value,
//     }
//     setHidden(false)
//     setCoordinate(tempCoordinate)
//     mapInstance.setCenter(tempCoordinate)
//   }

//   // 按鈕的物件陣列資料
//   const mapBtnArr = [
//     {
//       name: '我的位置',
//       placeholder: '',
//       func: backInitPosition,
//       ref: 0,
//       icon: <GiReturnArrow />,
//     },
//     {
//       name: '地址搜尋',
//       placeholder: '輸入地址搜尋週邊店家',
//       func: addrToCoordinate,
//       ref: props.addrRef,
//       icon: <GiCompass />,
//     },
//     {
//       name: '座標搜尋',
//       placeholder: '輸入座標搜尋週邊店家',
//       func: goSearchPosition,
//       ref: [latKeyin, lngKeyin],
//       icon: <GiPin />,
//     },
//     {
//       name: '店名搜尋',
//       placeholder: '輸入店名搜尋指定店家',
//       func: backInitPosition,
//       ref: 0,
//       icon: <GiShoppingBag />,
//     },
//   ]

//   // didMount，設定初始化行為(取得當前位置)，未來可能採用google api比較誤差
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const tempPosi = {
//         lat: +position.coords.latitude,
//         lng: +position.coords.longitude,
//       }
//       if (tempPosi !== props.nowPosi) props.setNowPosi(tempPosi)
//       console.log('didMount完成，當前座標為', tempPosi)
//     })
//   }, [])

//   // didUpdate，模擬前一頁輸入地址查詢的操作，補上if條件避免異步處理時尚未更新geocoder的狀況
//   useEffect(() => {
//     console.log('API ref:', props.addrIndex)
//     if (geocoder === null) return
//     console.log('geocoder異步處理完成')
//     if (props.addrIndex) {
//       addrToCoordinate()
//     } else {
//       backInitPosition(props.nowPosi)
//     }
//   }, [geocoder])

//   return (
//     <>
//       <Box
//         style={{
//           height: '100vh',
//           width: '100%',
//           position: 'relative',
//           marginTop: '120px',
//         }}
//       >
//         <GoogleMap
//           center={props.nowPosi}
//           zoom={17}
//           setMapInstance={setMapInstance}
//           setMapApi={setMapApi}
//           setOpen={setOpen}
//           hidden={hidden}
//           coordinate={coordinate}
//           setGeocoder={setGeocoder}
//           shopInfo={shopInfo}
//           setShopInfo={setShopInfo}
//           setNowChooseShop={setNowChooseShop}
//           addrIndex={props.addrIndex}
//         />
//         <Grid
//           container
//           direction="column"
//           justify="center"
//           style={{
//             width: '100px',
//             position: 'absolute',
//             top: '50%',
//             transform: 'translateY(-50%)',
//           }}
//         >
//           {mapBtnArr.map((v, i) => (
//             <MapButton
//               key={i}
//               index={i}
//               mapBtnObj={v}
//               showArr={showArr}
//               setShowArr={setShowArr}
//               latKeyin={latKeyin}
//               lngKeyin={lngKeyin}
//               addrRef={props.addrRef}
//               setAddrIndex={props.setAddrIndex}
//             ></MapButton>
//           ))}
//         </Grid>
//         <ShopIntroduceContent
//           open={open}
//           setOpen={setOpen}
//           nowChooseShop={nowChooseShop}
//           setNowChooseShop={setNowChooseShop}
//         />
//       </Box>
//     </>
//   )
// }

// export default withRouter(APIpage)
