import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

function FormValidationTest() {
  // 使用Yup模式驗證庫來進行表單驗證規則
  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('Fullname is required'),
    username: Yup.string()
      .required('名子必須填')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    // checkbox 應用
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
  })
  // 使用react-hook-form/resolvers庫中的函數將規則傳遞給 React Hook Form useForm()函數。yupResolver()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })
  // 該useForm()鉤子函數返回，我們用下面的方法的對象：

  // register: 寄存器輸入
  // handleSubmit: 處理表單提交
  // reset: 重置表格
  // 該對像還具有formState包含errors.

  // 當表單有效並提交時，onSubmit()調用方法，表單數據將顯示在控制台中：
  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2))
  }
  return (
    <>
      <div className="register-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              name="fullname"
              type="text"
              {...register('fullname')}
              className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.fullname?.message}</div>
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              name="username"
              type="text"
              // 標記input 用的
              {...register('username')}
              // 欄位格式
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            />
            {/* 錯誤訊息顯示的地方 */}
            <div className="invalid-feedback">{errors.username?.message}</div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="text"
              {...register('email')}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              {...register('password')}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              className={`form-control ${
                errors.confirmPassword ? 'is-invalid' : ''
              }`}
            />
            <div className="invalid-feedback">
              {errors.confirmPassword?.message}
            </div>
          </div>

          <div className="form-group form-check">
            <input
              name="acceptTerms"
              type="checkbox"
              {...register('acceptTerms')}
              className={`form-check-input ${
                errors.acceptTerms ? 'is-invalid' : ''
              }`}
            />
            <label htmlFor="acceptTerms" className="form-check-label">
              I have read and agree to the Terms
            </label>
            <div className="invalid-feedback">
              {errors.acceptTerms?.message}
            </div>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <button
              type="button"
              onClick={reset}
              className="btn btn-warning float-right"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default FormValidationTest
