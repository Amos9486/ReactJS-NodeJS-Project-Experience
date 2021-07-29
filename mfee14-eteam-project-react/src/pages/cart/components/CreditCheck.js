import React from 'react'
import { Grid, Paper, makeStyles, Hidden, Typography } from '@material-ui/core'
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
function CreditCheck(props) {
  const classes = useStyles()

  const { step3 } = props
  return (
    <>
      <div className="cartBody forPhone">
        <Grid container spacing={3}>
          <Grid item xs={12}>
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
            <Paper elevation={0} className={classes.paper}>
              <h3>{step3.payment}</h3>
              <h3>xx{step3.creditNum.slice(11, 16)}</h3>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default CreditCheck
