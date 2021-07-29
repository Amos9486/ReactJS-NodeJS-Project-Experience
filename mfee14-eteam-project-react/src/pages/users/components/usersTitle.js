import React from 'react'

import { Link, withRouter } from 'react-router-dom'

import './usersTitle.css'

import styled from 'styled-components'

const MemberTextTitle = styled.p`
  color: #0065b4;
  font-size: 42px;
  font-family: Noto Sans TC;
  margin-top: 180px;
  text-align: center;
  margin-bottom: 60px;
`
const MemberConnect = styled.div`
  margin: 0 auto;
  width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-bottom: 1px solid #0065b4;
  margin-bottom: 60px;
`

function UsersTitle(props) {
  //  取uId 值
  // const uId = props.match.params.uId
  //  console.log(uId)
  return (
    <>
      <MemberTextTitle>會員中心</MemberTextTitle>
      <MemberConnect className="usersTitleA">
        <div className="usersTitleDiv">
          <Link to="/usersText">會員資料</Link>
        </div>
        <div className="usersTitleDiv">
          <Link to="/usersTrack">會員商品追蹤</Link>
        </div>
        <div className="usersTitleDiv">
          <Link to="/usersConsumption">會員消費紀錄</Link>
        </div>
      </MemberConnect>
    </>
  )
}

export default withRouter(UsersTitle)
