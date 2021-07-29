import React, { useEffect, useState } from 'react'

import UsersTitle from '../components/usersTitle'

import './usersEdit.css'

import RadioBox from '../components/RadioBox'

import UploadClass from '../components/uploadClass'

import { withRouter } from 'react-router-dom'

import $ from 'jquery'

// 彈窗 material-ui
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import VisibilityOffSharpIcon from '@material-ui/icons/VisibilityOffSharp'

function UsersEdit(props) {
  // 取uId 值 (改用token)
  // const uId = props.match.params.uId
  // console.log(props);

  const [dataLoading, setDataLoading] = useState(false)

  // 密碼顯示狀態
  const [hidden, setHidden] = useState(true)

  // 顯示的狀態設定
  const [users, setUsers] = useState([])
  // inpiut 的狀態設定
  const [inputs, setInputs] = useState({
    uNickname: '',
    uHobby: '',
    uName: '',
    uTWId: '',
    uMail: '',
    uPhone: '',
    uBirth: '',
    uCountry: '',
    uCity: '',
    uTownship: '',
    uStreet: '',
    uDiscr: '',
    uPwd: '',
  })
  // radio
  const [uGender, setUgender] = useState('')
  // img 上傳檔案
  const [uImg, setUimg] = useState('')
  // closure
  const onChangeForInput = (InputName) => (e) => {
    setInputs((state) => ({
      ...state,
      [InputName]: e.target.value,
    }))
  }

  // 編輯要先做get(呈現資料)，再put(修改資料)
  // 一般是表格使用者點選哪列，就是那列的uId (這邊我必須要用login 來判斷)
  async function getUserToServer() {
    setDataLoading(true)
    const token = localStorage.getItem('token')

    const url = `${process.env.REACT_APP_USERSURL}/usersEdit/`
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
    console.log('伺服器post回傳', data)
    // 改變原狀態，把取得的資料加入
    setUsers(data)
  }

  async function putUserToServer() {
    setDataLoading(true)
    const token = localStorage.getItem('token')
    // 取得使用者輸入的值
    const newData = { ...inputs, uGender, token }

    const url = `${process.env.REACT_APP_USERSURL}/usersEdit/`

    const req = new Request(url, {
      method: 'put',
      body: JSON.stringify(newData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    console.log(JSON.stringify(newData))

    const res = await fetch(req)
    const data = await res.json()

    console.log('伺服器put回傳資料:', data)

    setTimeout(() => {
      setDataLoading(false)
      if (data !== false) {
        setInputs(data)
        alert('編輯完成')
        props.history.push('/usersText')
      } else {
        alert('編輯失敗，請確認密碼至少6個字元以上')
        props.history.push('/usersEdit')
      }
    }, 1000)
  }

  // 生命週期
  // 一開始載入資料(componentDidMount 代表元件”已經”出現在網⾴上，這個⽅法中可以使⽤直接DOM處理，或向伺服器要初始化資料的JS程式碼)

  // *****原先要呈現資料的componentDidMount 會阻擋  jquery 的行為

  // 密碼顯示
  useEffect(() => {
    $('.usersLoginEyes').click((e) => {
      e.stopPropagation() //阻止冒泡
      console.log('hi')
      if ($('#uPwd').attr('type') === 'password') {
        $('#uPwd').attr('type', 'text')
      } else {
        $('#uPwd').attr('type', 'password')
      }
    })
  }, [])

  useEffect(() => {
    if (localStorage.token) {
      getUserToServer()
    } else {
      alert('請先行登入')
      props.history.push('/usersLogin')
    }
  }, [])

  //componentDidUpdate 代表元件”已經”更新完成(真實DOM)，這個⽅法中可以得到最後更新的狀態值 (只有State更新，或接收到新的props

  useEffect(() => {
    setTimeout(() => {
      setDataLoading(false)
    }, 1000)
  }, [
    inputs.uNickname,
    inputs.uHobby,
    inputs.uName,
    inputs.uTWId,
    inputs.uMail,
    inputs.uPhone,
    inputs.uBirth,
    inputs.uCountry,
    inputs.uCity,
    inputs.uTownship,
    inputs.uStreet,
    inputs.uDiscr,
    inputs.uPwd,
    uGender,
    uImg,
  ])
  // 放改變狀態的初始值 (React 無法辨別物件，所以若為物件時，只能一個一個列出來)
  // useEffect 的條件中盡量不要使用物件，因為每次都會被看成是不同的

  // 密碼顯示  狀態改變
  function toggleShow() {
    setHidden(!hidden)
  }

  const loading = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )

  // const userDataNo = <h2>此會員不存在</h2>
  // const useridNo = <h2>需要會員id</h2>

  const display = (
    <>
      <div className="memberBg">
        <div className="memberText">
          <div className="memberForm">
            <div className="memberLeft">
              <div className="memberInp">
                <UploadClass uId={users.uId} />
              </div>
              <div className="memberNote">
                <div className="memberNoteRad">
                  <label forhtml="uGender">性別</label>
                  {/* 用一個陣列來一次產出選項按鈕群組 */}
                  {['男', '女'].map((v, i) => {
                    return (
                      <RadioBox
                        key={i}
                        value={v}
                        uGender={uGender}
                        setUgender={setUgender}
                      />
                    )
                  })}
                </div>
                <div className="memberNoteInp">
                  <label forhtml="uNickname">暱稱</label>
                  <input
                    id="uNickname"
                    name="uNickname"
                    type="text"
                    placeholder={'原設定的暱稱:' + users.uNickname}
                    value={inputs.uNickname}
                    onChange={onChangeForInput('uNickname')}
                  />
                </div>
                <div className="memberNoteInp">
                  <label forhtml="uHobby">興趣</label>
                  <input
                    id="uHobby"
                    name="uHobby"
                    type="text"
                    placeholder={'原設定的興趣:' + users.uHobby}
                    value={inputs.uHobby}
                    onChange={onChangeForInput('uHobby')}
                  />
                </div>
              </div>
            </div>
            <div className="memberRight">
              <VisibilityOffSharpIcon onClick={toggleShow} />
              {/* 密碼顯示 */}
              <div className="usersLoginEyes">
                {/*?xml version="1.0" encoding="iso-8859-1"?*/}
                {/* Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  */}
                {/* 引入svg 前要記得轉成jsx型態 */}
                {/* <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 469.44 469.44"
                  // style={{ enableBackground: 'new 0 0 469.44 469.44' }}
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <g>
                        <path d="M231.147,160.373l67.2,67.2l0.32-3.52c0-35.307-28.693-64-64-64L231.147,160.373z" />
                        <path
                          d="M234.667,117.387c58.88,0,106.667,47.787,106.667,106.667c0,13.76-2.773,26.88-7.573,38.933l62.4,62.4
				c32.213-26.88,57.6-61.653,73.28-101.333c-37.013-93.653-128-160-234.773-160c-29.867,0-58.453,5.333-85.013,14.933l46.08,45.973
				C207.787,120.267,220.907,117.387,234.667,117.387z"
                        />
                        <path
                          d="M21.333,59.253l48.64,48.64l9.707,9.707C44.48,145.12,16.64,181.707,0,224.053c36.907,93.653,128,160,234.667,160
				c33.067,0,64.64-6.4,93.547-18.027l9.067,9.067l62.187,62.293l27.2-27.093L48.533,32.053L21.333,59.253z M139.307,177.12
				l32.96,32.96c-0.96,4.587-1.6,9.173-1.6,13.973c0,35.307,28.693,64,64,64c4.8,0,9.387-0.64,13.867-1.6l32.96,32.96
				c-14.187,7.04-29.973,11.307-46.827,11.307C175.787,330.72,128,282.933,128,224.053C128,207.2,132.267,191.413,139.307,177.12z"
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
                </svg> */}
              </div>
              <div className="memberInput">
                <label className="userEditUpwdLab" forhtml="uPwd">
                  密碼
                </label>
                <input
                  id="uPwd"
                  name="uPwd"
                  type={hidden ? 'password' : 'text'}
                  // 可以使用pattern屬性。該required屬性也是必需的，否則具有空值的輸入字段將從約束驗證中排除。
                  // pattern=".{6,}"
                  // required
                  // title="6 characters minimum"
                  value={inputs.uPwd}
                  onChange={onChangeForInput('uPwd')}
                  placeholder="此欄位必填!!!!(請填入6個位元以上的密碼)"
                />
              </div>
              <div className="memberInput">
                <label className="userEditUnameLab" forhtml="uName">
                  姓名
                </label>
                <input
                  id="uName"
                  name="uName"
                  type="text"
                  placeholder={'原設定的姓名:' + users.uName}
                  value={inputs.uName}
                  onChange={onChangeForInput('uName')}
                />
              </div>

              <div className="memberInput">
                <label className="userEditUTWIdLab" forhtml="uTWId">
                  身分證字號
                </label>
                <input
                  id="uTWId"
                  name="uTWId"
                  type="text"
                  placeholder={'原設定的身分證字號:' + users.uTWId}
                  value={inputs.uTWId}
                  onChange={onChangeForInput('uTWId')}
                />
              </div>
              <div className="memberInput">
                <label className="userEditUmailLab" forhtml="uMail">
                  e-mail
                </label>
                <input
                  id="uMail"
                  name="uMail"
                  type="email"
                  placeholder={'原設定的信箱:' + users.uMail}
                  value={inputs.uMail}
                  onChange={onChangeForInput('uMail')}
                />
              </div>
              <div className="memberInput">
                <label className="userEditUphoneLab" forhtml="uPhone">
                  電話
                </label>
                <input
                  id="uPhone"
                  name="uPhone"
                  type="text"
                  placeholder={'原設定的電話:' + users.uPhone}
                  value={inputs.uPhone}
                  onChange={onChangeForInput('uPhone')}
                />
              </div>
              <div className="memberInput">
                <label className="userEditUbirthLab" forhtml="uBirth">
                  出生年月日
                </label>
                <input
                  id="uBirth"
                  name="uBirth"
                  type="date"
                  placeholder={'原設定的出生年月日:' + users.uBirth}
                  value={inputs.uBirth}
                  onChange={onChangeForInput('uBirth')}
                />
              </div>
              <div className="memberInputAddr">
                <label className="userEditUaddrLab">地址</label>
              </div>
              <div className="memberInput">
                <label className="userEditUcountryLab" forhtml="uCountry">
                  國家
                </label>
                <input
                  className="inp"
                  id="uCountry"
                  name="uCountry"
                  type="text"
                  placeholder={'原設定的國家:' + users.uCountry}
                  value={inputs.uCountry}
                  onChange={onChangeForInput('uCountry')}
                />
              </div>
              <div className="memberInput">
                <label className="userEditUcityLab" forhtml="uCity">
                  縣市
                </label>
                <input
                  className="inp"
                  id="uCity"
                  name="uCity"
                  type="text"
                  placeholder={'原設定的縣市:' + users.uCity}
                  value={inputs.uCity}
                  onChange={onChangeForInput('uCity')}
                />
              </div>
              <div className="memberInput">
                <label className="userEditUtownshipLab" forhtml="uTownship">
                  鄉鎮/區
                </label>
                <input
                  className="inp"
                  id="uTownship"
                  name="uTownship"
                  type="text"
                  placeholder={'原設定的鄉鎮/區:' + users.uTownship}
                  value={inputs.uTownship}
                  onChange={onChangeForInput('uTownship')}
                />
              </div>
              <div className="memberInput">
                <label className="userEditUstreetLab" forhtml="uStreet">
                  街道
                </label>
                <input
                  className="inp"
                  id="uStreet"
                  name="uStreet"
                  type="text"
                  placeholder={'原設定的街道:' + users.uStreet}
                  value={inputs.uStreet}
                  onChange={onChangeForInput('uStreet')}
                />
              </div>
              <div className="memberTextarea">
                <label forhtml="userEditUdiscrLab">個人描述</label>
                <textarea
                  id="uDiscr"
                  name="uDiscr"
                  value={inputs.uDiscr}
                  onChange={onChangeForInput('uDiscr')}
                  placeholder={'原設定的個人描述:' + users.uDiscr}
                ></textarea>
              </div>

              <button
                onClick={() => {
                  putUserToServer()
                }}
                className="memberBtn"
              >
                編輯完成
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      <UsersTitle />
      {dataLoading ? loading : display}
    </>
  )
}

export default withRouter(UsersEdit)
