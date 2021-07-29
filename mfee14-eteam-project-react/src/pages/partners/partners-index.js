import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

const LoginGrid = styled(Grid)`
  width: 100%;
  height: 50vw;
  padding: 7vw;
  background-color: #f9f9f9;
  box-sizing: border-box;
  color: #0065b4;
`
const LoginBgBox = styled(Box)`
  width: 100%;
  height: 50vw;
  background-color: #fcf5e9;
  box-sizing: border-box;
`
const MainTitleBox = styled(Box)`
  font-size: 3.75rem;
  color: #002875;
`
const SubTitleBox = styled(Box)`
  font-size: 1.5rem;
  margin-top: 1vw;
`
const LoginInput = styled(Input)`
  width: 100%;
  color: #0065b4;
  font-size: 2.125rem;
`
const LoginBtn = styled(Button)`
  width: 50%;
  height: 4.48vw;
  color: #002875;
  font-size: 1.5rem;
  border-color: #002875;
  border-style: solid;
  border-radius: 0;
`
const JoinTextBox = styled(Box)`
  font-size: 1.5rem;
  margin-top: 2vw;
`

function PartnersIndex(props) {
  return (
    <>
      <Grid container style={{ marginTop: '120px' }}>
        <LoginGrid container item sm={5}>
          <form style={{ width: '100%', height: '100%' }}>
            <Grid
              container
              item
              sm={12}
              direction="column"
              justify="space-between"
              style={{ height: '100%' }}
            >
              <Grid container item direction="column">
                <MainTitleBox>歡迎回來，朋友</MainTitleBox>
                <SubTitleBox>
                  為了更新您的服務據點資訊，請先登入本系統
                </SubTitleBox>
              </Grid>
              <Grid container item>
                <LoginInput placeholder="Account"></LoginInput>
              </Grid>
              <Grid container item>
                <LoginInput type="password" placeholder="Password"></LoginInput>
              </Grid>
              <Grid container item width="100%">
                <LoginBtn
                  variant="outlined"
                  onClick={() => {
                    props.history.push('/partners/partners-mainPage')
                  }}
                >
                  登入
                </LoginBtn>
                <LoginBtn style={{ color: '#659de1' }}>忘記密碼</LoginBtn>
                <JoinTextBox>
                  想成為我們的合作夥伴嗎？請參閱
                  <Link style={{ color: '#ff5554' }}>關於我們</Link>
                </JoinTextBox>
              </Grid>
            </Grid>
          </form>
        </LoginGrid>
        <Grid container item sm={7}>
          <LoginBgBox></LoginBgBox>
        </Grid>
      </Grid>
    </>
  )
}

export default withRouter(PartnersIndex)
