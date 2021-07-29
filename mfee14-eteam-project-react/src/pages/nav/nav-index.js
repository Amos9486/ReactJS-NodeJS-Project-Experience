import React, { useState, useEffect } from 'react'
import './nav.css'
import Logo from './svg/LOGO.svg'
import $ from 'jquery'
import { withRouter } from 'react-router-dom'
import location1 from './svg/location1.svg'

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import coffeecup from './svg/coffeecup.svg'
import coffeebag from './svg/coffeebag.svg'
import aboutus from './svg/about us.svg'

function Nav(props) {
  const [hidden, setHidden] = useState(true)

  async function usersLogoutToServer() {
    const token = localStorage.getItem('token')
    const url = `${process.env.REACT_APP_USERSURL}/logout/`
    const req = new Request(url, {
      method: 'post',
      body: JSON.stringify({ token }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const res = await fetch(req)
    const data = res.json
    console.log('伺服器回傳資料:', data)

    if (data) {
      localStorage.removeItem('token')
      props.history.push('/')
      window.location.reload()
    }
  }
  useEffect(() => {
    let menuOpenBtn = document.querySelector('.nav-navbar .bx-menu')
    let closeOpenBtn = document.querySelector('.nav-links .bx-x')
    let navLinks = document.querySelector('.nav-links')
    menuOpenBtn.addEventListener('click', () => {
      navLinks.style.left = '0'
    })
    closeOpenBtn.addEventListener('click', () => {
      navLinks.style.left = '-100%'
    })
    let htmlcssArrow = document.querySelector('.htmlcss-arrow')
    htmlcssArrow.addEventListener('click', () => {
      navLinks.classList.toggle('show1')
    })
    let jsarrow = document.querySelector('.js-arrow')
    jsarrow.addEventListener('click', () => {
      navLinks.classList.toggle('show2')
    })
    let allArrow = document.querySelector('.all-arrow')
    allArrow.addEventListener('click', () => {
      navLinks.classList.toggle('show3')
    })
  }, [])

  useEffect(() => {
    $(window).scroll(function () {
      let scrolltop = $(this).scrollTop() //console.log(scrolltop);
      let windowheight = $(window).height() //為可視範圍console.log(windowheight);
      let websideheight = $('body').height() //console.log(websideheight);
      let persent = Math.floor(
        (scrolltop / (websideheight - windowheight)) * 100
      )
      // console.log(persent) //等於 scrolltop/scrolltop

      if (persent >= 10) {
        $('nav').css('opacity', '0')
      } else {
        $('nav').css('transition', '0.5s').css('opacity', '1')
      }
    })
  }, [])

  useEffect(() => {
    if (localStorage.token) {
      setHidden(!hidden)
    }
  }, [])
  return (
    <>
      <body className="index-body">
        <nav>
          <div className="nav-navbar">
            <div className="nav-phone-hamburger">
              {/*?xml version="1.0" encoding="iso-8859-1"?*/}
              {/* Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  */}
              <svg
                className="bx bx-menu phone-nav-icon-hamburger "
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 469.333 469.333"
                style={{ enableBackground: 'new 0 0 469.333 469.333' }}
                xmlSpace="preserve"
              >
                <g>
                  <g>
                    <g>
                      <path
                        d="M53.333,106.667H416c29.417,0,53.333-23.927,53.333-53.333S445.417,0,416,0H53.333C23.917,0,0,23.927,0,53.333
				S23.917,106.667,53.333,106.667z M53.333,21.333H416c17.646,0,32,14.354,32,32c0,17.646-14.354,32-32,32H53.333
				c-17.646,0-32-14.354-32-32C21.333,35.687,35.687,21.333,53.333,21.333z"
                      />
                      <path
                        d="M416,181.333H53.333C23.917,181.333,0,205.26,0,234.667S23.917,288,53.333,288H416c29.417,0,53.333-23.927,53.333-53.333
				S445.417,181.333,416,181.333z M416,266.667H53.333c-17.646,0-32-14.354-32-32s14.354-32,32-32H416c17.646,0,32,14.354,32,32
				S433.646,266.667,416,266.667z"
                      />
                      <path
                        d="M416,362.667H53.333C23.917,362.667,0,386.594,0,416s23.917,53.333,53.333,53.333H416
				c29.417,0,53.333-23.927,53.333-53.333S445.417,362.667,416,362.667z M416,448H53.333c-17.646,0-32-14.354-32-32
				c0-17.646,14.354-32,32-32H416c17.646,0,32,14.354,32,32C448,433.646,433.646,448,416,448z"
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

            <div className="nav-logo-b">
              <div className="nav-logo-s">
                <Link to="/">
                  <img src={Logo} alt="Logo" />
                </Link>
              </div>
            </div>
            <div className="nav-links phone-nav-links">
              <div className="sidebar-logo">
                {/*?xml version="1.0" encoding="iso-8859-1"?*/}
                {/* Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  */}
                <svg
                  className="bx bx-x  nav-phone-nav-x"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 496.096 496.096"
                  style={{ enableBackground: 'new 0 0 496.096 496.096' }}
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <path
                        d="M259.41,247.998L493.754,13.654c3.123-3.124,3.123-8.188,0-11.312c-3.124-3.123-8.188-3.123-11.312,0L248.098,236.686
			L13.754,2.342C10.576-0.727,5.512-0.639,2.442,2.539c-2.994,3.1-2.994,8.015,0,11.115l234.344,234.344L2.442,482.342
			c-3.178,3.07-3.266,8.134-0.196,11.312s8.134,3.266,11.312,0.196c0.067-0.064,0.132-0.13,0.196-0.196L248.098,259.31
			l234.344,234.344c3.178,3.07,8.242,2.982,11.312-0.196c2.995-3.1,2.995-8.016,0-11.116L259.41,247.998z"
                      />
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

              <ul className="index-ul-li links">
                <li className="index-ul-li nav-phone-shop">
                  <Link to="#/">店家專區</Link>
                </li>
                <li className="index-ul-li">
                  <Link to="/shop-map/shop-map-index">
                    <div className="nav-phone-allicon-star-close">
                      店家地圖 {/*?xml version="1.0" encoding="iso-8859-1"?*/}
                      {/* Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  */}
                      <svg
                        className="nav-icon-user-home-arrow  bx bxs-chevron-down arrow htmlcss-arrow"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 490.688 490.688"
                        style={{ enableBackground: 'new 0 0 490.688 490.688' }}
                        xmlSpace="preserve"
                      >
                        <path
                          style={{ fill: '#FFC107' }}
                          d="M472.328,120.529L245.213,347.665L18.098,120.529c-4.237-4.093-10.99-3.975-15.083,0.262
	c-3.992,4.134-3.992,10.687,0,14.82l234.667,234.667c4.165,4.164,10.917,4.164,15.083,0l234.667-234.667
	c4.237-4.093,4.354-10.845,0.262-15.083c-4.093-4.237-10.845-4.354-15.083-0.262c-0.089,0.086-0.176,0.173-0.262,0.262
	L472.328,120.529z"
                        />
                        <path
                          d="M245.213,373.415c-2.831,0.005-5.548-1.115-7.552-3.115L2.994,135.633c-4.093-4.237-3.975-10.99,0.262-15.083
	c4.134-3.992,10.687-3.992,14.82,0l227.136,227.115l227.115-227.136c4.093-4.237,10.845-4.354,15.083-0.262
	c4.237,4.093,4.354,10.845,0.262,15.083c-0.086,0.089-0.173,0.176-0.262,0.262L252.744,370.279
	C250.748,372.281,248.039,373.408,245.213,373.415z"
                        />
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
                    <div className="nav-d-flex arrow  bx ">
                      <img
                        src={location1}
                        className="nav-icon-1 icon-close "
                        alt="coffeecup"
                      />
                      <div className="nav-map-item ">
                        <p>店家地圖</p>
                        <p className=" ">store map</p>
                      </div>
                    </div>
                  </Link>
                  {/* <ul className="index-ul-li htmlCss-sub-menu sub-menu">
                    <li className="index-ul-li">
                      <Link to="#/">店家畫面</Link>
                    </li>
                  </ul> */}
                </li>
                <li className="index-ul-li">
                  <Link to="#/">
                    <div className="nav-phone-allicon-star-close ">
                      咖啡介紹 {/*?xml version="1.0" encoding="iso-8859-1"?*/}
                      {/* Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  */}
                      <svg
                        className="nav-icon-user-home-arrow  bx bxs-chevron-down arrow js-arrow"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 490.688 490.688"
                        style={{ enableBackground: 'new 0 0 490.688 490.688' }}
                        xmlSpace="preserve"
                      >
                        <path
                          style={{ fill: '#FFC107' }}
                          d="M472.328,120.529L245.213,347.665L18.098,120.529c-4.237-4.093-10.99-3.975-15.083,0.262
	c-3.992,4.134-3.992,10.687,0,14.82l234.667,234.667c4.165,4.164,10.917,4.164,15.083,0l234.667-234.667
	c4.237-4.093,4.354-10.845,0.262-15.083c-4.093-4.237-10.845-4.354-15.083-0.262c-0.089,0.086-0.176,0.173-0.262,0.262
	L472.328,120.529z"
                        />
                        <path
                          d="M245.213,373.415c-2.831,0.005-5.548-1.115-7.552-3.115L2.994,135.633c-4.093-4.237-3.975-10.99,0.262-15.083
	c4.134-3.992,10.687-3.992,14.82,0l227.136,227.115l227.115-227.136c4.093-4.237,10.845-4.354,15.083-0.262
	c4.237,4.093,4.354,10.845,0.262,15.083c-0.086,0.089-0.173,0.176-0.262,0.262L252.744,370.279
	C250.748,372.281,248.039,373.408,245.213,373.415z"
                        />
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
                    <div className="nav-d-flex bx arrow ">
                      <img
                        src={coffeecup}
                        className="nav-icon-1 icon-close  "
                        alt="coffeecup"
                      />
                      <div className="nav-coffee-indroduce-item">
                        <p>咖啡介紹</p>
                        <p>indroduce</p>
                      </div>
                    </div>
                  </Link>

                  <ul className="index-ul-li js-sub-menu sub-menu">
                    <li className="index-ul-li">
                      <Link to="/coffee-introduce/coffee-introduce-global">
                        世界的咖啡
                      </Link>
                    </li>
                    <li className="index-ul-li">
                      <Link to="/coffee-introduce/coffee-introduce-taiwan">
                        臺灣的咖啡
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="index-ul-li">
                  <Link to="items/info/1">
                    <div className="nav-phone-allicon-star-close">
                      全部商品 {/*?xml version="1.0" encoding="iso-8859-1"?*/}
                      {/* Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  */}
                      <svg
                        className="nav-icon-user-home-arrow  bx bxs-chevron-down arrow all-arrow"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 490.688 490.688"
                        style={{ enableBackground: 'new 0 0 490.688 490.688' }}
                        xmlSpace="preserve"
                      >
                        <path
                          style={{ fill: '#FFC107' }}
                          d="M472.328,120.529L245.213,347.665L18.098,120.529c-4.237-4.093-10.99-3.975-15.083,0.262
	c-3.992,4.134-3.992,10.687,0,14.82l234.667,234.667c4.165,4.164,10.917,4.164,15.083,0l234.667-234.667
	c4.237-4.093,4.354-10.845,0.262-15.083c-4.093-4.237-10.845-4.354-15.083-0.262c-0.089,0.086-0.176,0.173-0.262,0.262
	L472.328,120.529z"
                        />
                        <path
                          d="M245.213,373.415c-2.831,0.005-5.548-1.115-7.552-3.115L2.994,135.633c-4.093-4.237-3.975-10.99,0.262-15.083
	c4.134-3.992,10.687-3.992,14.82,0l227.136,227.115l227.115-227.136c4.093-4.237,10.845-4.354,15.083-0.262
	c4.237,4.093,4.354,10.845,0.262,15.083c-0.086,0.089-0.173,0.176-0.262,0.262L252.744,370.279
	C250.748,372.281,248.039,373.408,245.213,373.415z"
                        />
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
                    <div className="nav-d-flex bx arrow">
                      <img
                        src={coffeebag}
                        className="nav-icon-1 icon-close  "
                        alt="coffeecup"
                      />
                      <div className="nav-allproduce-item">
                        <p>全部商品</p>
                        <p className=" ">products</p>
                      </div>
                    </div>
                  </Link>

                  <ul className="index-ul-li all-sub-menu sub-menu">
                    <li className="index-ul-li">
                      <Link to="#/">咖啡</Link>
                    </li>
                    <li className="index-ul-li">
                      <Link to="#/">器材</Link>
                    </li>
                    <li className="index-ul-li">
                      <Link to="#/">甜點</Link>
                    </li>
                    <li className="index-ul-li">
                      <Link to="#/">品牌周邊</Link>
                    </li>
                  </ul>
                </li>
                <li className="index-ul-li">
                  <Link to="/about">
                    <div className="nav-phone-allicon-star-close">關於我們</div>
                    <div className="nav-d-flex bx arrow">
                      <img
                        src={aboutus}
                        className="nav-icon-2  icon-close "
                        alt="coffeecup"
                      />
                      <div className="about-item  ">
                        <p>關於我們</p>
                        <p className=" ">about us</p>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="nav-loginbar">
              <div className="nav-loginbar-left">
                <Link
                  to="/usersLogin"
                  className={!hidden ? 'navLoginToToken' : ''}
                >
                  {/*?xml version="1.0" encoding="iso-8859-1"?*/}
                  {/* Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  */}
                  <svg
                    className="nav-icon-user-home-arrow"
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
                        <path
                          d="M437.02,330.98c-27.883-27.882-61.071-48.523-97.281-61.018C378.521,243.251,404,198.548,404,148
			C404,66.393,337.607,0,256,0S108,66.393,108,148c0,50.548,25.479,95.251,64.262,121.962
			c-36.21,12.495-69.398,33.136-97.281,61.018C26.629,379.333,0,443.62,0,512h40c0-119.103,96.897-216,216-216s216,96.897,216,216
			h40C512,443.62,485.371,379.333,437.02,330.98z M256,256c-59.551,0-108-48.448-108-108S196.449,40,256,40
			c59.551,0,108,48.448,108,108S315.551,256,256,256z"
                        />
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
                  登入/註冊
                </Link>
                {/* /////////////////////// */}
                <Link
                  className={hidden ? 'navLoginToToken' : ''}
                  onClick={() => {
                    usersLogoutToServer()
                  }}
                >
                  {/*?xml version="1.0" encoding="iso-8859-1"?*/}
                  {/* Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  */}
                  <svg
                    className="nav-icon-user-home-arrow"
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
                        <polygon points="482.181,299.636 343.253,454.319 264.85,379.688 237.271,408.661 345.498,511.681 511.94,326.364 		" />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path
                          d="M339.794,269.966C378.58,243.255,404.06,198.55,404.06,148c0-81.607-66.393-148-148-148s-148,66.393-148,148
			c0,50.548,25.479,95.251,64.261,121.963c-36.21,12.494-69.398,33.135-97.281,61.018C26.689,379.333,0.06,443.62,0.06,512h40
			c0-119.103,96.897-216,216-216c50.491,0,96.974,17.434,133.793,46.572l26.856-29.901
			C393.532,293.919,367.551,279.55,339.794,269.966z M256.06,256c-59.551,0-108-48.449-108-108c0-59.551,48.449-108,108-108
			c59.551,0,108,48.449,108,108C364.06,207.551,315.611,256,256.06,256z"
                        />
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
                  登出
                </Link>
              </div>
              <div className="nav-loginbar-center">
                <Link to="/partners/partners-index">
                  {/*?xml version="1.0" encoding="iso-8859-1"?*/}
                  {/* Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  */}
                  <svg
                    className="nav-icon-user-home-arrow"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 477.846 477.846"
                    style={{ enableBackground: 'new 0 0 477.846 477.846' }}
                    xmlSpace="preserve"
                  >
                    <g>
                      <g>
                        <path
                          d="M472.847,226.846l-34.116-34.116L250.998,4.997c-6.664-6.663-17.468-6.663-24.132,0L39.132,192.73L4.999,226.864
			c-6.548,6.78-6.361,17.584,0.419,24.132c6.614,6.388,17.099,6.388,23.713,0l4.983-5.018v214.801
			c0,9.426,7.641,17.067,17.067,17.067h375.467c9.426,0,17.067-7.641,17.067-17.067V245.978l5,5.001
			c6.78,6.548,17.584,6.36,24.132-0.419C479.235,243.946,479.235,233.46,472.847,226.846z M290.115,443.713h-102.4V307.179h102.4
			V443.713z M409.581,443.713h-85.333v-153.6c0-9.426-7.641-17.067-17.067-17.067H170.648c-9.426,0-17.067,7.641-17.067,17.067
			v153.6H68.248V211.845L238.914,41.178l170.667,170.667V443.713z"
                        />
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
                  店家專區
                </Link>
              </div>
              <div className="nav-loginbar-right">
                <Link to="/cart">
                  {/*?xml version="1.0" encoding="iso-8859-1"?*/}
                  {/* Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  */}
                  <svg
                    className="nav-icon-chart"
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
                </Link>
              </div>
            </div>
            <div className="nav-phone-loginbar">
              <div className="margin-x-2">
                {/*?xml version="1.0" encoding="iso-8859-1"?*/}
                {/* Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  */}
                <svg
                  className="phone-nav-icon-user-chart"
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
                      <path
                        d="M437.02,330.98c-27.883-27.882-61.071-48.523-97.281-61.018C378.521,243.251,404,198.548,404,148
			C404,66.393,337.607,0,256,0S108,66.393,108,148c0,50.548,25.479,95.251,64.262,121.962
			c-36.21,12.495-69.398,33.136-97.281,61.018C26.629,379.333,0,443.62,0,512h40c0-119.103,96.897-216,216-216s216,96.897,216,216
			h40C512,443.62,485.371,379.333,437.02,330.98z M256,256c-59.551,0-108-48.448-108-108S196.449,40,256,40
			c59.551,0,108,48.448,108,108S315.551,256,256,256z"
                      />
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
              <div className="margin-x-2">
                {/*?xml version="1.0" encoding="iso-8859-1"?*/}
                {/* Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  */}
                <svg
                  className="phone-nav-icon-user-chart"
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
          </div>
        </nav>
      </body>
    </>
  )
}

export default withRouter(Nav)
