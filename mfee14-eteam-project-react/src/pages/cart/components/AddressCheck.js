import React from 'react'
// import styled from 'styled-components'
import { cities, townships } from '../data/townships'
import { Grid, Paper, makeStyles, Hidden } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: '#002875',
    display: 'flex',
    justifyContent: 'space-around',
  },
  p: {
    textAlign: 'right',
  },
}))
function AddressCheck(props) {
  const classes = useStyles()
  const {
    step2,
    // setStep2,
    // handleStep2Change,
    // step2Errors,
    // register,
    // setStep2Errors,
  } = props
  return (
    <>
      {/* <div className="cartBody"> */}
      {/* <h2>收貨地址</h2> */}

      <Grid container spacing={3}>
        <Hidden smDown>
          <div className="titleLine"></div>
        </Hidden>
        <Grid item sm={5} xs={12}>
          <Paper elevation={0} className={classes.paper}>
            <Grid className="address">
              <span className="h4">{step2.choose}</span>
              {step2.country === -1 || step2.township === -1 ? (
                ''
              ) : (
                <p>
                  {step2.country}
                  {cities[step2.city]}
                  {townships[step2.city][step2.township]}
                  {step2.street}
                </p>
              )}
            </Grid>
          </Paper>
        </Grid>
        <Grid item sm={5} xs={12}>
          <Paper elevation={0} className={classes.paper}>
            <Grid className="contactInfo">
              <span className="h4">聯絡方式</span>
              <div>
                <p>{step2.name}</p>
                <p>{step2.phone}</p>
                <p>{step2.email}</p>
              </div>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* </div> */}
    </>
  )
}

export default AddressCheck
