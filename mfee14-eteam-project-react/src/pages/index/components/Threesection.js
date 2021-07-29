import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import '.././index.css'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
// import { withRouter } from 'react-router-dom'
// import colorshlip from '../img/colorshlip.png'
// import phonetwosection from '../img/phone-twosection.jpg'
import longcolorship from '../img/long-colorship.png'
import phonethreesection from '../img/phone-threesection.jpg'

function Threesection() {
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
  //////////////////// 第三頁：向下滑動，分隔用長條色塊移入//////////////////////
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
      if (persent >= 15) {
        $('.about-banner-group').css('opacity', '1').css('transition', '2.5s')
      }
      if (persent >= 66) {
        $('.index-long-colorship').css('left', '80%').css('transition', '3s')
      }
    })
  }, [])
  ///////////點擊愛心會變色//////////
  useEffect(() => {
    $('.indexlove').click(function () {
      $('.indexlove').toggleClass('active')
    })
  }, [])
  useEffect(() => {
    $('.indexlove-2').click(function () {
      $('.indexlove-2').toggleClass('active')
    })
  }, [])

  useEffect(() => {
    $('.index-new-product-3').click(function () {
      $('.index-new-product-3').toggleClass('active')
    })
  }, [])
  useEffect(() => {
    $('.index-new-product-4').click(function () {
      $('.index-new-product-4').toggleClass('active')
    })
  }, [])
  useEffect(() => {
    $('.index-new-product-5').click(function () {
      $('.index-new-product-5').toggleClass('active')
    })
  }, [])
  useEffect(() => {
    $('.index-new-product-6').click(function () {
      $('.index-new-product-6').toggleClass('active')
    })
  }, [])

  ////////////new的資訊滑鼠hover圖片放大////////////  ss
  useEffect(() => {
    // 1
    $('.index-newproduct-hover-1').on(' mouseenter ', function () {
      $('.index-newproduct-hover-1')
        .css('Transform', `scale(${1.5})`)
        .css('transition', '1s')
    })
    $('.index-newproduct-hover-1').on('mouseleave', function () {
      $('.index-newproduct-hover-1')
        .css('Transform', `scale(${1})`)
        .css('transition', '1s')
    })
    // 2
    $('.index-newproduct-hover-2').on(' mouseenter ', function () {
      $('.index-newproduct-hover-2')
        .css('Transform', `scale(${1.5})`)
        .css('transition', '1s')
    })
    $('.index-newproduct-hover-2').on('mouseleave', function () {
      $('.index-newproduct-hover-2')
        .css('Transform', `scale(${1})`)
        .css('transition', '1s')
    })
    // 3/
    $('.index-newproduct-hover-3').on(' mouseenter ', function () {
      $('.index-newproduct-hover-3')
        .css('Transform', `scale(${1.5})`)
        .css('transition', '1s')
    })
    $('.index-newproduct-hover-3').on('mouseleave', function () {
      $('.index-newproduct-hover-3')
        .css('Transform', `scale(${1})`)
        .css('transition', '1s')
    })

    // //4 /
    $('.index-newproduct-hover-4').on(' mouseenter ', function () {
      $('.index-newproduct-hover-4')
        .css('Transform', `scale(${1.5})`)
        .css('transition', '1s')
    })
    $('.index-newproduct-hover-4').on('mouseleave', function () {
      $('.index-newproduct-hover-4')
        .css('Transform', `scale(${1})`)
        .css('transition', '1s')
    })

    // //5
    $('.index-newproduct-hover-5').on(' mouseenter ', function () {
      $('.index-newproduct-hover-5')
        .css('Transform', `scale(${1.5})`)
        .css('transition', '1s')
    })
    $('.index-newproduct-hover-5').on('mouseleave', function () {
      $('.index-newproduct-hover-5')
        .css('Transform', `scale(${1})`)
        .css('transition', '1s')
    })

    // //
    $('.index-newproduct-hover-6').on(' mouseenter ', function () {
      $('.index-newproduct-hover-6')
        .css('Transform', `scale(${1.5})`)
        .css('transition', '1s')
    })
    $('.index-newproduct-hover-6').on('mouseleave', function () {
      $('.index-newproduct-hover-6')
        .css('Transform', `scale(${1})`)
        .css('transition', '1s')
    })
  }, [])
  //scale(1.16)scale(1.16)

  return (
    <>
      <div className="index-three-section">
        <div className="index-threepage-pic-bg"></div>
        <div className="index-phone-three-pic">
          <img src={phonethreesection} alt="phonethreesection" />
        </div>
        <div className="index-three-content">
          <div className="index-threepic-big-text">在車水馬龍的都會中，</div>
          <div className="index-threepic-big-text">你渴求著片刻的喘息...</div>

          <div className="index-threepic-small-text">
            我們將守著那寧靜的角落，將一抹芬芳贈與給你
          </div>
        </div>
        <div className=" index-newproduct-text">
          New product listing
          <div className="index-border-bottom-white"></div>
        </div>

        <Link to="#/" className="index-button-black fontsize-20">
          ALL
        </Link>

        {/* ///////phone點擊按鈕的card */}
        <div className="index-phone-threesection-click-card">
          <div className="index-box">
            <div className="index-box1">
              <div className="index-box1-pic">
                <img
                  className="index-newproduct-hover-1"
                  src={`http://localhost:3000/img/index/newproduct/${
                    users.length > 0 && users[0].iImg
                  }`}
                  alt="123"
                />
              </div>
              <div className="index-item-1">
                <div className="index-item-2">
                  <div className="index-product-card-text1">
                    {users.length > 0 && users[0].iName}
                  </div>
                  <div className="indexlove">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 455.52"
                    >
                      <defs>
                        <style
                          dangerouslySetInnerHTML={{
                            __html: '.cls-1{}',
                          }}
                        />
                      </defs>
                      <g id="圖層_2" data-name="圖層 2">
                        <g id="圖層_1-2" data-name="圖層 1">
                          <path d="M471.38,44.58C444.88,15.83,408.51,0,369,0c-29.55,0-56.62,9.34-80.45,27.77a164.79,164.79,0,0,0-32.52,34,164.31,164.31,0,0,0-32.53-34C199.65,9.34,172.58,0,143,0,103.49,0,67.12,15.83,40.61,44.58,14.43,73,0,111.8,0,153.87c0,43.3,16.14,82.94,50.78,124.74C81.77,316,126.32,354,177.9,397.93c17.61,15,37.58,32,58.31,50.15a30.06,30.06,0,0,0,39.58,0c20.73-18.13,40.7-35.16,58.32-50.18,51.58-44,96.12-81.9,127.11-119.3C495.87,236.81,512,197.17,512,153.87,512,111.8,497.57,73,471.38,44.58Z" />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
                {/* //// */}
                <div className="index-product-card-text2">
                  {users.length > 0 && users[0].iDiscr}
                </div>
                <div className="index-product-card-text3">
                  特價:{users.length > 0 && users[0].iPrice}元
                </div>

                <Link to="#/" className="index-card-button">
                  購買
                </Link>
              </div>
            </div>
            <div className="index-box1">
              <div className="index-box1-pic">
                <img
                  className="index-newproduct-hover-2"
                  src={`http://localhost:3000/img/index/newproduct/${
                    users.length > 0 && users[1].iImg
                  }`}
                  alt="123"
                />
              </div>
              <div className="index-item-1">
                <div className="index-item-2">
                  <div className="index-product-card-text1">
                    {users.length > 0 && users[1].iName}
                  </div>
                  <div className="indexlove-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 455.52"
                    >
                      <defs>
                        <style
                          dangerouslySetInnerHTML={{
                            __html: '.cls-1{}',
                          }}
                        />
                      </defs>
                      <g id="圖層_2" data-name="圖層 2">
                        <g id="圖層_1-2" data-name="圖層 1">
                          <path d="M471.38,44.58C444.88,15.83,408.51,0,369,0c-29.55,0-56.62,9.34-80.45,27.77a164.79,164.79,0,0,0-32.52,34,164.31,164.31,0,0,0-32.53-34C199.65,9.34,172.58,0,143,0,103.49,0,67.12,15.83,40.61,44.58,14.43,73,0,111.8,0,153.87c0,43.3,16.14,82.94,50.78,124.74C81.77,316,126.32,354,177.9,397.93c17.61,15,37.58,32,58.31,50.15a30.06,30.06,0,0,0,39.58,0c20.73-18.13,40.7-35.16,58.32-50.18,51.58-44,96.12-81.9,127.11-119.3C495.87,236.81,512,197.17,512,153.87,512,111.8,497.57,73,471.38,44.58Z" />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="index-product-card-text2">
                  {users.length > 0 && users[1].iDiscr}
                </div>
                <div className="index-product-card-text3">
                  特價:{users.length > 0 && users[1].iPrice}元
                </div>
                <Link to="#/" className="index-card-button">
                  購買
                </Link>
              </div>
            </div>
            <div className="index-box1">
              <div className="index-box1-pic">
                <img
                  className="index-newproduct-hover-3"
                  src={`http://localhost:3000/img/index/newproduct/${
                    users.length > 0 && users[2].iImg
                  }`}
                  alt="123"
                />
              </div>
              <div className="index-item-1">
                <div className="index-item-2">
                  <div className="index-product-card-text1">
                    {users.length > 0 && users[2].iName}
                  </div>
                  <div className="index-new-product-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 455.52"
                    >
                      <defs>
                        <style
                          dangerouslySetInnerHTML={{
                            __html: '.cls-1{}',
                          }}
                        />
                      </defs>
                      <g id="圖層_2" data-name="圖層 2">
                        <g id="圖層_1-2" data-name="圖層 1">
                          <path d="M471.38,44.58C444.88,15.83,408.51,0,369,0c-29.55,0-56.62,9.34-80.45,27.77a164.79,164.79,0,0,0-32.52,34,164.31,164.31,0,0,0-32.53-34C199.65,9.34,172.58,0,143,0,103.49,0,67.12,15.83,40.61,44.58,14.43,73,0,111.8,0,153.87c0,43.3,16.14,82.94,50.78,124.74C81.77,316,126.32,354,177.9,397.93c17.61,15,37.58,32,58.31,50.15a30.06,30.06,0,0,0,39.58,0c20.73-18.13,40.7-35.16,58.32-50.18,51.58-44,96.12-81.9,127.11-119.3C495.87,236.81,512,197.17,512,153.87,512,111.8,497.57,73,471.38,44.58Z" />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="index-product-card-text2">
                  {users.length > 0 && users[2].iDiscr}
                </div>
                <div className="index-product-card-text3">
                  特價:{users.length > 0 && users[2].iPrice}元
                </div>
                <Link to="#/" className="index-card-button">
                  購買
                </Link>
              </div>
            </div>
            <div className="index-box1">
              <div className="index-box1-pic">
                <img
                  className="index-newproduct-hover-4"
                  src={`http://localhost:3000/img/index/newproduct/${
                    users.length > 0 && users[3].iImg
                  }`}
                  alt="123"
                />
              </div>
              <div className="index-item-1">
                <div className="index-item-2">
                  <div className="index-product-card-text1">
                    {users.length > 0 && users[3].iName}
                  </div>
                  <div className="index-new-product-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 455.52"
                    >
                      <defs>
                        <style
                          dangerouslySetInnerHTML={{
                            __html: '.cls-1{;}',
                          }}
                        />
                      </defs>
                      <g id="圖層_2" data-name="圖層 2">
                        <g id="圖層_1-2" data-name="圖層 1">
                          <path d="M471.38,44.58C444.88,15.83,408.51,0,369,0c-29.55,0-56.62,9.34-80.45,27.77a164.79,164.79,0,0,0-32.52,34,164.31,164.31,0,0,0-32.53-34C199.65,9.34,172.58,0,143,0,103.49,0,67.12,15.83,40.61,44.58,14.43,73,0,111.8,0,153.87c0,43.3,16.14,82.94,50.78,124.74C81.77,316,126.32,354,177.9,397.93c17.61,15,37.58,32,58.31,50.15a30.06,30.06,0,0,0,39.58,0c20.73-18.13,40.7-35.16,58.32-50.18,51.58-44,96.12-81.9,127.11-119.3C495.87,236.81,512,197.17,512,153.87,512,111.8,497.57,73,471.38,44.58Z" />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="index-product-card-text2">
                  {users.length > 0 && users[3].iDiscr}
                </div>
                <div className="index-product-card-text3">
                  特價:{users.length > 0 && users[3].iPrice}元
                </div>
                <Link to="#/" className="index-card-button">
                  購買
                </Link>
              </div>
            </div>
            <div className="index-box1">
              <div className="index-box1-pic">
                <img
                  className="index-newproduct-hover-5"
                  src={`http://localhost:3000/img/index/newproduct/${
                    users.length > 0 && users[4].iImg
                  }`}
                  alt="123"
                />
              </div>
              <div className="index-item-1">
                <div className="index-item-2">
                  <div className="index-product-card-text1">
                    {users.length > 0 && users[4].iName}
                  </div>
                  <div className="index-new-product-5 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 455.52"
                    >
                      <defs>
                        <style
                          dangerouslySetInnerHTML={{
                            __html: '.cls-1{}',
                          }}
                        />
                      </defs>
                      <g id="圖層_2" data-name="圖層 2">
                        <g id="圖層_1-2" data-name="圖層 1">
                          <path d="M471.38,44.58C444.88,15.83,408.51,0,369,0c-29.55,0-56.62,9.34-80.45,27.77a164.79,164.79,0,0,0-32.52,34,164.31,164.31,0,0,0-32.53-34C199.65,9.34,172.58,0,143,0,103.49,0,67.12,15.83,40.61,44.58,14.43,73,0,111.8,0,153.87c0,43.3,16.14,82.94,50.78,124.74C81.77,316,126.32,354,177.9,397.93c17.61,15,37.58,32,58.31,50.15a30.06,30.06,0,0,0,39.58,0c20.73-18.13,40.7-35.16,58.32-50.18,51.58-44,96.12-81.9,127.11-119.3C495.87,236.81,512,197.17,512,153.87,512,111.8,497.57,73,471.38,44.58Z" />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="index-product-card-text2">
                  {users.length > 0 && users[4].iDiscr}
                </div>
                <div className="index-product-card-text3">
                  特價:{users.length > 0 && users[4].iPrice}元
                </div>
                <Link to="#/" className="index-card-button">
                  購買
                </Link>
              </div>
            </div>
            <div className="index-box1">
              <div className="index-box1-pic">
                <img
                  className="index-newproduct-hover-6"
                  src={`http://localhost:3000/img/index/newproduct/${
                    users.length > 0 && users[5].iImg
                  }`}
                  alt="123"
                />
              </div>
              <div className="index-item-1">
                <div className="index-item-2">
                  <div className="index-product-card-text1">
                    {users.length > 0 && users[5].iName}
                  </div>
                  <div className="index-new-product-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 455.52"
                    >
                      <defs>
                        <style
                          dangerouslySetInnerHTML={{
                            __html: '.cls-1{}',
                          }}
                        />
                      </defs>
                      <g id="圖層_2" data-name="圖層 2">
                        <g id="圖層_1-2" data-name="圖層 1">
                          <path d="M471.38,44.58C444.88,15.83,408.51,0,369,0c-29.55,0-56.62,9.34-80.45,27.77a164.79,164.79,0,0,0-32.52,34,164.31,164.31,0,0,0-32.53-34C199.65,9.34,172.58,0,143,0,103.49,0,67.12,15.83,40.61,44.58,14.43,73,0,111.8,0,153.87c0,43.3,16.14,82.94,50.78,124.74C81.77,316,126.32,354,177.9,397.93c17.61,15,37.58,32,58.31,50.15a30.06,30.06,0,0,0,39.58,0c20.73-18.13,40.7-35.16,58.32-50.18,51.58-44,96.12-81.9,127.11-119.3C495.87,236.81,512,197.17,512,153.87,512,111.8,497.57,73,471.38,44.58Z" />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="index-product-card-text2">
                  {users.length > 0 && users[5].iDiscr}
                </div>
                <div className="index-product-card-text3">
                  特價:{users.length > 0 && users[5].iPrice}元
                </div>
                <Link to="#/" className="index-card-button">
                  購買
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="index-button-click">
        <div className="index-button-box-left">
          <div className="index-button-icon">
            {/*?xml version="1.0" encoding="iso-8859-1"?*/}
            {/* Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  */}
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              style={{ enableBackground: 'new 0 0 512 512' }}
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <path d="M101.682,256l308.636,256V0L101.682,256z M370.407,427.043L164.196,256L370.407,84.957V427.043z" />
                </g>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
          </div>
        </div>
        <div className="index-button-box-right">
          <div className="index-button-icon">
            {/*?xml version="1.0" encoding="iso-8859-1"?*/}
            {/* Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  */}
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              style={{ enableBackground: 'new 0 0 512 512' }}
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <path d="M101.682,0v512l308.636-256L101.682,0z M141.593,84.957L347.804,256L141.593,427.043V84.957z" />
                </g>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
          </div>
        </div>
      </div>
      <div className="index-long-colorship">
        <img src={longcolorship} alt="longcolorship" />
      </div>
      <Link to="#/">
        <div className="index-chart-box">
          <div className="index-chartbox-icon ">
            {/*?xml version="1.0" encoding="iso-8859-1"?*/}
            {/* Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  */}
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 450.391 450.391"
              style={{ enableBackground: 'new 0 0 450.391 450.391' }}
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <g>
                    <path
                      d="M143.673,350.322c-25.969,0-47.02,21.052-47.02,47.02c0,25.969,21.052,47.02,47.02,47.02
				c25.969,0,47.02-21.052,47.02-47.02C190.694,371.374,169.642,350.322,143.673,350.322z M143.673,423.465
				c-14.427,0-26.122-11.695-26.122-26.122c0-14.427,11.695-26.122,26.122-26.122c14.427,0,26.122,11.695,26.122,26.122
				C169.796,411.77,158.1,423.465,143.673,423.465z"
                    />
                    <path
                      d="M342.204,350.322c-25.969,0-47.02,21.052-47.02,47.02c0,25.969,21.052,47.02,47.02,47.02s47.02-21.052,47.02-47.02
				C389.224,371.374,368.173,350.322,342.204,350.322z M342.204,423.465c-14.427,0-26.122-11.695-26.122-26.122
				c0-14.427,11.695-26.122,26.122-26.122s26.122,11.695,26.122,26.122C368.327,411.77,356.631,423.465,342.204,423.465z"
                    />
                    <path
                      d="M448.261,76.037c-2.176-2.377-5.153-3.865-8.359-4.18L99.788,67.155L90.384,38.42
				C83.759,19.211,65.771,6.243,45.453,6.028H10.449C4.678,6.028,0,10.706,0,16.477s4.678,10.449,10.449,10.449h35.004
				c11.361,0.251,21.365,7.546,25.078,18.286l66.351,200.098l-5.224,12.016c-5.827,15.026-4.077,31.938,4.702,45.453
				c8.695,13.274,23.323,21.466,39.184,21.943h203.233c5.771,0,10.449-4.678,10.449-10.449c0-5.771-4.678-10.449-10.449-10.449
				H175.543c-8.957-0.224-17.202-4.936-21.943-12.539c-4.688-7.51-5.651-16.762-2.612-25.078l4.18-9.404l219.951-22.988
				c24.16-2.661,44.034-20.233,49.633-43.886l25.078-105.012C450.96,81.893,450.36,78.492,448.261,76.037z M404.376,185.228
				c-3.392,15.226-16.319,26.457-31.869,27.69l-217.339,22.465L106.58,88.053l320.261,4.702L404.376,185.228z"
                    />
                  </g>
                </g>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
          </div>
        </div>
      </Link>
      <div className="index-top-box">
        <a href="#">TOP</a>
      </div>
      <div className="index-four-rectangle"></div>
    </>
  )
}
//我的爸爸是app.js
//小孩
export default Threesection
