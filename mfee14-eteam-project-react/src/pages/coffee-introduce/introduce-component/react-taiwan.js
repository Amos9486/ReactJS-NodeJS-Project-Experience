import React, { useRef } from 'react'
import ReactSvgZoomMap from 'react-svg-zoom-map'
import MarkerPopover from './markerPopover'

const Taiwan = (props) => {
  const { area, setArea } = props
  const showRef = useRef(false)
  const nowCityRef = useRef({})

  // cb
  const handleMouseOver = (obj) => {
    showRef.current = true
    nowCityRef.current = obj.title
    console.log(showRef, nowCityRef)
  }
  const handleMouseOut = () => {
    showRef.current = false
    nowCityRef.current = {}
    console.log(showRef, nowCityRef)
  }

  return (
    <>
      <ReactSvgZoomMap
        countyJsonSrc="https://cybermumu.github.io/react-svg-zoom-map/example/topojsons/taiwan-county.json"
        townJsonSrc="https://cybermumu.github.io/react-svg-zoom-map/example/topojsons/taiwan-town.json"
        villageJsonSrc="https://cybermumu.github.io/react-svg-zoom-map/example/topojsons/taiwan-village.json"
        county={area[0]}
        town={area[1]}
        village={area[2]}
        onAreaClick={(newArea, e) => setArea(newArea)}
        onAreaHover={handleMouseOut}
        onPinClick={console.log(area)}
        onPinHover={handleMouseOver}
        pins={[
          {
            id: 1,
            title: '嘉義阿里山',
            county: '嘉義縣',
            town: '阿里山鄉',
            village: '樂野村',
            location: [23.467, 120.702],
          },
          {
            id: 2,
            title: '雲林古坑石壁地區',
            county: '雲林縣',
            town: '古坑鄉',
            village: '草嶺村',
            location: [23.584721, 120.693725],
          },
          {
            id: 3,
            title: '臺南東山市道175號',
            county: '臺南市',
            town: '東山區',
            village: '高原里',
            location: [23.278638, 120.505297],
          },
          {
            id: 4,
            title: '南投國姓九份二山',
            county: '南投縣',
            town: '國姓鄉',
            village: '福龜村',
            location: [24.0191676710247, 120.823344394545],
          },
          {
            id: 5,
            title: '彰化八卦山',
            county: '彰化縣',
            town: '彰化市',
            village: '香山里',
            location: [24.065239902761, 120.590436494536],
          },
        ]}
      />
      <MarkerPopover showRef={showRef} place={nowCityRef.current} />
    </>
  )
}

export default Taiwan
