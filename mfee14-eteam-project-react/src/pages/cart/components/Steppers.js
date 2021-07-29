/**
 * 3. error(未連動 button)
 *
 */

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  makeStyles,
  withStyles,
  Stepper,
  SvgIcon,
  Step,
  StepLabel,
  StepConnector,
  Button,
  Typography,
  // Paper,
  AppBar,
  Toolbar,
  Grid,
  // TextField,
  Hidden,
  // Container,
  // Box,
  // MenuItem,
} from '@material-ui/core'
import '../Cart.css'
import { cities, townships } from '../data/townships'

import IconCart from './IconCart'

//分頁切換
import MyCartTest from '../test-components/MyCartTest'
import Address from '../test-components/Address'
import CreditForm from '../test-components/CreditForm'
import FinalCheck from '../FinalCheck'
import Completed from '../Completed'

//流程圖連結線外觀設定
const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 75,
    margin: '75px auto 0px',
    color: '#fcf5e9',
    fill: '#fcf5e9',
    maxWidth: '665px',
  },
  active: {
    '& $line': {
      backgroundColor: '#659de1',
      fill: '#659de1',
    },
  },
  completed: {
    '& $line': {
      backgroundColor: '#659de1',
      fill: '#659de1',
    },
  },
  line: {
    // width: '150px',
    height: 2,
    border: 0,
    backgroundColor: '#fcf5e9', //灰
    borderRadius: 1,
  },
})(StepConnector)

//icon 外觀設定:初始、當前、完成
const useColorlibStepIconStyles = makeStyles({
  root: {
    border: '2.5px solid #fcf5e9',
    margin: '60px auto 0px',
    zIndex: 1,
    width: '70px',
    height: '70px',
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fcf5e9',
    backgroundColor: '#ffffff',
  },
  active: {
    color: '#659de1', //icon填色
    border: '2.5px solid #659de1',
    fill: 'action',
    '& $label': {
      color: '#659de1',
    },
  },
  completed: {
    color: '#659de1',
    border: '2.5px solid #659de1',
    fill: '#659de1',
    label: {
      color: '#659de1',
    },
  },
})

//引入 svg icon圖
function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles()
  const { active, completed } = props

  const icons = {
    1: <IconCart />,
    2: (
      <SvgIcon alt="Address" viewBox="0 -31 512.00033 512">
        <path d="m128.621 134.599 222.768-95.506-92.24-37.893c-3.896-1.6-8.264-1.6-12.16 0l-221.545 91.013z" />
        <path d="m392.849 56.125-222.836 95.478 83.056 34.121 227.626-93.511z" />
        <path d="m237.069 213.746-90.147-37.033v70.118c0 8.836-7.164 16-16 16s-16-7.164-16-16v-83.264l-103.841-42.659v281.668c0 6.488 3.918 12.334 9.92 14.8l216.068 88.763z" />
        <path d="m269.069 213.746v292.393l216.068-88.763c6.002-2.465 9.92-8.312 9.92-14.8 0-10.766 0-269.883 0-281.668z" />
      </SvgIcon>
    ),
    3: (
      <SvgIcon alt="credit" viewBox="0 -31 512.00033 512">
        <g>
          <g>
            <path d="M426.6,68.3H51.2C22.9,68.3,0,91.2,0,119.5v34.1h477.8v-34.1C477.8,91.2,454.9,68.3,426.6,68.3z" />
          </g>
        </g>
        <g>
          <g>
            <path
              d="M0,256v102.4c0,28.3,22.9,51.2,51.2,51.2h375.5c28.3,0,51.2-22.9,51.2-51.2V256H0z M392.5,324.2h-68.3
c-9.4,0-17.1-7.6-17.1-17.1s7.6-17.1,17.1-17.1h68.3c9.4,0,17.1,7.6,17.1,17.1S401.9,324.2,392.5,324.2z"
            />
          </g>
        </g>
        <g>
          <g>
            <rect y="187.7" width="477.9" height="34.1" />
          </g>
        </g>
      </SvgIcon>
    ),
    4: (
      <SvgIcon alt="checkedPage" viewBox="0 -31 512.00033 512">
        <g>
          <g>
            <polygon points="482.182,67.907 196.748,386.672 27.576,225.852 0,254.861 199.059,444.093 512,94.607 		" />
          </g>
        </g>
      </SvgIcon>
    ),
  }

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  )
}

//判斷是否完成/當前頁面
ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
}

