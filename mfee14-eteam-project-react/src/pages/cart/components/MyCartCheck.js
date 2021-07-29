import React from 'react'
import {
  TextField,
  MenuItem,
  makeStyles,
  Container,
  Grid,
  Hidden,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '150px',
    width: '100%',
  },
  image: {
    // width: 125,
    // height: 125,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '125px',
    maxHeight: '125px',
    marginRight: '-20px',
    marginLeft: '10px',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  iName: {
    margin: 'auto 35px',
    width:'70px'
  },
  td: {
    margin: 'auto 20px',
    width:'20px'
  },
  tdNT: {
    margin: 'auto 0PX',
    // width:'50px'
  },
}))

function MyCartCheck(props) {
  const classes = useStyles()

  const {
    step1,
    // setStep1,
    // cateLabels,
    // cateLabel,
    // setCateLabel,
    // price,
    // setPrice,
    // handleChange,
    // count,
    // setCount,
  } = props
  return (
    <>
      <Hidden xsDown>
        <Container>
          <div className="cart-thead">
            <div className="cart-th">商品圖片</div>
            <div className="cart-th">商品名稱</div>
            <div className="cart-th">規格</div>
            <div className="cart-th">商品數量</div>
            <div className="cart-th">商品價格</div>
            <div className="cart-th">總價</div>
          </div>
        </Container>
      </Hidden>

        {step1.map((v, i) => {
          v.iId = step1[i].iId
          v.iName = step1[i].iName
          v.iImg = step1[i].iImg
          v.sName = step1[i].sName
          v.cartQty = step1[i].cartQty
          v.sPrice = step1[i].sPrice
          v.total = v.cartQty * v.sPrice
          return (
      <Container className="item-card">
            <Grid
              item
              key={i}
              value={i}
              style={{
                width: '95%',
                display: 'flex',
                // alignSelf:'center',
                justifyContent: 'space-between',
              }}
            >
              <div className="item-td">
                {/* input id rwd作用 */}
                <input type="hidden" key={i} className="cartId" value={v.iId} />
                <img
                  src={`http://localhost:3000/img/index/generalproduct/${v.iImg}`}
                  alt="商品圖片"
                  className={classes.img}
                />
              </div>
              <div key={i} value={i} className={classes.iName}>
                {v.iName}
              </div>
              <div className={classes.td}>
                {/* <TextField
                    select
                    value={v.cateLabel}
                    key={i}
                    onChange={v.handleChange}
                  >
                    {cateLabels.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField> */}
                {v.sName}
              </div>
              <td className={classes.td}>{v.cartQty}</td>
              <td className={classes.tdNT}>NT$ {v.sPrice}</td>
              <td className={classes.tdNT}>NT$ {v.total}</td>
              {/* <td colSpan="2" className="item-td">
                  <button className="outlineChoose" onClick={(e) => {}}>
                    下次再買
                  </button>
                  <button className="outlineChoose">X</button>
                </td> */}
            </Grid>
      </Container>

          )
        })}
    </>
  )
}
export default MyCartCheck
