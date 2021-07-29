import React, { useState, useEffect } from 'react'

import './usersCreditCardEdit.css'

import { withRouter } from 'react-router-dom'

function UsersCreditCardEdit(props) {
  const [dataLoading, setDataLoading] = useState(false)
  // 顯示的狀態設定
  const [credit, setCredit] = useState('')
  // inpiut 的狀態設定
  const [inputs, setInputs] = useState({
    cName: '',
    cNum: '',
    cExp: '',
    cCCV: '',
  })
  const onChangeForInput = (InputName) => (e) => {
    setInputs((state) => ({
      ...state,
      [InputName]: e.target.value,
    }))
  }
  console.log(props)
  const cIdPathname = props.location.pathname
  // console.log(cIdPathname)
  const cId = cIdPathname.slice(21)
  console.log(cId)
  async function getUserCreditCardToServer() {
    setDataLoading(true)
    const cIdPathname = props.location.pathname
    const cId = cIdPathname.slice(21)
    const token = localStorage.getItem('token')

    const url = `${process.env.REACT_APP_USERSURL}/usersCreditCardReadSingle/${cId}`
    const req = new Request(url, {
      method: 'post',
      body: JSON.stringify({ token, cId }),
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
  // 編輯只要用cId 判斷，故不用回傳token
  async function putUserCreditCardToServer() {
    setDataLoading(true)
    // const token = localStorage.getItem('token')
    // 取得使用者輸入的值
    const cIdPathname = props.location.pathname
    const cId = cIdPathname.slice(21)

    const newData = { ...inputs, cId }

    const url = `${process.env.REACT_APP_USERSURL}/usersCreditCardEdit/`

    const req = new Request(url, {
      method: 'put',
      body: JSON.stringify(newData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const res = await fetch(req)
    const data = await res.json()

    console.log('伺服器put回傳資料:', data)

    setTimeout(() => {
      setDataLoading(false)
      if (data !== false) {
        setInputs(data)
        alert('編輯完成')
        props.history.push('/usersCreditCard')
      } else {
        alert('編輯失敗')
        props.history.push('/usersCreditCardEdit')
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
  }, [inputs.cName, inputs.cNum, inputs.cExp, inputs.cCCV])

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
      <div className="usersCreaditCardEditBgc">
        <p className="memberTextTitle">編輯信用卡</p>

        <div className="usersCreaditCardEditdiv">
          <div className="usersCreaditCardEditTitle">
            <div>持卡人姓名(英文)</div>
            <div>卡號(請直接輸入數字)</div>
            <div>有效期限</div>
            <div>驗證碼</div>
          </div>

          <div className="usersCreaditCardEditText">
            <div className="usersCreaditCardEditInp">
              <input
                name="cName"
                type="text"
                placeholder={'原設定的持卡人姓名:' + credit.cName}
                value={inputs.cName}
                onChange={onChangeForInput('cName')}
              />
            </div>
            <div className="usersCreaditCardEditInp">
              <input
                name=""
                type="text"
                placeholder={'原設定的卡號:' + credit.cNum}
                value={inputs.cNum}
                onChange={onChangeForInput('cNum')}
              />
            </div>
            <div className="usersCreaditCardEditInp">
              <input
                name="cExp"
                type="text"
                placeholder={'原設定的有效期限:' + credit.cExp}
                value={inputs.cExp}
                onChange={onChangeForInput('cExp')}
              />
            </div>
            <div className="usersCreaditCardEditInp">
              <input
                name="cCCV"
                type="text"
                placeholder={'原設定的CCV:' + credit.cCCV}
                value={inputs.cCCV}
                onChange={onChangeForInput('cCCV')}
              />
            </div>
          </div>
          <div className="usersCreaditCardEditBtnAdd">
            <button
              onClick={() => {
                putUserCreditCardToServer()
              }}
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </>
  )

  return <>{dataLoading ? loading : display}</>
}

export default withRouter(UsersCreditCardEdit)
