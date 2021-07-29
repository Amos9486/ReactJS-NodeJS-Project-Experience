import React, { useState, useEffect } from 'react'

import { withRouter } from 'react-router-dom'

import './usersCreditCardAdd.css'

function UsersCreditCardAdd(props) {
  const [inputs, setInputs] = useState({
    cName: '',
    cNum: '',
    cExp: '',
    cCCV: '',
  })
  // input 每個欄位的錯誤訊息
  const [inputsErrors, setInputsErrors] = useState({
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
  const [dataLoading, setDataLoading] = useState(false)

  async function postUserCreditCardToServer() {
    // 開啟載入指示
    setDataLoading(true)
    // 找uId
    console.log(props)
    // 取token 內的 uId
    const token = localStorage.getItem('token')
    // 取得使用者輸入的值
    const newData = { ...inputs, token }
    // console.log(newData)
    // 連接的伺服器資料網址
    const url = `${process.env.REACT_APP_USERSURL}/usersCreditCardAdd/`
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

    console.log('伺服器回傳資料:', data)

    // setInputs(data)

    setTimeout(() => {
      // 關閉指示器
      setDataLoading(false)
      if (data) {
        alert('新增成功')
        props.history.push('/usersCreditCard')
      } else {
        alert('新增失敗')
        props.history.push('/usersCreditCardAdd')
      }
    }, 1000)
  }

  useEffect(() => {
    if (!localStorage.token) {
      alert('請先行登入')
      props.history.push('/usersLogin')
    }
  }, [])

  // useEffect(() => {
  //   setTimeout(() => {
  //     setDataLoading(false)
  //   }, 1000)
  // }, [inputs])

  // 在react 內 若將input 轉成 controlled 的狀態，那就要在form 表單下 e.preventDefault()，或者直接把<form> 刪除

  // 處理表單送出
  const handleSubmit = (e) => {
    // 阻擋表單送出預設行為
    // 只要有錯誤訊息就不執行postUserToServer()
    e.preventDefault()
    if (
      inputsErrors.cName === '' &&
      inputsErrors.cNum === '' &&
      inputsErrors.cExp === '' &&
      inputsErrors.cCCV === ''
    ) {
      postUserCreditCardToServer()
    }
  }

  return (
    <>
      <div className="usersCreaditCardAddBgc">
        <p className="memberTextTitle">新增信用卡</p>
        <form // 阻擋表單預設行為
          onSubmit={handleSubmit}
          // onChange={handleChange}
          // onInvalid={handleInvalid}
          // noValidate
        >
          <div className="usersCreaditCardAdddiv">
            <div className="usersCreaditCardAddTitle">
              <div>持卡人(英文)</div>
              <div>卡號</div>
              <div>有效期限</div>
              <div>驗證碼</div>
            </div>

            <div className="usersCreaditCardAddText">
              <div className="usersCreaditCardAddInp">
                <input
                  name="cName"
                  type="text"
                  placeholder="請輸入持卡人姓名(英文)"
                  value={inputs.cName}
                  onChange={onChangeForInput('cName')}
                  required
                />
              </div>
              <div className="usersCreaditCardAddInp">
                <input
                  name="cNum"
                  type="text"
                  placeholder="請輸入卡號"
                  value={inputs.cNum}
                  onChange={onChangeForInput('cNum')}
                  required
                />
              </div>
              <div className="usersCreaditCardAddInp">
                <input
                  name="cExp"
                  type="text"
                  placeholder="請輸入信用卡有效期限"
                  value={inputs.cExp}
                  onChange={onChangeForInput('cExp')}
                  required
                />
              </div>
              <div className="usersCreaditCardAddInp">
                <input
                  name="cCCV"
                  type="text"
                  placeholder="請輸入驗證碼"
                  value={inputs.cCCV}
                  onChange={onChangeForInput('cCCV')}
                  required
                />
              </div>
            </div>
            <div className="usersCreaditCardAddBtnAdd">
              <button
                type="submit"
                // onClick={() => {
                //   postUserCreditCardToServer()
                // }}
              >
                確認
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default withRouter(UsersCreditCardAdd)
