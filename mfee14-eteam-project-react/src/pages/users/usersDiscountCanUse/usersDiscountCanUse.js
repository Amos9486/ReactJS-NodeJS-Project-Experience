import React, { useState, useEffect } from 'react'

import { Link, withRouter } from 'react-router-dom'

import './usersDiscountCanUse.css'

function UsersDiscountCanUse(props) {
  const [discount, setDiscount] = useState('')

  const [dataLoading, setDataLoading] = useState(false)
  // 尚未使用
  async function canUseDiscountToServer() {
    setDataLoading(true)
    const token = localStorage.getItem('token')

    const url = `${process.env.REACT_APP_USERSURL}/usersDiscountCanUse/`
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

    // 改變原狀態，把取得的資料加入
    setDiscount(data)
  }
  useEffect(() => {
    if (localStorage.token) {
      canUseDiscountToServer()
    } else {
      alert('請先行登入')
      props.history.push('/usersLogin')
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setDataLoading(false)
    }, 1000)
  }, [discount])

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
      <div className="usersDiscountBgc">
        <p className="memberTextTitle">折扣碼資訊</p>

        <div className="memberConnect">
          <Link to="/usersDiscountCanUse">尚未使用</Link>
          <Link to="/usersDiscountNotCanUse">已使用</Link>
        </div>

        <div className="usersDiscountdiv">
          <div className="usersDiscountTitle">
            <div>折扣碼代號</div>
            <div>折扣碼減價</div>
            <div>新增時間</div>
            <div>有效期限</div>
          </div>
          {discount.length &&
            discount.map((v) => {
              return (
                <div className="usersDiscountText" key={v.dId}>
                  <div className="usersDiscountName">{v.dName}</div>
                  <div className="usersDiscountNumber">{v.dPrice}</div>
                  <div className="usersDiscountExp">{v.created_at}</div>
                  <div className="usersDiscountAdd">{v.expiry}</div>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
  return <>{dataLoading ? loading : display}</>
}

export default withRouter(UsersDiscountCanUse)
