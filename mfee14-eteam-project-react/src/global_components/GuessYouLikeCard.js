import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'

function GuessYouLikeCard(props) {
  const { setStep1 } = props
  // const [itemsArr, setItemsArr] = useState([])
  // 後端相關function：加入或更新購物車
  async function getCartData(iId, cartQty) {
    // 連接的伺服器資料網址
    const url = `http://localhost:7000/cart/session?iId=${iId}&cartQty=1`


    // const url = 'http://localhost:7000/cart/session?iId=3&cartQty=1'

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      credentials: 'include',
      method: 'GET', //GET不能接body
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log('伺服器回傳的json資料by read，猜你喜歡', data)
    setStep1(data.cart)
    // console.log(step1)
  }

  useEffect(() => {
    getCartData()
  }, [])
  return (
    <>
      <Card square width="200px">
        <CardActionArea
          onClick={() => {
            props.history.push(`/items/info/${props.product.iId}`)
          }}
        >
          <CardMedia
            height="200px"
            component="img"
            image={`http://localhost:3000/img/index/generalproduct/${props.product.iImg}`}
            title="GuessYouLikeCard"
          />

          <p>{props.product.iName}</p>
          <p>{props.product.iPrice}</p>
        </CardActionArea>

        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => getCartData(props.product.iId)}
          >
            加入購物車
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

export default withRouter(GuessYouLikeCard)
