import React, { useState, useEffect } from 'react'

import './usersConsumption.css'

import UsersTitle from '../components/usersTitle'

import { Link, withRouter } from 'react-router-dom'
// orderby
import SelectOrderBy from '../components/selectOrderBy'

// 分頁
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'

import $ from 'jquery'
// 分頁
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}))

function UsersConsumption(props) {
  // 1. 從伺服器來的原始資料
  const [uConsump, setUconsump] = useState('')
  // 2. 用於網頁上經過各種處理(排序、搜尋、過濾)後的資料
  const [displayUConsump, setDisplayUConsump] = useState('')
  // 排序
  const [uOrder, setUorder] = useState('')
  // loading
  const [dataLoading, setDataLoading] = useState(false)
  // 分頁
  const [uPage, setUpage] = useState(1)
  const classes = useStyles()

  // 初始畫面
  async function getConsumptionToServer() {
    setDataLoading(true)

    const token = localStorage.getItem('token')
    const url = `${process.env.REACT_APP_USERSURL}/usersConsumption/`

    const req = new Request(url, {
      method: 'post',
      body: JSON.stringify({ token }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log('伺服器回傳資料:', data)

    setUconsump(data)
  }

  // 排序 後的資料 要存入原本的畫面
  async function getConsumptionOrderBy(uOrder) {
    setDataLoading(true)
    const token = localStorage.getItem('token')
    const newData = { ...uOrder, token }
    // console.log('newData', newData)
    const url = `${process.env.REACT_APP_USERSURL}/usersConsumptionOrderBy/`

    const req = new Request(url, {
      method: 'post',
      body: JSON.stringify(newData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log('伺服器回傳資料:', data)
    // 要存入原本顯示的狀態
    setUconsump(data)
  }

  //頁數
  async function getConsumptionPage(uPage) {
    setDataLoading(true)
    const token = localStorage.getItem('token')
    const newData = { ...uPage, token }
    // console.log('newData', newData)
    const url = `${process.env.REACT_APP_USERSURL}/usersConsumptionPage/`

    const req = new Request(url, {
      method: 'post',
      body: JSON.stringify(newData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log('伺服器回傳page資料:', data)
    // 要存入原本顯示的狀態
    setUconsump(data)
  }

  useEffect(() => {
    if (localStorage.token) {
      getConsumptionToServer()
    } else {
      alert('請先行登入')
      props.history.push('/usersLogin')
    }
  }, [])

  // hover放大效果
  // 如果用jquery 不能用this
  // useEffect(() => {
  //   $('.UserConsumptionImg').on(' mouseenter ', function () {
  //     console.log('hi')
  //     $('.UserConsumptionImg')
  //       .css('Transform', `scale(${1.5})`)
  //       .css('transition', '1s')
  //   })
  //   $('.UserConsumptionImg').on('mouseleave', function () {
  //     $('.UserConsumptionImg')
  //       .css('Transform', `scale(${2})`)
  //       .css('transition', '2s')
  //   })
  // }, [])

  // 表單元素有更動時
  useEffect(() => {
    // 先開起載入指示器
    // setDataLoading(true)
    // 設一個空array
    // let newConsumption = []
    // 將要執行的function 放入
    // newConsumption = getConsumptionOrderBy()
    // 設定回狀態
    // setDisplayUConsump(newConsumption)
    // 關閉指示器
    setTimeout(() => {
      setDataLoading(false)
    }, 800)
  }, [uOrder, uPage])

  const loading = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )

  const display = (
    <>
      <div className="userConsumptionF">
        {/* 排序 */}
        {/*  props 可以傳狀態也可以傳function */}
        <SelectOrderBy
          uOrder={uOrder}
          setUorder={setUorder}
          getConsumptionOrderBy={getConsumptionOrderBy}
          getConsumptionToServer={getConsumptionToServer}
        />
      </div>
      <div className="UserConsumptiondiv">
        <div className="UserConsumptionFlex">
          <div>訂單編號</div>
          <div>我的商品</div>
          <div>商品名稱</div>
          <div>規格</div>
          <div>購買數量</div>
          <div>購買時商品價格</div>
          <div>總價</div>
          <div>日期</div>
        </div>
        {uConsump.length &&
          uConsump.map((v, i) => {
            return (
              <div className="UserConsumptionText" key={i}>
                <div className="UserConsumptionId">{v.oId}</div>
                <div className="UserConsumptionPicture">
                  <img
                    className="UserConsumptionImg"
                    src={`http://localhost:3000/img/index/generalproduct/${v.iImg}`}
                    alt="123"
                  />
                </div>
                <div className="UserConsumptionName">{v.oListName}</div>
                <div className="UserConsumptionSpec">{v.sName}</div>
                <div className="UserConsumptionQty">{v.oQty}</div>
                <div>
                  <p className="UserConsumptionSpecialoffer">
                    {`原價${v.iPrice}`}
                  </p>
                  <p>{v.oListPrice}</p>
                </div>
                <div className="UserConsumptionTotal">
                  {v.oQty * v.oListPrice}
                </div>
                <div>{v.oDate}</div>
              </div>
            )
          })}

        <div className="UserConsumptionPageBox">
          <div className={`${classes.root} `}>
            {/* <Pagination
              className="UserConsumptionPage"
              count={5}
              size="large"
              onChange={(e) => {
                setUpage(e.target.innerText)
                // console.log(e.target.innerText)
                console.log(e)
                getConsumptionPage(e.target.innerText)
              }}
            /> */}
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      <UsersTitle />
      {dataLoading ? loading : display}
    </>
  )
}

export default withRouter(UsersConsumption)
