import React, { useState, useEffect } from 'react'

import { withRouter, Link } from 'react-router-dom'

import $ from 'jquery'

// 表單驗證套件
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

// 測試對話框 Dialog material-ui
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import './usersLogin.css'
import { type } from 'language-tags'

function UsersLogin(props) {
  // console.log(props)
  const [open, setOpen] = useState(false)
  const [dataLoading, setDataLoading] = useState(false)
  const [uAcco, setUacco] = useState('')
  const [uPwd, setUpwd] = useState('')
  const [uMail, setUmail] = useState('')

  async function getUserToLogin() {
    setDataLoading(true)
    const newData = { uAcco, uPwd }
    const url = `${process.env.REACT_APP_USERSURL}/login/`
    const req = new Request(url, {
      method: 'post',
      body: JSON.stringify(newData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    console.log(JSON.stringify(newData))
    const res = await fetch(req)
    const data = await res.json()

    console.log('伺服器回傳資料:', data)

    // 取得回傳的uId
    // console.log(data.body.uId)

    setTimeout(() => {
      setDataLoading(false)

      if (data.token) {
        // 將回傳的資料存放在token 內
        localStorage.setItem('token', data.token)
        alert('登入成功')
        props.history.push(`/usersText/${data.body.uId}`)
        window.location.reload()
      } else {
        alert('登入失敗')
        props.history.push('/usersLogin')
      }
    }, 1000)
  }
  // 表單驗證yup
  const validationSchema = Yup.object().shape({
    // Yup.string() 值為字串
    // Yup.number() 值為數字
    // Yup.number() 值為數字
    // require(字串)  必填，若沒填會出現字串
    // matches(正規表達式)
    uAcco: Yup.string().required('請輸入使用者帳號').min(6, '至少6個字符'),
    uPwd: Yup.string().required('請輸入使用者密碼').min(6, '至少6個字符'),
  })

  // 使用react-hook-form/resolvers庫中的函數將規則傳遞給 React Hook Form useForm()函數。yupResolver()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  // 當表單有效並提交時，onSubmit()調用方法，表單數據將顯示在控制台中：
  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2))
    getUserToLogin()
  }
  // setOpen(true) 開啟彈窗功能
  // 彈窗測試(功能)
  async function checkUaccoToServer() {
    setOpen(true)
    // setDataLoading(true)
    const newData = { uAcco, uMail }
    const url = `${process.env.REACT_APP_USERSURL}/checkUacco/`
    const req = new Request(url, {
      method: 'post',
      body: JSON.stringify(newData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const res = await fetch(req)
    const data = await res.json()

    console.log('伺服器回傳值:', data)

    // const promiseData = data.then((x) => console.log(x.success))
    // PromiseResult取值方法data.then((x) => console.log(x.success))
    // 裡面的 console.log 可判斷

    setTimeout(() => {
      // setDataLoading(false)
      if (data.success === true) {
        alert('已將新密碼寄送至您信箱，請前去確認')
        setOpen(false)
        props.history.push('/usersLogin')
      } else {
        alert('請再確認帳號及信箱是否輸入正確')
        setOpen(open)
        // props.history.push('/usersForget')
      }
    }, 1000)
  }
  // 開啟彈窗
  const handleClickOpen = () => {
    setOpen(true)
  }

  // 關閉彈窗
  const handleClose = () => {
    setOpen(false)
  }
  // 密碼顯示
  useEffect(() => {
    $('.usersLoginEyes').click(() => {
      // console.log('hi')
      if ($('#uPwd').attr('type') === 'password') {
        $('#uPwd').attr('type', 'text')
      } else {
        $('#uPwd').attr('type', 'password')
      }
    })
  }, [])

  // 處理表單送出
  // const handleSubmit = (e) => {
  //   // 阻擋表單送出預設行為
  //   // 只要有錯誤訊息就不執行postUserToServer()
  //   e.preventDefault()
  //   if (inputsErrors.uAcco === '' && inputsErrors.uPwd === '') {
  //     getUserToLogin()
  //   }
  // }
  return (
    <>
      <div className="logintitle">
        <p>登入頁面</p>
      </div>
      <div className="loginRow">
        <div className="logindiv">
          <p className="usersloginText">登入到您的帳戶</p>
          <p className="usersloginText">請輸入您的帳號和密碼</p>
          <form // 阻擋表單預設行為
            onSubmit={handleSubmit(onSubmit)}
            // onChange={handleChange}
            // onInvalid={handleInvalid}
            // noValidate}
          >
            <div className="uAcco">
              <label forhtml="uAcco">帳號</label>
              <input
                // className="inp"
                id="uAcco"
                name="uAcco"
                type="text"
                placeholder="請輸入帳號"
                value={uAcco}
                {...register('uAcco')}
                onChange={(e) => {
                  setUacco(e.target.value)
                }}
                className={`form-controlLogin ${
                  errors.uAcco ? 'is-invalid' : ''
                }`}
                // required
              />
              <div className="invalid-feedbackLogin">
                {errors.uAcco?.message}
              </div>
            </div>
            <div className="uPwd">
              <label forhtml="uPwd">密碼</label>
              <input
                // className="inp"
                id="uPwd"
                name="uPwd"
                type="password"
                {...register('uPwd')}
                placeholder="請輸入密碼"
                value={uPwd}
                onChange={(e) => {
                  setUpwd(e.target.value)
                }}
                // required
                className={`form-controlLogin ${
                  errors.uPwd ? 'is-invalid' : ''
                }`}
              />
              <div className="usersLoginEyes">
                {' '}
                {/*?xml version="1.0" encoding="iso-8859-1"?*/}
                {/* Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  */}
                {/* 引入svg 前要記得轉成jsx型態 */}
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 469.44 469.44"
                  style={{ enableBackground: 'new 0 0 469.44 469.44' }}
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
                </svg>
              </div>
              <div className="invalid-feedbackLogin">
                {errors.uPwd?.message}
              </div>
            </div>
            <div className="chk">
              {/* 點擊後 token 會延長儲存時間 */}
              <input type="checkbox" name="cheakbox" id="chk" />
              <label forhtml="chk">保持登入</label>
            </div>
            <div className="logfor">
              <button
                type="submit"
                className="btnBlue btn1"
                // onClick={() => {
                //   getUserToLogin()
                // }}
              >
                登入
              </button>

              <div className="forget">
                <div>
                  <button
                    className="usersLoginButtonFor"
                    variant="outlined"
                    color="primary"
                    onClick={handleClickOpen}
                  >
                    忘記密碼
                  </button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">忘記密碼</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        請輸入您的帳號和e-mail
                      </DialogContentText>

                      <TextField
                        autoFocus
                        margin="dense"
                        id="uAcco"
                        name="uAcco"
                        label="帳號"
                        type="text"
                        fullWidth
                        value={uAcco}
                        onChange={(e) => {
                          setUacco(e.target.value)
                        }}
                        // {...register('uAcco')}
                        // className={`form-control ${
                        //   errors.uAcco ? 'is-invalid' : ''
                        // }`}
                      />
                      {/* <div className="invalid-feedback">
                        {errors.uAcco?.message}
                      </div> */}
                      <TextField
                        autoFocus
                        margin="dense"
                        id="uMail"
                        name="uMail"
                        label="信箱"
                        type="e-mail"
                        fullWidth
                        value={uMail}
                        onChange={(e) => {
                          setUmail(e.target.value)
                        }}
                        // {...register('uMail')}
                        // className={`form-control ${
                        //   errors.uMail ? 'is-invalid' : ''
                        // }`}
                      />
                      {/* <div className="invalid-feedback">
                        {errors.uMail?.message}
                      </div> */}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        取消
                      </Button>
                      <Button onClick={checkUaccoToServer} color="secon">
                        確定
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
                {/* <Link to="/usersForget">忘記密碼?</Link> */}
              </div>
            </div>
          </form>

          {/* <p className="loginOr">Or sign with</p>
          <button className="btnBlue btn2">Facebook</button>
          <button className="btng btn2">Line</button> */}
        </div>
        <div className="borderCenter"></div>
        <div className="register">
          <p className="usersloginRes">創建一個帳戶</p>
          <ul className="usersloginResUl">
            <li>創建一個帳戶，享受咖啡餘韻</li>
            <li>讓生活授受充滿咖啡的芬芳</li>
            <li>如果說有驚喜，那就是喝下咖啡的瞬間</li>
            <li>加入我們，有讓你喝不完的咖啡</li>
            <li>建立起與我們的連結，此生不後悔</li>
          </ul>
          <Link to="/usersRegister" className="btnBlue btn3">
            創建一個帳戶
          </Link>
        </div>
      </div>
      {/* 彈窗測試(畫面) */}
    </>
  )
}

export default withRouter(UsersLogin)
