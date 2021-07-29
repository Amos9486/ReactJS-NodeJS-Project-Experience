import React, { useEffect, useRef, useState } from 'react'
import ReactGlobe from 'react-globe'
import CoffeeIntroduceContent from './coffee-introduce-content'
import MarkerPopover from './markerPopover'

const initialCoordinates = [25.033493, 121.564101]

function Earth() {
  const [markers, setMarkers] = useState([])
  const [open, setOpen] = useState(false)
  const [rotate, setRotate] = useState(1)
  const showRef = useRef(false)
  const nowCityRef = useRef({})

  // 球體基礎設定
  const options = {
    cameraMaxDistanceRadiusScale: 5,
    cameraAutoRotateSpeed: rotate,
    cameraRotateSpeed: 0.5,
    enableCameraAutoRotate: true,
    enableMarkerGlow: true,
    markerRadiusScaleRange: [0.005, 0.03],
    enableMarkerTooltip: false,
  }

  // cb
  const handleMouseOver = (event) => {
    showRef.current = !open
    nowCityRef.current = event
    setRotate(0)
  }
  const handleMouseOut = () => {
    showRef.current = open
    nowCityRef.current = {}
    setRotate(1)
  }

  // 後端相關function
  async function getOriginMarker() {
    // 開啟載入指示
    // setDataLoading(true)

    // 連接的伺服器資料網址
    const url = 'http://localhost:7000/coffeeIntroduce/'

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
    const origins = data.map((v, i) => {
      return {
        id: v.originId,
        city: v.originName,
        color: '#ff5554',
        coordinates: [v.originLat, v.originLng],
        value: 0,
        description: v.originDescr,
      }
    })
    setMarkers(origins)
    console.log(origins)
  }

  useEffect(() => {
    if (!open) {
      getOriginMarker()
    } else {
      showRef.current = false
      setRotate(1)
    }
    console.log(open, showRef)
  }, [open])

  return (
    <>
      {/* ReactGlobe套件內的部分prop要在component外定義好後再引入
          https://github.com/chrisrzhou/react-globe/issues/46 */}
      <ReactGlobe
        width="58vw"
        height="50vw"
        globeBackgroundTexture={null}
        initialCameraDistanceRadiusScale={3.5}
        initialCoordinates={initialCoordinates}
        cameraMaxDistanceRadiusScale={3.5}
        markers={markers}
        options={options}
        onClickMarker={() => {
          setOpen(true)
        }}
        onMouseOverMarker={handleMouseOver}
        onMouseOutMarker={handleMouseOut}
      />
      <CoffeeIntroduceContent
        open={open}
        setOpen={setOpen}
        nowCityRef={nowCityRef}
        setRotate={setRotate}
        showRef={showRef}
      />
      <MarkerPopover showRef={showRef} place={nowCityRef.current.city} />
    </>
  )
}

export default Earth
