import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

const ItemCard = styled(Card)`
  width: ${(props) => (props.big ? '576px' : '280px')};
`

function ProductCard(props) {
  return (
    <ItemCard square big={props.big}>
      <CardActionArea
        onClick={() => {
          props.history.push(`/items/info/${props.product.iId}`)
        }}
      >
        <CardMedia
          height="350px"
          component="img"
          image="http://localhost:3000/index/items1.jpg"
          title="ProductCard"
        />

        <p style={{ fontSize: '16px', marginLeft: '15px' }}>
          {props.product.iName}
        </p>
        <p style={{ fontSize: '25px', marginLeft: '15px' }}>$700</p>
      </CardActionArea>

      <CardActions>
        <Button size="small" color="primary">
          加入購物車
        </Button>
      </CardActions>
    </ItemCard>
  )
}

export default withRouter(ProductCard)
