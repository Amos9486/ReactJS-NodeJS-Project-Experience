/**
 * 1.單價隨規格連動未完成
 * 2.總價待修正變數值(setPrice), 商品數量加減沒有連動到 state中
 * 3.未連動資料庫(sql語法未完成)
 */
import React, { useState, useEffect } from 'react'
import {
  TextField,
  MenuItem,
  Container,
  makeStyles,
  Grid,
  Typography,
  Hidden,
  Paper,
} from '@material-ui/core'

//功能組件
// import CateSelect from './CateSelect'

function CartCard(props) {
  const [dataLoading, setDataLoading] = useState(false)

  const {
    step1,
    setStep1,
    // state,
    // setState,
    // price,
    // setPrice,
    // cateLabel,
    // handleChange,
    // count,
    // setCount,
    // cateLabels,
    // getCartData,
  } = props
  async function getCartFromServer() {
    // 開啟載入指示
    setDataLoading(true)

    // 連接的伺服器資料網址
    const url = 'http://localhost:7000/cart/session?cartQty=0'
    // const url = Settings.host + '/users'

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      credentials: 'include',
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log(data)
    // 設定資料
    setStep1(data.cart)
  }

  async function deletcUserFromServer(iId) {
    // 開啟載入指示
    setDataLoading(true)

    // 連接的伺服器資料網址
    const url = `http://localhost:7000/cart/session/remove/${iId}`
    // const url = `http://localhost:7000/cart/session/remove/1`
    // const url = 'http://localhost:7000/cart/session/clear'

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      credentials: 'include',
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log(data.cart)

    // 設定資料
    if (!data.cart.iId) {
      const newStep1 = step1.filter((value, index) => {
        return value.id !== step1
      })
      // let emptyStep1=[]

      setStep1(newStep1)
      // alert('刪除完成')
    }
  }
  useEffect(() => {
    deletcUserFromServer()
  }, [])
  useEffect(() => {
    getCartFromServer()
  }, [])

  //新增商品數量
  async function getCartData1(iId, cartQty) {
    // 連接的伺服器資料網址
    // const url = 'http://localhost:7000/cart/session?iId=${iId}&cartQty=${cartQty}'
    const url = 'http://localhost:7000/cart/session?iId=1&cartQty=1'

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
    setStep1(data.cart)
    // console.log(step1)
  }

  useEffect(() => {
    getCartData1()
  }, [])

  //減少商品數量
  async function getCartData2(iId, cartQty) {
    // 連接的伺服器資料網址
    const url = `http://localhost:7000/cart/session?iId=${iId}&cartQty=-1`
    // const url = 'http://localhost:7000/cart/session?iId=1&cartQty=-1'

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
    setStep1(data.cart)
    // console.log(step1)
  }

  useEffect(() => {
    getCartData1()
  }, [])
  // 每次users資料有變動就會X秒後關掉載入指示
  // useEffect(() => {
  //   setTimeout(() => {
  //     setDataLoading(false)
  //   }, 1000)
  // }, [step1])

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(0),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: '150px',
      width: '100%',
    },
    image: {
      width: 125,
      height: 125,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '125px',
      maxHeight: '125px',
    },
    tdName:{
      width:'70px'
    }
  }))
  const classes = useStyles()
  return (
    <>
      {/* <tbody className="cart-tbody"> */}
      {step1.length < 0 ? (
        <tr>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                style={{
                  // borderBottom: '1px solid #0065b4',
                  width: '80%',
                  margin: '60px auto',
                }}
                variant="subtitle1"
              >
                <h2>購物車沒有商品</h2>
              </Typography>
              <Grid
                item
                xs={12}
                style={{
                  margin: '30px 46%',
                  width: '100px',
                }}
              >
                <button className="outlineChoose">去選購</button>
              </Grid>

              <Paper elevation={0} className={classes.paper}></Paper>
            </Grid>
          </Grid>
        </tr>
      ) : (
        step1.map((v, i) => {
          v.iName = step1[i].iName
          v.sName = step1[i].sName
          v.iImg = step1[i].iImg
          v.iId = step1[i].iId
          v.cartQty = step1[i].cartQty
          v.sPrice = step1[i].sPrice
          v.total = v.cartQty * v.sPrice
          return (
            <Grid
              container
              key={i}
              value={i}
              style={{
                // width: '95%',
                // display: 'flex',
                // alignSelf:'center',
                justifyContent: 'space-between',
              }}
              className="item-card  "
            >
              <div className="item-td">
                <input type="hidden" key={i} className="cartId" value={v.iId} />
                <img
                  src={`http://localhost:3000/img/index/generalproduct/${v.iImg}`}
                  alt="商品圖片"
                  className={classes.img}
                />
              </div>

              {/* <div key={i} value={i}> */}
              <div className={classes.tdName}>{v.iName}</div>
              {/* </div> */}

              <div className="item-td">
                {/* <TextField
                    select
                    value={v.sName}
                    key={i}
                    onChange={v.handleChange}
                  > */}
                {/* 規格待修 */}
                {/* {cateLabels.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField> */}
                {/* <Grid
                  item
                  xs={2}
                  style={{ margin: '10px auto', width: '10px' }}
                > */}
                {v.sName}
                {/* </Grid> */}
              </div>

              <div className="item-div">
                {/* <Grid item style={{ margin: '10px' }}> */}
                <button
                  className="delete"
                  type="button"
                  onClick={v.cartQty <= 1 ? 1 : () => getCartData2(v.iId)}
                >
                  -
                </button>
                {v.cartQty}
                <button
                  type="button"
                  onClick={() => getCartData1(v.iId)}
                  className="delete"
                >
                  +
                </button>
                {/* </Grid> */}
              </div>
              {/* <Grid item style={{ margin: '10px' }}>
                  {v.sPrice}
                </Grid>
                <Grid item style={{ margin: '10px' }}>
                  <div className="item-div"> {v.total}</div>
                </Grid> */}
              <td className="item-td">NT$ {v.sPrice}</td>
              <td className="item-td">NT$ {v.total}</td>
              {/* <div className="cart-th"></div> */}

              {/* <div colSpan="2" className="item-div"> */}
              {/* <Hidden smDown>
                    <button className="outlineChoose" onClick={(e) => {}}>
                      下次再買
                    </button>
                  </Hidden> */}
              <Grid item style={{ margin: '10px' }}>
                <button
                  className="delete"
                  type="button"
                  onClick={() => deletcUserFromServer(v.iId)}
                >
                  X
                </button>
              </Grid>
              {/* </div> */}
            </Grid>
          )
        })
      )}
      {/* </tbody> */}
    </>
  )
}
export default CartCard
