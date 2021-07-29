import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router'
import Steppers from '../components/Steppers'

const cateLabels = [
  {
    value: 0,
    label: '200g',
    price: 200,
  },
  {
    value: 1,
    label: '500g',
    price: 400,
  },
  {
    value: 2,
    label: '1kg',
    price: 600,
  },
  {
    value: 3,
    label: '1.5kg',
    price: 800,
  },
]

const TestForm = (props) => {
  //分步驟為 3 step
  const [step1, setStep1] = useState([
    // {
    //   iId: '9999',
    //   iImg: 'https://fakeimg.pl/125x125/',
    //   name: '範例咖啡豆',
    //   category: '',
    //   iPrice: 123,
    //   iCount: 10,
    //   total: '',
    // },
    // {
    //   iId: '9999',
    //   iImg: 'https://fakeimg.pl/125x125/',
    //   name: '範例咖啡豆',
    //   category: '',
    //   iPrice: 123,
    //   iCount: 10,
    //   total: '',
    // },
    {},
  ])
  // console.log(step1.length)
  const [step2, setStep2] = useState({
    error: '',
    country: '',
    city: -1,
    township: -1,
    street: '',
    choose: '宅配', //單選 value
    name: '',
    phone: '',
    email: '',
    to711city: '',
    to711Store: '',
  })

  const [step3, setStep3] = useState({
    creditName: '',
    creditNum: '',
    validity: '',
    ccv: '',
    payment: '',
    // agree: false,
  })

  //單價跟規格連動
  const [cateLabel, setCateLabel] = useState(0)
  const [price, setPrice] = useState(0)
  const [count, setCount] = useState(1)
  const [country, setCountry] = useState(-1)
  const [township, setTownship] = useState(-1)
  const [step2Errors, setStep2Errors] = useState({
    country: '',
    city: '',
    name: '',
    phone: '',
    email: '',
    to711city: '',
    to711Store: '',
  })

  const [step3Errors, setStep3Errors] = useState({
    creditName: '',
    creditNum: '',
    validity: '',
    ccv: '',
    payment: false,
  })

  //變更欄位內容(step1)
  const handleStep1Change = (e) => {
    const updatedStep1 = {
      ...step1,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }
    setStep1(updatedStep1)
  }

  //變更欄位內容(step3)
  const handleStep3Change = (e) => {
    const updatedStep3 = {
      ...step3,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }
    setStep3(updatedStep3)
  }

  const validEmail = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  )
  const validPhone = new RegExp(/09\d{2}-?\d{3}-?\d{3}$/i)
  const validCreditNum = new RegExp(/\b(?:\d{4}[ -]?){3}(?=\d{4}\b)/)

  //變更欄位內容(step2)
  const handleStep2Change = (e) => {
    const updatedStep2 = {
      ...step2,
      [e.target.name]:
        e.target.type === 'checkbox'
          ? e.target.checked
          : e.target.name === 'township' && e.target.type === 'option'
          ? +e.target.value && step2.city > -1
          : e.target.value,
    }

    setStep2(updatedStep2)
  }

  const handleErrors = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    let errors = Object.assign(step2Errors, step3Errors)
    switch (name) {
      case 'country':
        errors.country = value.length - 1 < 1 ? '至少填寫2字以上' : ''
        break
      // case 'city':
      //   errors.city  = -1 ? '請選擇縣市' : ''
      //   break
      // case 'township':
      //   errors.township = -1 ? '請選擇地區' : ''
      //   break
      case 'street':
        errors.street = value.length < 5 ? '地址必填，至少5字' : ''
        break
      case 'name':
        errors.name = value.length < 2 ? '姓名至少填寫2字以上' : ''
        break
      case 'phone':
        errors.phone = validPhone.test(value) ? '' : '請填正確手機號碼'
        break
      case 'email':
        errors.email = validEmail.test(value) ? '' : '請填正確信箱'
        break
      case 'payment':
        errors.payment = false ? '請選擇付款方式' : ''
        break
      case 'creditName':
        errors.creditName = value.length < 2 ? '姓名至少填寫2字以上' : ''
        break
      case 'creditNum':
        errors.creditNum = validCreditNum.test(value) ? '' : '卡號必填'
        break
      case 'validity':
        errors.validity = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(value)
          ? ''
          : '有效日期必填'
        break
      case 'ccv':
        errors.ccv = /^\d{3}$/.test(value) ? '' : '安全碼必填'
        break

      default:
        break
    }
    setStep2Errors({ errors })
  }
  const { errors } = Object.assign(step2Errors, step3Errors)

  // const validateForm = (errors) => {
  //   let valid = true
  //   Object.values(errors).forEach((val) => val.length > 0 && (valid = false))
  //   return valid
  // }

  const handleChange = (e) => {
    // const updatedFieldErrors = {
    //   ...fieldErrors,
    //   [e.target.name]: '',
    // }

    // setFieldErrors(updatedFieldErrors)
    setCateLabel(e.target.value)
  }

  // 有錯誤的訊息會觸發在這裡
  const handleInvalid = (e) => {
    e.preventDefault()

    // const updatedStep3Errors = {
    //   ...step3Errors,
    //   [e.target.name]: e.target.validationMessage,
    // }
    // setStep2Errors(updatedStep2Errors)
  }
  useEffect(() => {
    if (localStorage.token) {
      // 裡面填自己的function
    } else {
      alert('請先行登入')
      props.history.push('/usersLogin')
    }
  }, [])

  return (
    <>
      <Steppers
        step1={step1}
        setStep1={setStep1}
        step2={step2}
        setStep2={setStep2}
        step3={step3}
        setStep3={setStep3}
        cateLabels={cateLabels}
        cateLabel={cateLabel}
        setCateLabel={setCateLabel}
        price={price}
        setPrice={setPrice}
        handleChange={handleChange}
        handleStep2Change={handleStep2Change}
        count={count}
        setCount={setCount}
        step2Errors={step2Errors}
        setStep2Errors={setStep2Errors}
        handleStep3Change={handleStep3Change}
        handleInvalid={handleInvalid}
        errors={errors}
        handleErrors={handleErrors}
      />
    </>
  )
}

export default withRouter(TestForm)
