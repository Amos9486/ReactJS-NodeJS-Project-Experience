import React from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import OptionCard from './partner-component/OptionCard'

const OuterGrid = styled(Grid)`
  max-width: 1200px;
  height: 50vw;
  margin: 0 auto;
`
const TitleGrid = styled(Grid)`
  background-color: #fcf5e9;
`
const AvatarPic = styled(CardMedia)`
  width: 10.9375vw;
  height: 10.9375vw;
  margin-right: 1.5625vw;
`
const TitleBox = styled(Box)`
  padding: 1.5625vw;
  box-sizing: border-box;
`

const cardInfo = [
  { title: '店家資訊', subTitle: '更新座標、地址、電話等基本資料', link: '' },
  {
    title: '專頁維護',
    subTitle: '修改專頁內容、菜單內容',
    link: '/partners/partners-edit',
  },
  { title: '原料批發', subTitle: '透過購物系統，以批發價購買原料', link: '' },
]

function PartnersMainPage() {
  return (
    <>
      <Box style={{ background: '#f9f9f9', marginTop: '120px' }}>
        <OuterGrid container alignContent="center">
          <TitleGrid container item sm={12}>
            <AvatarPic image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg" />

            <TitleBox>
              <Typography
                style={{ fontSize: '3rem', color: '#002875' }}
                gutterBottom
              >
                歡迎回來！ 墨丘利咖啡 - 大安店
              </Typography>
              <Typography style={{ fontSize: '1.5rem', color: '#0065b4' }}>
                請點選以下區塊進行相關的管理與維護操作
              </Typography>
            </TitleBox>
          </TitleGrid>
          <Grid container item sm={12} justify="space-around">
            {cardInfo.map((v, i) => (
              <OptionCard
                key={i}
                title={v.title}
                subTitle={v.subTitle}
                link={v.link}
              ></OptionCard>
            ))}
          </Grid>
        </OuterGrid>
      </Box>
    </>
  )
}

export default PartnersMainPage
