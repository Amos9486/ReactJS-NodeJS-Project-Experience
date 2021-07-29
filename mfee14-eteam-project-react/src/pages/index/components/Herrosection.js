import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import '.././index.css'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import onepagepic from '../img/herrosection.jpg'
import onepagepic02 from '../img/herrosection02.jpg'
import onepagepic03 from '../img/herrosection03.jpg'
import onepagepic04 from '../img/herrosection04.jpg'
import onepagepic05 from '../img/herrosection05.jpg'

// iiiedu.live0+26@gmail.com 對所有人說：    下午 1:52
// import logo from './logo.svg';
// iiiedu.live0+26@gmail.com 對所有人說：    下午 1:52
// <img src={logo} className="App-logo" alt="logo" />

function Herrosection() {
  return (
    <>
      <div className="index-herro-section">
        <div className="index-img-wrap">
          <div className="index-onepage-pic">
            <img src={onepagepic} alt="index-onepage-pic" />

            <Link to="#/" className="index-one-herro-button-left">
              尋找咖啡
            </Link>

            <Link to="#/" className="index-one-herro-button-right">
              尋找店家
            </Link>
          </div>
          <div className="index-onepage-pic">
            <img src={onepagepic02} alt="index-onepage-pic02" />
            <Link to="#/" className="index-one-herro-button-left">
              尋找咖啡
            </Link>

            <Link to="#/" className="index-one-herro-button-right">
              尋找店家
            </Link>
          </div>
          <div className="index-onepage-pic">
            <img src={onepagepic03} alt="index-onepage-pic03" />
            <Link to="#/" className="index-one-herro-button-left">
              尋找咖啡
            </Link>

            <Link to="#/" className="index-one-herro-button-right">
              尋找店家
            </Link>
          </div>
          <div className="index-onepage-pic">
            <img src={onepagepic04} alt="index-onepage-pic04" />
            <Link to="#/" className="index-one-herro-button-left">
              尋找咖啡
            </Link>

            <Link to="#/" className="index-one-herro-button-right">
              尋找店家
            </Link>
          </div>
          <div className="index-onepage-pic">
            <img src={onepagepic05} alt="index-onepage-pic03" />
            <Link to="#/" className="index-one-herro-button-left">
              尋找咖啡
            </Link>

            <Link to="#/" className="index-one-herro-button-right">
              尋找店家
            </Link>
          </div>
        </div>
      </div>
      <div className="index-slider-dots">
        <div className="index-dots">01</div>
        <div className="index-dots">02</div>
        <div className="index-dots">03</div>
        <div className="index-dots">04</div>
        <div className="index-dots">05</div>
      </div>
      {/* ////////////////////////////////////////////////////// */}
      <div className="index-herro-text">
        <div>
          {/*?xml version="1.0" encoding="iso-8859-1"?*/}
          {/* Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  */}
          <svg
            className="nav-icon"
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
                <polygon
                  points="447.894,263.57 275.989,435.474 275.989,0 236.011,0 236.011,435.474 64.106,263.57 35.838,291.838 256,512 
			476.162,291.838 		"
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
        <div>
          <div>旅行‧寧靜‧生活</div>
          <div>Mercurius Coffee</div>
        </div>
      </div>
      <div className="index-onepage-rectangle" />
    </>
  )
}
//我的爸爸是app.js
//小孩
export default Herrosection
