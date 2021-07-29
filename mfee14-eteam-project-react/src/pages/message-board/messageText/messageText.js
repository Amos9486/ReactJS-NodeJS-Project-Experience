import React, { useState, useEffect } from 'react'

import { withRouter } from 'react-router-dom'

import $ from 'jquery'

import './messageText.css'
// 星星套件
import Rating from '@material-ui/lab/Rating'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

function MessageText(props) {
  // 人物頭像
  const [usersImg, setusersImg] = useState('')
  // 顯示
  const [msg, setMsg] = useState([])
  // 新增
  const [message, setMessage] = useState('')
  // 星星
  const [mStar, setMstar] = useState(0)
  // 點讚 (用來存mId)
  const [mLike, setMlike] = useState('')
  // 點讚 (用來統計數量)
  const [mLikeTotal, setMlikeTotal] = useState(0)
  // Loading
  const [dataLoading, setDataLoading] = useState(false)

  // 顯示users 人物頭像
  async function getUsersImgToServer() {
    setDataLoading(true)
    const token = localStorage.getItem('token')
    const url = `${process.env.REACT_APP_USERSURL}/usersImg`
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
    console.log('伺服器回傳人物頭像原有資料:', data)

    setusersImg(data)
  }

  // 顯示留言資訊
  async function getMessageToServer(iId) {
    setDataLoading(true)
    // const token = localStorage.getItem('token')

    const url = `${process.env.REACT_APP_USERSURL}/messageText/` + iId
    const req = new Request(url, {
      method: 'post',
      body: JSON.stringify({ iId }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log('伺服器回傳原有資料:', data)

    setMsg(data)
  }

  // 新增留言功能
  async function postMessageToServer() {
    // 開啟載入指示
    setDataLoading(true)
    // 取得使用者輸入的值
    const token = localStorage.getItem('token')
    const newData = { message, token, mStar }
    // 連接的伺服器資料網址
    const url = `${process.env.REACT_APP_USERSURL}/messageAdd/`
    // 注意資料格式要設定，伺服器才知道是json格式
    const req = new Request(url, {
      method: 'post',
      body: JSON.stringify(newData),
      // cross origin 傳送 cookie
      // credentials: 'include',
      // 預先告訴伺服器  等等要傳的資料為json 格式
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const res = await fetch(req)
    const data = await res.json()

    console.log('伺服器回傳新增的資料:', data)

    setTimeout(() => {
      // 關閉指示器
      setDataLoading(false)
      if (data !== false) {
        alert('留言成功')
        // 強制刷新頁面
        window.location.reload()
        // props.history.push('/messageText')
      } else {
        alert('留言失敗')
        props.history.push('/messageText')
      }
    }, 1000)
  }

  // 點讚數更新

  async function putMessageTextMlike(mId) {
    const token = localStorage.getItem('token')
    const newData = { mId, token }
    const url = `${process.env.REACT_APP_USERSURL}/messagemlike/`
    // 注意資料格式要設定，伺服器才知道是json格式
    const req = new Request(url, {
      method: 'put',
      body: JSON.stringify(newData),
      // cross origin 傳送 cookie
      // credentials: 'include',
      // 預先告訴伺服器  等等要傳的資料為json 格式
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const res = await fetch(req)
    const data = await res.json()

    console.log('伺服器回傳點讚更新的資料:', data)

    window.location.reload()

    // setMlikeTotal(data)
  }

  useEffect(() => {
    if (localStorage.token) {
      getUsersImgToServer()
      getMessageToServer()
    } else {
      alert('請先行登入')
      props.history.push('/usersLogin')
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setDataLoading(false)
    }, 1000)
  }, [message])

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
      <div>
        會員
        <img
          src={`http://localhost:7000/img/${
            usersImg.length && usersImg[0].uImg
          }`}
          alt="123"
          style={{ width: '100px' }}
        ></img>
      </div>
      <div>會員名稱:{usersImg.length && usersImg[0].uName}</div>
      <textarea
        id="message"
        name="message"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value)
        }}
        placeholder="請填寫留言內容"
      ></textarea>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend"></Typography>
        <Rating
          name="mStar"
          value={mStar}
          onChange={(e) => {
            setMstar(e.target.value)
          }}
        />
      </Box>

      <button
        onClick={() => {
          postMessageToServer()
        }}
      >
        留言
      </button>
      <button
        onClick={() => {
          props.history.push('/messageText')
        }}
      >
        取消
      </button>

      {/* 呈現 */}

      {msg.length &&
        msg.map((v) => {
          return (
            <div key={v.mId}>
              <div>
                會員照片
                <img
                  src={`http://localhost:7000/img/${v.uImg}`}
                  alt="123"
                  style={{ width: '100px' }}
                ></img>
              </div>
              <div>會員名稱:{v.uName}</div>
              <div>留言內容:{v.message}</div>
              <div>
                總計讚數:
                {/* {mLikeTotal === 1 ? Number(v.mLike) + 1 : Number(v.mLike) + 0} */}
                {v.mLike}
                <button
                  // ****要傳任何值前，都先將值帶入該<tag>內，放入onCilck {(e)=>{e.target.值}}進行傳遞作業
                  id={v.mId}
                  onClick={(e) => {
                    // 取值
                    setMlike(e.target.id)
                    // 將取道的值帶入function 內 執行後續處理
                    putMessageTextMlike(e.target.id)
                    //指的就是該<button></button>
                    // console.log(e.target)
                    // 檢查是否有值
                    // console.log(mLike)
                  }}
                >
                  點讚
                </button>
              </div>
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend"></Typography>
                <Rating name="read-only" value={v.mStar} readOnly />
              </Box>
              <div>留言日期:{v.created_at}</div>
            </div>
          )
        })}
    </>
  )
  return <>{dataLoading ? loading : display}</>
}

export default withRouter(MessageText)
