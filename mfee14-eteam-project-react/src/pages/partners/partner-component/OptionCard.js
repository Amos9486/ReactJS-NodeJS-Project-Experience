import React from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'

const IntroduceCard = styled(Card)`
  width: 18.75vw;
  height: 25vw;
  margin-top: 4.6875vw;
  &:hover {
    transition: 0.5s;
    transform: scale(1.2, 1.2);
  }
`
const MainCardActionArea = styled(CardActionArea)`
  &:hover {
    transition: 0.5s;
    background-color: #00287580;
  }
`
const TitleGrid = styled(Grid)`
  height: 25vw;
  padding: 30px;
  box-sizing: border-box;
  color: #f9f9f9;
`
const MainTitle = styled(Grid)`
  font-size: 2.125rem;
`
const SubTitle = styled(Grid)`
  font-size: 1rem;
  margin-top: 1vw;
`
function OptionCard(props) {
  const { title, subTitle, link } = props
  return (
    <IntroduceCard
      square
      onClick={() => {
        props.history.push(link)
      }}
    >
      <CardMedia
        component="img"
        height="100%"
        image="https://images.unsplash.com/photo-1519810755548-39cd217da494?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
      />
      <MainCardActionArea style={{ height: '25vw', marginTop: '-25vw' }}>
        <CardContent style={{ padding: '0px' }}>
          <TitleGrid container direction="column" justify="flex-end">
            <MainTitle>{title}</MainTitle>
            <SubTitle>{subTitle}</SubTitle>
          </TitleGrid>
        </CardContent>
      </MainCardActionArea>
    </IntroduceCard>
  )
}

export default withRouter(OptionCard)
