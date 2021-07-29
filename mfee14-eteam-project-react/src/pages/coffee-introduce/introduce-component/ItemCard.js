import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const IntroduceCard = styled(Card)`
  width: 15.625vw;
  height: 32.8152vw;
  margin-top: 30px;
  background-color: #fcf5e980;
  transition: 0.5s;
  &:hover {
    margin-top: -25vw;
  }
  color: #0065b4;
`
const MoreInfoBtn = styled(Button)`
  width: 80px;
  height: 29px;
  border: 1px solid #0065b4;
  border-radius: 0;
  background-color: transparent;
  color: #0065b4;
`
const ItemGrid = styled(Grid)`
  padding: 1vw;
  height: 23.81%;
  box-sizing: border-Box;
`

function ItemCard(props) {
  const { item } = props

  return (
    <IntroduceCard square>
      <CardMedia
        component="img"
        height="76.19%"
        image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
      />
      <ItemGrid container direction="column" justify="space-between">
        <Grid item>
          <Typography gutterBottom style={{ fontSize: '1.25rem' }}>
            {item.iName}
          </Typography>
          <Typography gutterBottom style={{ fontSize: '0.875rem' }}>
            ${item.iPrice}
          </Typography>
        </Grid>
        <Grid item>
          <MoreInfoBtn size="small" color="primary">
            More
          </MoreInfoBtn>
        </Grid>
      </ItemGrid>
    </IntroduceCard>
  )
}

export default ItemCard
