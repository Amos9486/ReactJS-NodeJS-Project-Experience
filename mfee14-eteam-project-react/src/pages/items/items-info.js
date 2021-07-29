import React, { useEffect, useState } from 'react'
import './items-info.css'
import Grid from '@material-ui/core/Grid'
import Chips from './Chips'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Buttons from './Buttons'
import { withRouter } from 'react-router-dom'
import MessageText from './messageText'

function ItemInfo(props) {
  console.log(props)

  const [anchorEl, setAnchorEl] = useState(null)

  const [productData, setProductData] = useState({})

  const [largePic, setLargePic] = useState(
    'http://localhost:3000/index/smallpic1.jpg'
  )

  const ImgArr = [
    'http://localhost:3000/index/smallpic1.jpg',
    'http://localhost:3000/index/smallpic2.jpg',
    'http://localhost:3000/index/smallpic3.jpg',
    'http://localhost:3000/index/smallpic4.jpg',
    'http://localhost:3000/index/smallpic5.jpg',
  ]

  const [specIndex, setSpecIndex] = useState(0)

  const [specArr, setSpecArr] = useState([])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  function TabPanel(props) {
    const { children, value, index } = props
    //如果value === index是true，執行&&右邊的東西
    return (
      <>{value === index && <div hidden={value !== index}>{children}</div>}</>
    )
  }

  // 後端相關function：擷取單一商品
  async function getItemData() {
    // 連接的伺服器資料網址
    const url = `http://localhost:7000/items/info/${props.match.params.iId}`

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
    setProductData(data)
    setSpecArr(data.specificationData)
  }

  // 後端相關function：加入或更新購物車
  async function getCartData(iId, cartQty, sId) {
    // 連接的伺服器資料網址
    const url = `http://localhost:7000/items/session?iId=${iId}&cartQty=${cartQty}&sId=${sId}`

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      credentials: 'include',
      method: 'GET', //GET不能接body
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log('伺服器回傳的json資料by read', data)
  }

  useEffect(() => {
    getItemData()
    console.log(specArr)
    console.log(productData)
  }, [])

  return (
    <>
      <Grid container justify="center">
        <Grid container direction="column" className="ItemInfoContainer">
          <Grid item container justify="space-between">
            <Grid
              item
              container
              xs={2}
              direction="column"
              justify="space-between"
            >
              {[1, 2, 3, 4, 5].map((value, index) => {
                return (
                  <Button>
                    <img
                      className="smallPic"
                      key={index}
                      src={ImgArr[index]}
                      alt=""
                      onClick={(event) => {
                        setLargePic(event.target.src)
                        // console.log(event.target.src)
                      }}
                    />
                  </Button>
                )
              })}
            </Grid>
            <Grid item xs={10}>
              <img className="largePic" src={largePic} alt="" />
            </Grid>
          </Grid>

          <Grid
            item
            container
            direction="column"
            justify="space-between"
            style={{ marginTop: '30px', marginLeft: '20px', fontSize: '36px' }}
          >
            <p style={{ margin: '0px' }}>
              {productData.iIdData && productData.iIdData.iName}
            </p>

            {/* 標籤 */}
            <Grid container spacing={2}>
              <Chips></Chips>
              {/* <Chips></Chips> */}
              {/* <Chips></Chips> */}
            </Grid>
          </Grid>

          <Divider variant="middle" style={{ marginTop: '30px' }} />

          <Grid item container justify="space-between">
            <Grid
              item
              xs={1}
              style={{
                marginTop: '50px',
                marginLeft: '20px',
                fontSize: '60px',
                color: '#FF5554',
              }}
            >
              $
              {productData.specificationData &&
                productData.specificationData[specIndex].sPrice}
            </Grid>

            <Grid item xs={1} style={{ marginTop: '80px', fontSize: '16px' }}>
              商品數量：{productData.iIdData && productData.iIdData.iQty}
            </Grid>

            {/* <Grid item> */}
            <Grid item xs={8} style={{ fontSize: '16px' }}>
              <Buttons
                handleClick={handleClick}
                handleClose={handleClose}
                anchorEl={anchorEl}
                getCartData={getCartData}
                productData={productData}
                specIndex={specIndex}
                setSpecIndex={setSpecIndex}
                specArr={specArr}
                iId={props.match.params.iId}
              ></Buttons>
            </Grid>
            {/* </Grid> */}
          </Grid>

          <Grid item style={{ marginTop: '50px' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="商品介紹" />
              <Tab label="留言" />
            </Tabs>
            <Divider variant="middle" />

            <Grid container justify="center" style={{ marginTop: '30px' }}>
              <Grid item>
                <TabPanel value={value} index={0}>
                  {/* {productData.iIdData && productData.iIdData.iDiscr} */}

                  <p style={{ fontSize: '16px', textAlign: 'center' }}>
                    ★G1精品級濾掛咖啡
                  </p>
                  <p style={{ fontSize: '16px', textAlign: 'center' }}>
                    ★國際咖啡師杯測把關
                  </p>
                  <p style={{ fontSize: '16px', textAlign: 'center' }}>
                    ★30年老師傅精心烘焙
                  </p>

                  <p
                    style={{
                      fontSize: '16px',
                      maxWidth: '500px',
                      textAlign: 'center',
                      marginTop: '50px',
                    }}
                  >
                    我們對於咖啡烘焙充滿著無比的熱情。每一款咖啡都需要不同的時間與溫度，以粹煉出最完美的烘焙境界，進而為每一杯咖啡帶來獨有的香氣、酸度、體度與風味。
                  </p>

                  <p
                    style={{
                      fontSize: '16px',
                      maxWidth: '500px',
                      textAlign: 'center',
                      marginTop: '50px',
                    }}
                  >
                    此款綜合產區咖啡豆具有柑橘香氣，且帶有一絲花香甜美氣息，更能品嘗到平衡的可可尾韻。
                  </p>

                  <img
                    src="http://localhost:3000/index/items-index-pic.jpg"
                    style={{ maxWidth: '500px' }}
                    alt=""
                  ></img>

                  <p
                    style={{
                      fontSize: '24px',
                      textAlign: 'center',
                      marginTop: '50px',
                    }}
                  >
                    商品規格
                  </p>

                  <p style={{ fontSize: '16px', textAlign: 'center' }}>
                    酸度:2
                  </p>
                  <p style={{ fontSize: '16px', textAlign: 'center' }}>
                    醇度:4
                  </p>
                  <p style={{ fontSize: '16px', textAlign: 'center' }}>
                    產區:拉丁美洲
                  </p>
                  <p style={{ fontSize: '16px', textAlign: 'center' }}>
                    處理法:自然乾燥法(日曬)
                  </p>
                  <p style={{ fontSize: '16px', textAlign: 'center' }}>
                    適合搭配的食物風味:果乾、焦糖、牛奶巧克力
                  </p>
                  <p style={{ fontSize: '16px', textAlign: 'center' }}>
                    海拔:950-1,200公尺
                  </p>
                  <p style={{ fontSize: '16px', textAlign: 'center' }}>
                    變種:Yellow Bourbon
                  </p>
                </TabPanel>
              </Grid>
            </Grid>

            <Grid container justify="center" style={{ marginTop: '30px' }}>
              <Grid item>
                <TabPanel value={value} index={1}>
                  <MessageText></MessageText>
                </TabPanel>
              </Grid>
            </Grid>
          </Grid>

          <Divider variant="middle" style={{ marginTop: '30px' }} />
        </Grid>
      </Grid>
    </>
  )
}
export default withRouter(ItemInfo)
