import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import '.././index.css'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import phoneherrosection from '../img/phone-herrosection.jpg'

function Phoneherrosection() {
  return (
    <>
      {/* //////////////手機板的 herrosection////////////////// */}
      <div className="index-phone-onepage-pic">
        <img src={phoneherrosection} alt=" phone-herrosection" />
      </div>

      <div className="index-phone-herro-text">
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
        <div className="index-d-flex-columm">
          <div>旅行‧寧靜‧生活</div>
          <div>Mercurius Coffee</div>
        </div>
      </div>
      <div className="index-onepage-rectangle" />
      <div className="index-one-herro-button-left">
        <Link to="/coffee-introduce/coffee-introduce-global">尋找咖啡</Link>
      </div>
      <div className="index-one-herro-button-right">
        <Link to="/shop-map/shop-map-index">尋找店家</Link>
      </div>
    </>
  )
}
//我的爸爸是app.js
//小孩
export default Phoneherrosection
