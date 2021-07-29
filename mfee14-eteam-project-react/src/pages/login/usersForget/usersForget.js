import React, { useState } from 'react'

import { withRouter } from 'react-router-dom'

import './usersForget.css'

// 表單驗證套件
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

function UsersForget(props) {
  const [uAcco, setUacco] = useState('')
  const [uMail, setUmail] = useState('')
  const [dataLoading, setDataLoading] = useState(false)

  async function checkUaccoToServer() {
    setDataLoading(true)
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
      setDataLoading(false)
      if (data.success === true) {
        alert('已將新密碼寄送至您信箱，請前去確認')
        props.history.push('/usersLogin')
      } else {
        alert('請再確認帳號及信箱是否輸入正確')
        props.history.push('/usersForget')
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
    uMail: Yup.string()
      .required('請輸入使用者信箱')
      .matches(
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        '請輸入正確的電子信箱'
      ),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2))
    checkUaccoToServer()
  }

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
      <div className="usersforgetBgc">
        <p className="usersforgetHead">確認信箱</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div className="usersforgetInp">
              <label forhtml="uAcco">帳號</label>
              <input
                type="text"
                id="uAcco"
                name="uAcco"
                {...register('uAcco')}
                placeholder="請輸入帳號"
                value={uAcco}
                onChange={(e) => {
                  setUacco(e.target.value)
                }}
                className={`form-control ${errors.uAcco ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.uAcco?.message}</div>
            </div>
            <div className="usersforgetInp">
              <label forhtml="e-mail">信箱</label>
              <input
                type="e-mail"
                id="uMail"
                name="uMail"
                {...register('uMail')}
                placeholder="請輸入e-mail，我們將會寄送新密碼給您"
                value={uMail}
                onChange={(e) => {
                  setUmail(e.target.value)
                }}
                className={`form-control ${errors.uMail ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.uMail?.message}</div>
            </div>
          </div>
          <div className="usersforgetBtn">
            <button
              type="submit"
              // onClick={() => {
              //   checkUaccoToServer()
              // }}
            >
              送出
            </button>
          </div>
        </form>
      </div>
    </>
  )

  return <>{dataLoading ? loading : display}</>
}

export default withRouter(UsersForget)
