import React, { useState, useEffect } from 'react'

import { withRouter } from 'react-router-dom'

// import RadioBox from '../components/RadioBox'

import './usersRegister.css'

// 表單驗證套件

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

// jquery

import $ from 'jquery'

// carousel img
// 若檔案放在src 之外 ，不能導入資料
// import Slide1 from '../../../../public/img/users/slide1.jpg'

function UsersRegister(props) {
  // 初始載入指示為關閉狀態
  const [dataLoading, setDataLoading] = useState(false)
  // input 初始值設定
  const [inputs, setInputs] = useState({
    uAcco: '',
    uPwd: '',
    uChkPwd: '',
    uMail: '',
    uPhone: '',
    uName: '',
    uTWId: '',
    uBirth: '',
    uCountry: '',
    uCity: '',
    uTownship: '',
    uStreet: '',
  })
  // input 每個欄位的錯誤訊息
  // const [inputsErrors, setInputsErrors] = useState({
  //   uAcco: '',
  //   uPwd: '',
  //   uChkPwd: '',
  //   uMail: '',
  //   uPhone: '',
  //   uName: '',
  //   uTWId: '',
  //   uBirth: '',
  //   uCountry: '',
  //   uCity: '',
  //   uTownship: '',
  //   uStreet: '',
  //   uGender: '',
  // })
  // radio
  const [uGender, setUgender] = useState('')
  //****難**** / input onChange執行內容  用closure寫
  const onChangeForInput = (InputName) => (e) => {
    setInputs((state) => ({
      ...state,
      [InputName]: e.target.value,
    }))
  }

  const [chk, setChk] = useState(false)

  // post功能(fetch)
  async function postUserToServer() {
    // 開啟載入指示
    setDataLoading(true)
    // 取得使用者輸入的值
    const newData = { ...inputs, uGender }
    // 連接的伺服器資料網址
    const url = `${process.env.REACT_APP_USERSURL}/usersRegister/`
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
    console.log(JSON.stringify(newData))
    const res = await fetch(req)
    const data = await res.json()

    console.log('伺服器回傳資料:', data)

    setTimeout(() => {
      // 關閉指示器
      setDataLoading(false)
      if (data !== false) {
        localStorage.setItem('token', data.token)
        alert('註冊成功，請重新登入')
        props.history.push('/usersLogin')
      } else if (data === false) {
        alert('帳號或身份證字號重複')
        props.history.push('/usersRegister')
      } else {
        alert('新增失敗')
        props.history.push('/usersRegister')
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
    uChkPwd: Yup.string()
      .required('請再次輸入使用者密碼')
      .min(6, '至少6個字符')
      .oneOf([Yup.ref('uPwd'), null], '請確認使用者密碼需一致'),
    uMail: Yup.string()
      .required('請輸入使用者信箱')
      .matches(
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        '請輸入正確的電子信箱'
      ),
    uPhone: Yup.string().required('請輸入使用者電話').min(10, '至少10個字符'),
    uName: Yup.string().required('請輸入使用者名稱'),
    uTWId: Yup.string()
      .required('請輸入使用者身分證字號')
      .min(10, '至少10個字符')
      .matches(/^[a-zA-Z]\d{9}$/g, '請輸入正確的身分證字號'),
    uBirth: Yup.string().required('請輸入使用者出生年月日'),
    uCountry: Yup.string().required('請輸入國家'),
    uCity: Yup.string().required('請輸入縣市'),
    uTownship: Yup.string().required('請輸入鄉鎮/區'),
    uStreet: Yup.string().required('請輸入街道'),
    // radio 應用
    uGender: Yup.mixed().oneOf(['男', '女'], '請輸入性別'),
    // checkbox 應用
    chk: Yup.bool().oneOf([true], '請勾選同意事項'),
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
    postUserToServer()
  }

  // 自動填寫 (動態生成，無法使用)
  // useEffect(() => {
  //   $('#usersRegisterAutoInput').click(function () {
  //     $('#uAcco').val('Amos666666')
  //     $('#uPwd').val('Amos666666')
  //     $('#uChkPwd').val('Amos666666')
  //     $('#uMail').val('shile7350@gmail.com.tw')
  //     $('#uPhone').val('0988888888')
  //     $('#uName').val('Amos')
  //     $('#uGender').prop('checked', '男')
  //     $('#uTWId').val('A123456789')
  //     $('#uBirth').val('79/07/27')
  //     $('#uCountry').val('台灣')
  //     $('#uCity').val('台北市')
  //     $('#uTownship').val('大安區')
  //     $('#uStreet').val('復興南路南路一段390號2樓')
  //     $('#chk').prop('checked', true)
  //   })
  // }, [])

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

  // 輪播畫面
  useEffect(() => {
    let nowPage = 0
    // 選擇起始值
    let wrapWidth = $('.registerCarousel').width()
    // 單張顯示寬度

    $('.registerCarouselUl').width(wrapWidth * 7)
    // 照片總寬度

    $('.registerCarouselSlider_dots li ').hover((e) => {
      // console.log("hi",$(this).index());
      // index() 可區分li 的index
      console.log($(e.target).index())
      nowPage = $(e.target).index()
      // 如果用this 就不能用箭頭函式

      changePage()
    })

    $('.registerCarouselRight_arrow').click(() => {
      // console.log('hi')
      if (nowPage >= 5) return
      // 當nowPage >= 5 程式結束
      nowPage++

      changePage()
    })
    $('.registerCarouselLeft_arrow').click(() => {
      if (nowPage <= -1) return
      nowPage--

      changePage()
    })

    let myInterval
    // 宣告myInterval初始值
    // 設定自動輪播

    function startMyInterval() {
      myInterval = setInterval(() => {
        // setInterval() 間隔多少毫秒後，重新執行一次
        if (nowPage < 4) {
          // 當index() 小於4時，就往上加
          nowPage++
        } else {
          // 當index() 大於4時，就從0開始
          nowPage = 0
        }
        changePage()
      }, 3000)
      // 設定轉換秒數
    }

    startMyInterval()
    // 執行startMyInterval();

    function changePage() {
      const moveX = -1 * wrapWidth * nowPage
      // 若沒寫-1* 會變往左邊跑
      // console.log(moveX);
      // 單張顯示寬度*選擇的index()
      $('.registerCarouselUl')
        .css('transition', '0.5s')
        .css('transform', `translateX(${moveX - wrapWidth}px)`)
      // console.log(moveX - wrapWidth)
      // 設定hover後 照片移動位置

      $('.registerCarouselSlider_dots li')
        .eq(nowPage)
        .css('background', '#fff')
        .siblings()
        .css('background', 'none')
      // eq()選取 第幾(index())個，siblings()選取自己以外的元素
      // 設定點選器反白
    }

    function changePageQuietly() {
      const moveX = -1 * wrapWidth * nowPage
      $('.registerCarouselUl')
        .css('transition', 'none')
        // transition:none 因為已經將轉換時間 給setInterval()了
        .css('transform', `translateX(${moveX - wrapWidth}px)`)

      $('.registerCarouselSlider_dots li')
        .eq(nowPage)
        .css('background', '#fff')
        .siblings()
        .css('background', 'none')
    }
    // 設定 滑鼠指向 wrap(畫面)  後就停止輪播
    $('.registerCarousel').mouseenter(() => {
      clearInterval(myInterval)
    })
    // 設定滑鼠離開 wrap(畫面)  後  繼續執行 setInterval()
    $('.registerCarousel').mouseleave(() => {
      startMyInterval()
    })
    $('.registerCarouselUl').on('transitionend', () => {
      // console.log(transitionend);
      // transitionend事件在CSS transition完成的時候觸發。如果transition在完成前被刪除（例如remove掉transition屬性），則不會觸發。如在transition完成前設置display: none，或CSS未作改變，事件同樣不會被觸發.
      if (nowPage >= 5) {
        nowPage = 0
        changePageQuietly()
      }
      if (nowPage <= -1) {
        nowPage = 4
        changePageQuietly()
      }
    })
  }, [])
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  // }
  // 處理表單送出
  // const handleSubmit = (e) => {
  //   // return console.log('hi')
  //   // 阻擋表單送出預設行為
  //   e.preventDefault()
  //   if (inputs.uPwd !== inputs.uChkPwd) {
  //     return inputsErrors.uChkPwd === '請確認密碼'
  //   }
  //   // 只要有錯誤訊息就不執行postUserToServer()
  //   if (
  //     inputsErrors.uAcco === '' &&
  //     inputsErrors.uPwd === '' &&
  //     inputsErrors.uChkPwd === '' &&
  //     inputsErrors.uMail === '' &&
  //     inputsErrors.uPhone === '' &&
  //     inputsErrors.uName === '' &&
  //     inputsErrors.uTWId === '' &&
  //     inputsErrors.uBirth === '' &&
  //     inputsErrors.uCountry === '' &&
  //     inputsErrors.uCity === '' &&
  //     inputsErrors.uTownship === '' &&
  //     inputsErrors.uStreet === '' &&
  //     inputsErrors.uGender === ''
  //   ) {
  //     postUserToServer()
  //   }
  // }

  // form有更動會觸發這個函式
  // const handleChange = (e) => {
  //   console.log('更動欄位：', e.target.name)

  //   // 該欄位錯誤訊息清空
  //   const updatedFieldErrors = {
  //     ...inputsErrors,
  //     [e.target.name]: '',
  //   }

  //   setInputsErrors(updatedFieldErrors)
  // }
  // // 有錯誤的訊息會觸發在這裡
  // const handleInvalid = (e) => {
  //   e.preventDefault()
  //   const updatedFieldErrors = {
  //     ...inputsErrors,
  //     [e.target.name]: e.target.validationMessage,
  //   }
  //   // 檢查欄位錯誤
  //   console.log(updatedFieldErrors)

  //   setInputsErrors(updatedFieldErrors)
  // }

  // checkbox 點選後，btn 才會出現
  // const btnCanClick = () => {
  //   setChk(true)
  // }

  // loading 圖示
  const loading = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    </>
  )

  const display = (
    <>
      <div className="registerTotal">
        {/* Input */}
        <div>
          <p className="registerTitle">填寫基本資訊</p>
          <p className="registerTitle1">帳戶資訊</p>
          <form
            // 阻擋表單預設行為
            onSubmit={handleSubmit(onSubmit)}
            // onChange={handleChange}
            // 自訂錯誤訊息
            // onInvalid={handleInvalid}
            // 不要顯示錯誤
            // noValidate
          >
            <div className="inputLeft">
              <div className="registerInput">
                <label className="usersRegisterUaccoLab" forhtml="uAcco">
                  帳號
                </label>
                {/*  每一個輸入框一定要加名稱，和定義的欄位狀態值最好一樣 */}
                <input
                  id="uAcco"
                  name="uAcco"
                  type="text"
                  // 標記input 用的
                  {...register('uAcco')}
                  placeholder="請輸入帳號"
                  // required
                  // value = 物件.key
                  value={inputs.uAcco}
                  onChange={onChangeForInput('uAcco')}
                  className={`form-control ${errors.uAcco ? 'is-invalid' : ''}`}
                />
                {/* 錯誤訊息顯示的地方 */}
                <div className="invalid-feedbackReg">
                  {errors.uAcco?.message}
                </div>
              </div>
              <div className="registerInput">
                <label className="usersRegisterUpwdLab" forhtml="uPwd">
                  密碼
                </label>
                <input
                  id="uPwd"
                  name="uPwd"
                  type="password"
                  {...register('uPwd')}
                  placeholder="請輸入密碼"
                  // required
                  value={inputs.uPwd}
                  onChange={onChangeForInput('uPwd')}
                  className={`form-control ${errors.uPwd ? 'is-invalid' : ''}`}
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
                <div className="invalid-feedbackReg">
                  {errors.uPwd?.message}
                </div>
              </div>
              <div className="registerInput">
                <label className="usersRegisterUchkpwdLab" forhtml="uChkPwd">
                  確認密碼
                </label>
                <input
                  id="uChkPwd"
                  name="uChkPwd"
                  type="password"
                  {...register('uChkPwd')}
                  placeholder="請再次輸入密碼"
                  // required
                  value={inputs.uChkPwd}
                  onChange={onChangeForInput('uChkPwd')}
                  className={`form-control ${
                    errors.uChkPwd ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedbackReg">
                  {errors.uChkPwd?.message}
                </div>
              </div>
              <div className="registerInput">
                <label className="usersRegisterUmailLab" forhtml="uMail">
                  e-mail
                </label>
                <input
                  id="uMail"
                  name="uMail"
                  type="email"
                  {...register('uMail')}
                  placeholder="請輸入geogle e-mail"
                  // required
                  value={inputs.uMail}
                  onChange={onChangeForInput('uMail')}
                  className={`form-control ${errors.uMail ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedbackReg">
                  {errors.uMail?.message}
                </div>
              </div>
              <div className="registerInput">
                <label className="usersRegisterUphoneLab" forhtml="uPhone">
                  電話
                </label>
                <input
                  id="uPhone"
                  name="uPhone"
                  type="text"
                  {...register('uPhone')}
                  placeholder="請輸入電話"
                  // required
                  value={inputs.uPhone}
                  onChange={onChangeForInput('uPhone')}
                  className={`form-control ${
                    errors.uPhone ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedbackReg">
                  {errors.uPhone?.message}
                </div>
              </div>
            </div>
            <p className="registerTitle1">聯絡人資訊</p>
            <div className="inputLeft">
              <div className="registerInput">
                <label className="usersRegisterUnameLab" forhtml="uName">
                  姓名
                </label>
                <input
                  id="uName"
                  name="uName"
                  type="text"
                  {...register('uName')}
                  placeholder="請輸入姓名"
                  // required
                  value={inputs.uName}
                  onChange={onChangeForInput('uName')}
                  className={`form-control ${errors.uName ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedbackReg">
                  {errors.uName?.message}
                </div>
              </div>
              <div className="registerRadio">
                <label className="usersRegisterUgenderLab" forhtml="uGender">
                  性別
                </label>
                <input
                  id="uGender"
                  type="radio"
                  {...register('uGender')}
                  name="uGender"
                  value="男"
                  checked={uGender === '男'}
                  onChange={(e) => {
                    setUgender(e.target.value)
                  }}
                  className={`rad  ${errors.uGender ? 'is-invalid' : ''}`}
                />
                男
                <input
                  id="uGender"
                  type="radio"
                  name="uGender"
                  value="女"
                  {...register('uGender')}
                  checked={uGender === '女'}
                  onChange={(e) => {
                    setUgender(e.target.value)
                  }}
                  className={`rad  ${errors.uGender ? 'is-invalid' : ''}`}
                />
                女
                <div className="invalid-feedbackReg">
                  {errors.uGender?.message}
                </div>
                {/* 用一個陣列來一次產出選項按鈕群組 */}
                {/* {['男', '女'].map((v, i) => {
                  return (
                    <RadioBox
                      key={i}
                      value={v}
                      uGender={uGender}
                      setUgender={setUgender}
                    />
                  )
                })} */}
              </div>
              <div className="registerInput">
                <label className="usersRegisterUTWIdLab" forhtml="uTWId">
                  身分證字號
                </label>
                <input
                  id="uTWId"
                  name="uTWId"
                  type="text"
                  {...register('uTWId')}
                  placeholder="請輸入身分證字號"
                  // required
                  value={inputs.uTWId}
                  onChange={onChangeForInput('uTWId')}
                  className={`form-control ${errors.uTWId ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedbackReg">
                  {errors.uTWId?.message}
                </div>
              </div>
              <div className="registerInput">
                <label className="usersRegisterUbirthLab" forhtml="uBirth">
                  出生年月日
                </label>
                <input
                  id="uBirth"
                  name="uBirth"
                  type="date"
                  {...register('uBirth')}
                  placeholder="請輸入出生年月日"
                  // required
                  value={inputs.uBirth}
                  onChange={onChangeForInput('uBirth')}
                  className={`form-control ${
                    errors.uBirth ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedbackReg">
                  {errors.uBirth?.message}
                </div>
              </div>
              <div className="registerInput">
                <label className="usersRegisterUaddrLab">地址</label>
              </div>
              <div className="registerInput">
                <label className="usersRegisterUcountryLab" forhtml="uCountry">
                  國家
                </label>
                <input
                  id="uCountry"
                  name="uCountry"
                  type="text"
                  {...register('uCountry')}
                  placeholder="請輸入國家"
                  // required
                  value={inputs.uCountry}
                  onChange={onChangeForInput('uCountry')}
                  className={`form-control ${
                    errors.uCountry ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedbackReg">
                  {errors.uCountry?.message}
                </div>
              </div>
              <div className="registerInput">
                <label className="usersRegisterUcityLab" forhtml="uCity">
                  縣市
                </label>
                <input
                  id="uCity"
                  name="uCity"
                  type="text"
                  {...register('uCity')}
                  placeholder="請輸入縣市"
                  // required
                  value={inputs.uCity}
                  onChange={onChangeForInput('uCity')}
                  className={`form-control ${errors.uCity ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedbackReg">
                  {errors.uCity?.message}
                </div>
              </div>
              <div className="registerInput">
                <label
                  className="usersRegisterUtownshipLab"
                  forhtml="uTownship"
                >
                  鄉鎮/區
                </label>
                <input
                  id="uTownship"
                  name="uTownship"
                  type="text"
                  {...register('uTownship')}
                  placeholder="請輸入鄉鎮/區"
                  // required
                  value={inputs.uTownship}
                  onChange={onChangeForInput('uTownship')}
                  className={`form-control ${
                    errors.uTownship ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedbackReg">
                  {errors.uTownship?.message}
                </div>
              </div>
              <div className="registerInput">
                <label className="usersRegisterUstreetLab" forhtml="uStreet">
                  街道
                </label>
                <input
                  id="uStreet"
                  name="uStreet"
                  type="text"
                  {...register('uStreet')}
                  placeholder="請輸入街道"
                  // required
                  value={inputs.uStreet}
                  onChange={onChangeForInput('uStreet')}
                  className={`form-control ${
                    errors.uStreet ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedbackReg">
                  {errors.uStreet?.message}
                </div>
              </div>
              <div className="registerCheck">
                <input
                  name="chk"
                  id="chk"
                  type="checkbox"
                  {...register('chk')}
                  className={`form-check-input chk ${
                    errors.chk ? 'is-invalid' : ''
                  }`}
                />
                <label forhtml="chk">我同意相關聲明事項</label>
                <div className="invalid-feedbackRegchk">
                  {errors.chk?.message}{' '}
                </div>
              </div>
              <button
                type="submit"
                className="registerBtn"
                // 因為 要使用html5的驗證功能，故會交由form 的 onSubmit 去觸發
                // onClick={() => {
                //   postUserToServer()
                // }}
              >
                送出
              </button>
              {/* <button id="usersRegisterAutoInput">一鍵填入</button> */}
            </div>
          </form>
        </div>
        {/* Carousel */}
        <div className="registerCarousel ">
          <ul className="registerCarouselUl">
            {/* list-unstyled 移除默認的列表樣式，列表項中左對齊 ( <ul> 和 <ol> 中)。 這個類僅適用於直接子列表項 (如果需要移除嵌套的列表項，你需要在嵌套的列表中使用該樣式)  */}
            <li>
              <img
                src={`http://localhost:3000/img/users/newslide5.jpg`}
                alt="5"
              />
            </li>
            <li>
              <img
                src={`http://localhost:3000/img/users/newslide1.jpg`}
                alt="1"
              />
            </li>
            <li>
              <img
                src={`http://localhost:3000/img/users/newslide2.jpg`}
                alt="2"
              />
            </li>
            <li>
              <img
                src={`http://localhost:3000/img/users/newslide3.jpg`}
                alt="3"
              />
            </li>
            <li>
              <img
                src={`http://localhost:3000/img/users/newslide4.jpg`}
                alt="4"
              />
            </li>
            <li>
              <img
                src={`http://localhost:3000/img/users/newslide5.jpg`}
                alt="5"
              />
            </li>
            <li>
              <img
                src={`http://localhost:3000/img/users/newslide1.jpg`}
                alt="1"
              />
            </li>
          </ul>
          {/* 畫面下面選紐 */}
          <ul className="registerCarouselSlider_dots">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>

          {/* 左右兩邊按鈕 */}
          <div className="registerCarouselLeft_arrow">左icon</div>
          <div className="registerCarouselRight_arrow">右icon</div>
        </div>
      </div>
    </>
  )

  return <>{dataLoading ? loading : display}</>
}

export default withRouter(UsersRegister)
