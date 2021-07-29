import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Box from '@material-ui/core/Box'
import Zoom from '@material-ui/core/Zoom'
import Fab from '@material-ui/core/Fab'
import ButtonBase from '@material-ui/core/ButtonBase'
import PartnersDetailPage from './partner-component/PartnersDetailPage'
import PartnersMainPage from './partner-component/PartnersMenuPage'
import { RiFileEditLine } from 'react-icons/ri'
import { MdClose } from 'react-icons/md'

const CloseBtn = styled(ButtonBase)`
  color: #002875;
  font-size: 2rem;
  margin: 13px;
`
const TabPanel = (props) => {
  const { children, value, index } = props
  return (
    <>
      {value === index && (
        <Box id={`tabpanel${index}`} hidden={value !== index}>
          {children}
        </Box>
      )}
    </>
  )
}

function PartnersEdit(props) {
  const [tabValue, setTabValue] = useState(0)
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [partnerData, setPartnerData] = useState({})
  const [detailTextField, setDetailTextField] = useState([]) // 構成Grid版面的主要資料源之一
  const [detailLayoutsData, setDetailLayoutsData] = useState({}) // 構成Grid版面的主要資料源之一
  const [menuTextField, setMenuTextField] = useState([]) // 構成Grid版面的主要資料源之一
  const [menuLayoutsData, setMenuLayoutsData] = useState({}) // 構成Grid版面的主要資料源之一

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue)
  }
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  // 後端相關function
  async function getDataFromServer() {
    // 開啟載入指示
    // setDataLoading(true)

    // 連接的伺服器資料網址
    const url = 'http://localhost:7000/partners/'

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url + '5', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log('伺服器回傳的json資料by read', data)

    // 設定資料
    setPartnerData(data)
    setDetailTextField(JSON.parse(data.pDetailPageText))
    setDetailLayoutsData(JSON.parse(data.pDetailPageLayout))
    setMenuTextField(JSON.parse(data.pMenuPageText))
    setMenuLayoutsData(JSON.parse(data.pMenuPageLayout))
  }

  useEffect(() => {
    getDataFromServer()
  }, [])

  return (
    <>
      <Container
        style={{
          backgroundColor: '#f9f9f9',
          minHeight: '50vw',
          padding: '0',
          position: 'relative',
          marginTop: '120px',
        }}
      >
        <Grid container justify="space-between">
          <Grid
            item
            sm={5}
            style={{
              fontSize: '3rem',
              color: '#002875',
              textAlign: 'center',
            }}
          >
            {partnerData.pName}
          </Grid>
          <Grid
            container
            item
            justify="center"
            sm={2}
            style={{
              height: '3rem',
            }}
          >
            <CloseBtn
              onClick={() => {
                props.history.push('/partners/partners-mainPage')
              }}
              aria-label="close"
              disableRipple={true}
            >
              <MdClose />
              CLOSE
            </CloseBtn>
          </Grid>
        </Grid>
        <Paper square>
          <Tabs
            value={tabValue}
            // 關於Tabs這個component的onChange：function(event: object, value: any) => void
            // event: The event source of the callback
            // value: We default to the index of the child (number)
            onChange={handleTabChange}
            indicatorColor="primary"
            centered
            style={{
              backgroundColor: '#fcf5e9',
            }}
          >
            <Tab
              label="店家專頁"
              style={{
                margin: '0 10%',
                color: '#002875',
                fontSize: '2rem',
              }}
            />
            <Tab
              label="店家菜單"
              style={{
                margin: '0 10%',
                color: '#002875',
                fontSize: '2rem',
              }}
            />
          </Tabs>
        </Paper>
        <TabPanel value={tabValue} index={0}>
          <PartnersDetailPage
            open={open}
            setOpen={setOpen}
            handleDrawerClose={handleDrawerClose}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            detailTextField={detailTextField}
            setTextField={setDetailTextField}
            detailLayoutsData={detailLayoutsData}
            setLayoutsData={setDetailLayoutsData}
            partnerData={partnerData}
          />
          <Zoom
            in={tabValue === 0}
            style={{
              transitionDelay: '100ms',
              position: 'absolute',
              top: '75px',
              right: '15px',
            }}
            unmountOnExit
          >
            <Fab size="small" color="primary" onClick={handleDrawerOpen}>
              <RiFileEditLine />
            </Fab>
          </Zoom>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <PartnersMainPage
            open={open}
            setOpen={setOpen}
            handleDrawerClose={handleDrawerClose}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            menuTextField={menuTextField}
            setTextField={setMenuTextField}
            menuLayoutsData={menuLayoutsData}
            setLayoutsData={setMenuLayoutsData}
            partnerData={partnerData}
          />
          <Zoom
            in={tabValue === 1}
            style={{
              transitionDelay: '100ms',
              position: 'absolute',
              top: '75px',
              right: '15px',
            }}
            unmountOnExit
          >
            <Fab size="small" color="primary" onClick={handleDrawerOpen}>
              <RiFileEditLine />
            </Fab>
          </Zoom>
        </TabPanel>
      </Container>
    </>
  )
}

export default withRouter(PartnersEdit)
