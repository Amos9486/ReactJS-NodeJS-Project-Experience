import React from 'react'
import { Grid, Paper, makeStyles, Hidden, Typography } from '@material-ui/core'

//組件
import MyCartCheck from './components/MyCartCheck'
import AddressCheck from './components/AddressCheck'
import CreditCheck from './components/CreditCheck'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    width: '80%',
    padding: theme.spacing(1),
    textAlign: 'right',
    color: '#002875',
    // display: 'flex',
    // justifyContent: 'space-between',
    // padding:'0 50px'
  },
  p: {
    textAlign: 'right',
  },
}))
function FinalCheck(props) {
  const classes = useStyles()

  const {
    step1,
    setStep1,
    cateLabels,
    cateLabel,
    setCateLabel,
    price,
    setPrice,
    handleChange,
    count,
    setCount,
    step2,
    step3,
  } = props
  let itemTotal = step1
    .map((v, i) => {
      v.sPrice = step1[i].sPrice
      v.cartQty = step1[i].cartQty
      v.total = v.sPrice * v.cartQty
      // console.log(v.total)
      return v.total
    })
    .reduce((a, b) => a + b)
  let discount = 1500 > itemTotal > 1000 ? '50' : itemTotal > 1500 ? '70' : '0'
  let shipping =
    step2.choose === '宅配' && itemTotal < 1000
      ? 80
      : step2.choose === '宅配' && itemTotal > 1000
      ? 0
      : 60

  return (
    <>
      <div className="cartBody dropDown">
        <h2
        style={{fontSize:'1.2rem', fontWeight:'700'}}
        >我的購物車</h2>
        <MyCartCheck
          step1={step1}
          setStep1={setStep1}
          count={count}
          setCount={setCount}
          cateLabel={cateLabel}
          setCategory={setCateLabel}
          handleChange={handleChange}
          price={price}
          setPrice={setPrice}
          cateLabels={cateLabels}
        />
      </div>
      <div className="cartBody">
        <Typography
          style={{
            borderBottom: '1px solid #0065b4',
            width: '80%',
            margin: '0 auto 15px',
            fontSize:'1.2rem', fontWeight:'700'
          }}
          variant="subtitle1"
        >
          <h2>收貨地址</h2>
        </Typography>
        <AddressCheck step2={step2} />
      </div>
      <CreditCheck step3={step3} />
      <div className="cartBody forPhone">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={0} className={classes.paper}>
              <Grid item>
                <Typography
                style={{margin:'5px auto'}}
                >
                  <span className={classes.p}>商品小計 </span>
                  <span>
                    NT$  
                    {itemTotal}
                  </span>
                </Typography>
              </Grid>
              <Grid item
              >
                <span>折扣減免</span>
                <span> -NT$ {discount}</span>
              </Grid>
              <Grid item xs={12}
              style={{margin:'5px auto'}}
              
              >
                <div
                style={{fontSize:'0.4rem',margin:'5px auto'}}
                >
                  {1500 > itemTotal > 1000
                    ? '(居家防疫來點消費: －50)'
                    : itemTotal > 1500
                    ? '(刺激經濟你我做起: －70)'
                    : ''}
                </div>
              </Grid>
              <div>
                <span>運費</span>
                <span>NT$ {shipping}</span>
                <small
                 style={{fontSize:'0.4rem',margin:'5px auto'}}
                >
                  {step2.choose === '宅配' && itemTotal > 1000
                    ? '(滿千免運)'
                    : ''}
                </small>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  )
}
export default FinalCheck
