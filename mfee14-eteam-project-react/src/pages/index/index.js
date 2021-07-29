import React, { useState, useEffect } from 'react'
import './index.css'
import longcolorship from './img/long-colorship.png'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import $ from 'jquery'
import { TableSortLabel } from '@material-ui/core'
import Herrosection from './components/Herrosection'
import Phoneherrosection from './components/Phoneherrosection'
import Twosection from './components/Twosection'
import Threesection from './components/Threesection'
import Foursection from './components/Foursection'

function Index(props) {
  const [users, setUsers] = useState([])
  const [general, setgeneral] = useState([])
  const [dataLoading, setDataLoading] = useState(false)
  async function getUsersFromServer() {
    // 開啟載入指示
    setDataLoading(true)
    // 連接的伺服器資料網址
    const url = 'http://localhost:7000/home/read'
    // 注意header資料格式要設定，伺服器才知道是json格式
    //request代表是要跟伺服器要求
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    //29.設定檔頭為json
    //27~33.先告訴伺服器說我等傳過來是json
    //37.用await等伺服器做fetch,fetch回來接收到response
    //39.解出這個json
    const response = await fetch(request)
    const data = await response.json()
    // const homedata = data[0] //data的第幾筆資料
    // // console.log(homedata)
    // 設定資料
    setUsers(data)
    // // console.log(setUsers(data))
    // console.log(data)
    // console.log(users)
  }

  //////////////一般商品
  async function generalServer() {
    // 開啟載入指示
    setDataLoading(true)

    // 連接的伺服器資料網址
    const url = 'http://localhost:7000/home/general'
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
    // console.log(data)
    setgeneral(data)
  }

  // // 一開始就會開始載入資料
  useEffect(() => {
    // taste()  //假如這是新增的async function taste()
    getUsersFromServer()
  }, [])
  // // 一開始就會開始載入資料
  useEffect(() => {
    generalServer()
  }, [])

  //////////nav/////////////////
  useEffect(() => {
    $(window).scroll(function () {
      let scrolltop = $(this).scrollTop() //console.log(scrolltop);
      let windowheight = $(window).height() //為可視範圍console.log(windowheight);
      let websideheight = $('body').height() //console.log(websideheight);
      let persent = Math.floor(
        (scrolltop / (websideheight - windowheight)) * 100
      )
      console.log(persent) //等於 scrolltop/scrolltop
      // if (persent >= 0) {
      //   $('nav').css(' position', 'fixed').css('z-index', '6')
      // }
      if (persent >= 15) {
        $('nav').css('opacity', '0')
      } else {
        $('nav').css('transition', '0.5s').css('opacity', '1')
      }
    })
  }, [])

  /////////////////////////////////////////////////////

  /////////////////////自動輪播軸/////////////////////////
  // const [data, setData] = useState('老師說123')
  let nowpage = 0
  let myInterval = 0

  useEffect(() => {
    $('.index-slider-dots .index-dots').mouseenter(function () {
      // console.log($(this)); 確定滑到哪個物件
      $(this).css('color', '#FF5554').siblings().css('color', '#0065b4')
      let moveX = $(this).index() * -1920
      // console.log(moveX);
      nowpage = $(this).index()
      $('.index-img-wrap').css('Transform', ` translateX(${moveX}px)`)
    })
  }, [])
  useEffect(() => {
    let myInterval = 0
    function changepage() {
      let moveX = nowpage * -1920
      $('.index-img-wrap').css('transform', `translateX(${moveX}px)`)
      $('.index-slider-dots .index-dots')
        .eq(nowpage)
        .css('color', '#FF5554')
        .siblings()
        .css('color', '#0065b4')
    }
    function startmyInterval() {
      myInterval = setInterval(() => {
        if (nowpage < 4) {
          nowpage++
        } else {
          nowpage = 0
        }
        changepage()
      }, 5000)
    }
    startmyInterval()
    $('.index-img-wrap').mouseenter(function () {
      clearInterval(myInterval)
    })
    $('.index-img-wrap').mouseleave(function () {
      myInterval = setInterval(() => {
        if (nowpage < 4) {
          nowpage++
        } else {
          nowpage = 0
        }
        changepage()
      }, 3000)
    })
  }, [])

  /////////////// click事件移動商品功能/////////////////
  // const [data, setData] = useState('老師說123')
  // componentDidMount
  let count = 0

  useEffect(() => {
    $('.index-button-box-left').on('click', () => {
      if (count === -7) {
        return
      }
      count--
      let movex = count * 100
      $('.index-box1').css('Transform', ` translateX(${movex}px`)
    })
  }, [])

  useEffect(() => {
    $('.index-button-box-right').on('click', () => {
      if (count === 1) {
        return
      }
      count++
      let movex = count * 100
      $('.index-box1').css('Transform', ` translateX(${movex}px`)
    })
  }, [])

  ////////////////////////// jquery 購物車懸浮功能/////////////////////////////
  useEffect(() => {
    $(window).scroll(function () {
      let scrolltop = $(this).scrollTop() //console.log(scrolltop);
      let windowheight = $(window).height() //為可視範圍console.log(windowheight);
      let websideheight = $('body').height() //console.log(websideheight);
      let persent = Math.floor(
        (scrolltop / (websideheight - windowheight)) * 100
      )
      // console.log(persent) //等於 scrolltop/scrolltop
      if (persent >= 18) {
        $('.index-chart-box').css('display', 'block').css('position', 'fixed')
      } else {
        $('.index-chart-box').css('display', 'none')
      }

      //////////////滑鼠移下來card移動////////
      if (persent >= 2) {
        $('.index-onepage-rectangle')
          .css('transition', '1s')
          .css('transform', `translateX(${-40}px`)
      }
      //////////////   第一頁：圖片上文字隨滑動淡入淡出效果////////////
      if (persent === 0) {
        $('.index-herro-text').css('opacity', '1').css('transition', '1.5s')
      }
      ///////////    第二頁：文字card下滑時切開特效///////////
      if (persent >= 22) {
        $('.index-cardtwo')
          .css('transition', '1.5s')
          .css('transform', `translate(${130}px,${-130}px)`)
      }
      if (persent >= 22) {
        $('.index-twopage-rectangle')
          .css('transform', `translate(${80}px,${-80}px)`)
          .css('transition', '1.5s')
      }
      ///////////////////   第三頁：圖片上文字隨滑動淡入淡出效果////////////
      if (persent >= 40) {
        $('.index-three-content').css('opacity', '1').css('transition', '1.5s')
      }
      ///////////////    第四頁：隨滑動改變底部色塊顏色/////////////
      if (persent >= 80) {
        $('.index-four-rectangle')
          .css('transition', '1.5s')
          .css('background', '#b2cceb')
      }
    })
  }, [])
  /////////////top返回上///////////////////////

  useEffect(() => {
    $(document).ready(function () {
      $('.index-top-box a').click(function (event) {
        event.preventDefault()
        $('html,body').animate(
          {
            scrollTop: 0,
          },
          3000
        )
      })
    })
  }, [])

  return (
    <>
      <body className="index-body">
        <div className="index-container">
          <Herrosection />
        </div>
        <div className="index-phone-herro-section">
          <Phoneherrosection />
        </div>
        <div className="index-container">
          <Twosection />
          <Threesection />
          <div className="index-container-1">
            <Foursection />
          </div>
        </div>
      </body>

      {/* //////////////////////////////// */}
    </>
  )
}

export default withRouter(Index)
