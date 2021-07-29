import React, { useState, useEffect } from 'react'

import { Link, withRouter } from 'react-router-dom'

import './usersCreditCard.css'

function UsersCreditCard(props) {
  // 顯示的狀態設定
  const [credit, setCredit] = useState('')

  const [dataLoading, setDataLoading] = useState(false)

  async function getUserCreditCardToServer() {
    setDataLoading(true)
    const token = localStorage.getItem('token')

    const url = `${process.env.REACT_APP_USERSURL}/usersCreditCard/`
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
    setCredit(data)
  }
  async function deleteUserCreditCardToServer(cId) {
    setDataLoading(true)

    const token = localStorage.getItem('token')
    const url = `${process.env.REACT_APP_USERSURL}/usersDeleteCreditCard/` + cId

    const req = new Request(url, {
      method: 'delete',
      body: JSON.stringify({ token, cId }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log('伺服器回傳資料:', data)

    setTimeout(() => {
      setDataLoading(false)
      if (data !== false) {
        setCredit(data)
        alert('刪除完成')
        props.history.push('/usersCreditCard')
      } else {
        alert('刪除失敗')
        props.history.push('/usersCreditCard')
      }
    }, 1000)
  }

  useEffect(() => {
    if (localStorage.token) {
      getUserCreditCardToServer()
    } else {
      alert('請先行登入')
      props.history.push('/usersLogin')
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setDataLoading(false)
    }, 1000)
  }, [credit])

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
      <div className="usersCreaditCardBgc">
        <p className="memberTextTitle">信用卡資訊</p>

        <div className="usersCreaditCarddiv">
          <div className="usersCreaditCardTitle">
            <div>持卡人(英文)</div>
            <div>卡號</div>
            <div>有效期限</div>
            <div>驗證碼</div>
          </div>
          {credit.length &&
            credit.map((v) => {
              return (
                <div className="usersCreaditCardText" key={v.cId}>
                  <div className="usersCreaditCardName ">{v.cName}</div>
                  <div className="usersCreaditCardNumber">{v.cNum}</div>
                  <div className="usersCreaditCardExp">{v.cExp}</div>
                  <div className="usersCreaditCardPwd">{v.cCCV}</div>
                  <div className="usersCreaditCardBtn">
                    <button
                      onClick={() => {
                        props.history.push(`/usersCreditCardEdit/${v.cId}`)
                      }}
                    >
                      編輯
                    </button>
                  </div>
                  <div className="usersCreaditCardIcon">
                    <Link
                      to=""
                      onClick={() => {
                        deleteUserCreditCardToServer(v.cId)
                      }}
                    >
                      X
                    </Link>
                  </div>
                </div>
              )
            })}
        </div>
        <div className="usersCreaditCardBtn">
          <button
            onClick={() => {
              props.history.push('/usersCreditCardAdd')
            }}
          >
            新增
          </button>
        </div>
      </div>
    </>
  )

  return <>{dataLoading ? loading : display}</>
}

export default withRouter(UsersCreditCard)
