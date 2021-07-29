import React, { useEffect } from 'react'
import MapKey from './MapKey'
import GoogleMapReact from 'google-map-react'
import PlaceMarker from './PlaceMarker'

// Map
const GoogleMap = (props) => {
  const {
    center,
    zoom,
    setMapInstance,
    setMapApi,
    setOpen,
    hidden,
    coordinate,
    setGeocoder,
    shopInfo,
    setShopInfo,
    setNowChooseShop,
    addrIndex,
  } = props

  // 地圖載入完成後，更新地圖物件實體、地圖API物件實體等state
  const handleApiLoaded = (map, maps) => {
    setMapInstance(map)
    setMapApi(maps)
    const tempGeocoder = new maps.Geocoder()
    setGeocoder(tempGeocoder)
  }

  // 後端相關function
  async function getAllShopData() {
    // 開啟載入指示
    // setDataLoading(true)

    // 連接的伺服器資料網址
    const url = 'http://localhost:7000/shopMap/'

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
    // console.log('解析後的json資料by read', JSON.parse(data))

    // 設定資料
    setShopInfo(data)
  }

  // didMount
  useEffect(() => {
    getAllShopData()
    // 使用政府開放API的測試資料
    // fetch('/Taipei_MRT_Parking.json')
    //   .then((response) => {
    //     console.log(response)
    //     return response.json()
    //   })
    //   .then((data) => {
    //     // 處理json資料
    //     setTestInfo([...data])
    //   })
    //   .catch((err) => {
    //     // 錯誤回報
    //     console.log('發生錯誤：' + err)
    //   })
  }, [])

  return (
    // Important! Always set the container height explicitly (需明確設定地圖容器高度)
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: MapKey }} // libraries放置API陣列方可使用
        defaultCenter={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals // 為true才能使用map物件實體
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)} // 當地圖載入完成後觸發
      >
        {/* google-map-react的設計，可以直接使用html標籤或component自定義map pin */}
        <PlaceMarker lat={center.lat} lng={center.lng} name="當前位置" />
        <PlaceMarker
          lat={coordinate.lat}
          lng={coordinate.lng}
          name={addrIndex}
          hidden={hidden}
        />
        {shopInfo.map((v, i) => {
          return (
            <PlaceMarker
              key={v.pId}
              lat={v.pLat}
              lng={v.pLng}
              name={v.pName}
              shopIndex={shopInfo[i]}
              setOpen={setOpen}
              setNowChooseShop={setNowChooseShop}
            />
          )
        })}
      </GoogleMapReact>
    </>
  )
}

export default GoogleMap