//全頁設定，有搭配 cart.css
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '60px auto 30px',
    width: '80%',
    maxWidth: '1200px',
    backgroundColor: '#F9F9F9',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      margin: '0px auto 0',
    },
  },
  button: {
    marginLeft: theme.spacing(1),
    color: '#ffffff',
    backgroundColor: '#0065B4',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

//步驟名稱
function getSteps() {
  return ['我的購物車', '收貨地址', '付款方式', '確認訂單']
}

export default function Steppers(props) {
  const {
    step1,
    setStep1,
    step2,
    setStep2,
    step3,
    setStep3,
    cateLabels,
    cateLabel,
    setCateLabel,
    price,
    setPrice,
    handleChange,
    count,
    setCount,
    handleStep2Change,
    step2Errors,
    setStep2Errors,
    handleStep3Change,
    handleInvalid,
    handleErrors,
    errors,
  } = props

  //下一步分頁傳遞
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <MyCartTest
            step1={step1}
            setStep1={setStep1}
            cateLabels={cateLabels}
            cateLabel={cateLabel}
            setCateLabel={setCateLabel}
            price={price}
            setPrice={setPrice}
            handleChange={handleChange}
            count={count}
            setCount={setCount}
          />
        )
      case 1:
        return (
          <Address
            step1={step1}
            step2={step2}
            setStep2={setStep2}
            handleStep2Change={handleStep2Change}
            step2Errors={step2Errors}
            setStep2Errors={setStep2Errors}
            errors={errors}
            cateLabels={cateLabels}
            cateLabel={cateLabel}
            setCateLabel={setCateLabel}
            price={price}
            setPrice={setPrice}
            handleChange={handleChange}
            count={count}
            setCount={setCount}
          />
        )
      case 2:
        return (
          <CreditForm
            step3={step3}
            setStep3={setStep3}
            handleStep3Change={handleStep3Change}
            errors={errors}
            step2={step2}
            step1={step1}
          />
        )
      case 3:
        return (
          <FinalCheck
            step1={step1}
            step2={step2}
            step3={step3}
            cateLabels={cateLabels}
            cateLabel={cateLabel}
            setCateLabel={setCateLabel}
            price={price}
            setPrice={setPrice}
            handleChange={handleChange}
            count={count}
            setCount={setCount}
          />
        )
      default:
        return (
          <MyCartTest
            step1={step1}
            setStep1={setStep1}
            cateLabels={cateLabels}
            cateLabel={cateLabel}
            setCateLabel={setCateLabel}
            price={price}
            setPrice={setPrice}
            handleChange={handleChange}
            count={count}
            setCount={setCount}
          />
        ) // 需加 lOGIN驗證頁
    }
  }

  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()

  const handleNext = () => {
    if (step1.length > 0) setActiveStep((prevActiveStep) => prevActiveStep + 1)
    // if (handleInvalid && activeStep === 1)
    //   setActiveStep((prevActiveStep) => prevActiveStep + 1)
    else setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = (e) => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  //重設
  // const handleReset = () => {
  //   setActiveStep(0)
  // }
  let itemTotal = step1.length
    ? step1
        .map((v, i) => {
          v.sPrice = step1[i].sPrice
          v.cartQty = step1[i].cartQty
          v.total = v.sPrice * v.cartQty
          // console.log(v.total)
          return v.total
        })
        .reduce((a, b) => a + b)
    : ''
  let discount = 1500 > itemTotal > 1000 ? '50' : itemTotal > 1500 ? '70' : '0'
  let shipping =
    step2.choose === '宅配' && itemTotal < 1000 && activeStep > 0
      ? 80
      : step2.choose === '超商取貨'
      ? 60
      : 0
  // const [subtotal, setSubtotal] = useState('')
  const subtotal = itemTotal - discount + shipping

  //表單送出
  async function handleSubmit(e) {
    e.preventDefault()
    let data = { orderList: [] }
    for (let item of step1) {
      const temp = {
        iId: item.iId,
        oListName: item.iName,
        // sName: item.sName,
        oListprice: item.sPrice || 1,
        oQty: item.cartQty || 1,
        // iImg: item.iImg,
        // total: item.cartQty * item.sPrice || 1,
      }
      console.log(temp)
      data.orderList.push(temp)
    }
    data.order = {
      oAddress:
        step2.country +
        cities[step2.city] +
        townships[step2.city][step2.township] +
        step2.street,
      oName: step2.name,
      oPhone: step2.phone,
      oMail: step2.email,
      cNum: step3.creditNum,
      oPrice: subtotal,
    }
    console.log(data)
    const url = 'http://localhost:7000/order/order'

    const request = new Request(url, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const dataRes = await response.json()
    console.log('伺服器回傳的json資料', dataRes)
  }
  return (
    <div className={classes.root}>
      <div>
        {activeStep === steps.length ? (
          <div>
            {/* 結帳完成頁 */}
            <Typography alternativeLabel className={classes.instructions}>
              <Completed />
            </Typography>
            {/* <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button> */}
          </div>
        ) : (
          <div>
            {/* 結帳流程圖 */}
            <Hidden xsDown>
              <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<ColorlibConnector />}
                className={classes.root}
              >
                {/* onClick流程圖回上一頁還有 bug(不能跳回指定那頁，只能返回第一頁) */}
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel
                      alternativeLabel={true}
                      StepIconComponent={ColorlibStepIcon}
                      className={classes.root}
                      disabled={activeStep === 0}
                      onClick={activeStep === 0 ? 'disabled' : handleBack}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Hidden>
            <Hidden smUp>
              <AppBar
                style={{
                  width: '100%',
                  height: '60px',
                  backgroundColor: '#0065B4',
                  position: 'sticky',
                  paddingTop: '8px',
                }}
              >
                <Toolbar>
                  <Button onClick={handleBack} style={{ padding: '0' }}>
                    <SvgIcon
                      style={{ fill: 'white', width: '20px' }}
                      viewBox="0 0 490.787 490.787"
                    >
                      <path
                        d="M362.671,490.787c-2.831,0.005-5.548-1.115-7.552-3.115L120.452,253.006
	c-4.164-4.165-4.164-10.917,0-15.083L355.119,3.256c4.093-4.237,10.845-4.354,15.083-0.262c4.237,4.093,4.354,10.845,0.262,15.083
	c-0.086,0.089-0.173,0.176-0.262,0.262L143.087,245.454l227.136,227.115c4.171,4.16,4.179,10.914,0.019,15.085
	C368.236,489.664,365.511,490.792,362.671,490.787z"
                      />
                      <path
                        d="M362.671,490.787c-2.831,0.005-5.548-1.115-7.552-3.115L120.452,253.006c-4.164-4.165-4.164-10.917,0-15.083L355.119,3.256
	c4.093-4.237,10.845-4.354,15.083-0.262c4.237,4.093,4.354,10.845,0.262,15.083c-0.086,0.089-0.173,0.176-0.262,0.262
	L143.087,245.454l227.136,227.115c4.171,4.16,4.179,10.914,0.019,15.085C368.236,489.664,365.511,490.792,362.671,490.787z"
                      />
                    </SvgIcon>
                  </Button>
                  <Typography>
                    {activeStep === steps.length - 1
                      ? '確認訂單'
                      : activeStep === 2
                      ? '選擇付款'
                      : activeStep === 1
                      ? '收貨地址'
                      : '我的購物車'}
                  </Typography>
                </Toolbar>
              </AppBar>
            </Hidden>

            <form
              onSubmit={handleSubmit}
              onChange={handleErrors}
              handleInvalid={handleSubmit}
            >
              {/* 購物車步驟內容 */}
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              {/* <input type="submit" /> */}
              {/* <AppBar
                position="fixed"
                style={{
                  top: 'auto',
                  bottom: 0,
                  backgroundColor: 'white',
                  maxWidth: '1200px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              > */}
              <Toolbar
                position="fixed"
                style={{
                  backgroundColor: 'white',
                  color: '#002875',

                  // maxWidth: '1200px',
                }}
              >
                <Grid
                  container
                  xs={12}
                  style={{
                    margin: '10px auto',
                    display: 'flex',
                    justifyContent: 'space-around',
                  }}
                >
                  <Grid item xs={2}>
                    <Typography>
                      <span className="h4">總金額:</span>
                    </Typography>
                  </Grid>
                  <Grid item md={8} sm={6} xs={5}>
                    <Typography>
                      <span name="subtotal"
                      className="h4"
                      >
                        NT$
                        {activeStep < steps.length - 1 && isNaN(itemTotal)
                          ? 0
                          : activeStep < steps.length - 1 && itemTotal === true
                          ? itemTotal
                          : subtotal}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid style={{ marginLeft: '0', margin: '15px 0' }}>
                    <Button
                      onChange={handleSubmit}
                      position="fixed"
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      onSubmit={() =>
                        (activeStep = steps.length ? handleSubmit() : '')
                      }
                      className={classes.button}
                      // disabled={
                      //   (activeStep === 0 && step1.length < 0) ||
                      //   isNaN(itemTotal)
                      // }
                      type={activeStep < steps.length - 1 ? 'button' : 'submit'}
                    >
                      {activeStep === steps.length - 1
                        ? '結帳'
                        : activeStep < 2
                        ? '下一頁'
                        : '確認訂單'}
                    </Button>
                  </Grid>
                </Grid>
              </Toolbar>
              {/* </AppBar> */}
            </form>
          </div>
        )}
      </div>
      {/* <pre>{JSON.stringify(step1, null, 2)}</pre>
      <pre>{JSON.stringify(step2, null, 2)}</pre>
      <pre>{JSON.stringify(step3, null, 2)}</pre> */}
    </div>
  )
}
