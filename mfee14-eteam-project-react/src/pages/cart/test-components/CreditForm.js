/**
 * 2. 3欄樣式、排版未完成
 * 3. 更新按鈕功能未完成
 * 4. 存取信用卡資料未完成(sql)
 *
 */
import {
  FormGroup,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Accordion,
  AccordionDetails,
  Typography,
  AccordionSummary,
  Grid,
  Hidden,
} from '@material-ui/core'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
// import './App.css'

//組件
import MyCartCheck from '../components/MyCartCheck'
import AddressCheck from '../components/AddressCheck'

//styled components
const CreditField = styled(FormGroup)`
  display: ${(props) => (props.primary ? 'block' : 'hidden')};
`
const validCreditNum = new RegExp(/\b(?:\d{4}[ -]?){3}(?=\d{4}\b)/)
function CreditForm(props) {
  const { step3, handleStep3Change, errors, step2, step1 } = props

  return (
    <>
      <div>
        {/* <img alt="收合icon" onClick={() => {}}></img> */}
        <Accordion style={{ margin: '20px auto' }}>
          <AccordionSummary
          style={{fontSize:'1.2rem', fontWeight:'700', paddingTop:'10px', margin:'-10px auto'}}
          >
            <h2>我的購物車</h2>
          </AccordionSummary>
          <AccordionDetails style={{ display: 'block' }}>
            {/* <Grid container> */}
            <MyCartCheck step1={step1} />
            {/* </Grid> */}
          </AccordionDetails>
        </Accordion>
      </div>

      <div>
        <Accordion
        
        >
          <AccordionSummary
          style={{fontSize:'1.2rem', fontWeight:'700', paddingTop:'10px', margin:'-10px auto'}}
          >
            <h2>收貨地址</h2>
          </AccordionSummary>
          <AccordionDetails >
            <AddressCheck step2={step2} 


            />
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="cartBody">
        <Hidden xsDown>
          <Grid item xs={12} style={{ color: '#002875' }}>
            <Typography
              style={{
                borderBottom: '1px solid #0065b4',
                width: '80%',
                margin: '0 auto 15px',
                fontSize:'1.2rem', fontWeight:'700'
              }}
              variant="subtitle1"
            >
              <h2>付款方式</h2>
            </Typography>
          </Grid>
        </Hidden>
        <RadioGroup
          value={step3.payment}
          name="payment"
          onChange={handleStep3Change}
        >
          <Accordion elevation={1}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              sm={12}
            >
              <FormControlLabel
                value="信用卡"
                name="payment"
                control={<Radio size="small" />}
                label="信用卡"
                labelPlacement="center"
                color="default"
                // size="small"
                onChange={handleStep3Change}
              />
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                <div className="inputName">
                  <label htmlFor="creditName">持卡人姓名</label>
                  <TextField
                    type="text"
                    placeholder="您的姓名"
                    name="creditName"
                    defaultValue={step3.creditName}
                    onChange={handleStep3Change}
                    onBlur={step3.creditName.length < 2}
                    helperText={
                      step3.creditName.length > 0 && errors.creditName
                        ? errors.creditName
                        : ''
                    }
                    required
                  ></TextField>
                </div>
              </FormGroup>

              <div className="inputName">
                <label htmlFor="creditNum">卡號</label>
                <TextField
                  input
                  type="text"
                  placeholder="XXXX XXXX XXXX XXXX"
                  name="creditNum"
                  defaultValue={step3.creditNum}
                  onChange={handleStep3Change}
                  onBlur={!validCreditNum.test(step3.creditNum)}
                  helperText={
                    step3.creditNum.length > 0 && errors.creditNum
                      ? errors.creditNum
                      : ''
                  }
                  inputProps={{ maxLength: 16 }}
                ></TextField>
              </div>
              <div className="inputName">
                <label htmlFor="validity">有效期限</label>
                <TextField
                  type="text"
                  placeholder="MM/YY"
                  name="validity"
                  defaultValue={step3.validity}
                  onChange={handleStep3Change}
                  onBlur={
                    !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(step3.validity)
                  }
                  helperText={
                    step3.validity.length > 0 && errors.validity
                      ? errors.validity
                      : ''
                  }
                ></TextField>
              </div>
              <div className="inputName">
                <label htmlFor="ccv">CCV</label>
                <TextField
                  input
                  type="text"
                  placeholder="123"
                  name="ccv"
                  maxLength="3"
                  minLength="3"
                  inputProps={{ pattern: /^\d{3}$/, maxLength: 3 }}
                  defaultValue={step3.ccv}
                  onChange={handleStep3Change}
                  onBlur={!/^\d{3}$/.test(step3.ccv)}
                  helperText={
                    step3.ccv.length > 0 && errors.ccv ? errors.ccv : ''
                  }
                ></TextField>
              </div>
              {/* <div class="inputName">
                <input type="checkbox" name="agree" />
                幫我記住聯絡資訊，下次使用
                <button
                  type="button"
                  onClick={(e) => {
                    document.getElementsByClassName('changeText').innerHtml =
                      '**' + step3.creditNum.slice(11, 16)
                  }}
                >
                  更新
                </button>
              </div>
              <Typography></Typography> */}
            </AccordionDetails>
          </Accordion>
          <Accordion elevation={1}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              sm={12}
            >
              <FormControlLabel
                value="行動支付"
                name="payment"
                control={<Radio size="small" />}
                label="行動支付"
                labelPlacement="center"
                color="default"
                // size="small"
                onChange={handleStep3Change}
              />
            </AccordionSummary>
          </Accordion>
          <Accordion elevation={1}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              sm={12}
            >
              <FormControlLabel
                value="貨到付款"
                name="payment"
                control={<Radio size="small" />}
                label="貨到付款"
                labelPlacement="center"
                color="default"
                // size="small"
                onChange={handleStep3Change}
              />
            </AccordionSummary>
          </Accordion>
        </RadioGroup>
      </div>
    </>
  )
}

export default CreditForm
