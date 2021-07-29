import React, { useEffect, useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Container from '@material-ui/core/Container'
import { MdClose } from 'react-icons/md'
import ShopDetailPage from './shopDetailPage'

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

function PartnersDetailPage(props) {
  const { open, setOpen, nowChooseShop, setNowChooseShop } = props
  console.log(open, open, nowChooseShop, setNowChooseShop)

  // hooks 構成Grid版面的主要資料源
  const [detailTextField, setDetailTextField] = useState([])
  const [detailLayoutsData, setDetailLayoutsData] = useState({})
  const [menuTextField, setMenuTextField] = useState([])
  const [menuLayoutsData, setMenuLayoutsData] = useState({})
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue)
  }

  useEffect(() => {
    if (open) {
      const detailText = JSON.parse(nowChooseShop.pDetailPageText)
      const detailLayouts = JSON.parse(nowChooseShop.pDetailPageLayout)
      const menuText = JSON.parse(nowChooseShop.pMenuPageText)
      const menuLayouts = JSON.parse(nowChooseShop.pMenuPageLayout)
      console.log(detailText, detailLayouts)
      console.log(menuText, menuLayouts)
      setDetailTextField(detailText)
      setDetailLayoutsData(detailLayouts)
      setMenuTextField(menuText)
      setMenuLayoutsData(menuLayouts)
    }
  }, [open])

  return (
    <>
      <Dialog fullWidth maxWidth="lg" open={open} paper>
        <Container
          style={{
            backgroundColor: '#f9f9f9',
            minHeight: '3rem',
            padding: '0',
            position: 'relative',
          }}
        >
          <Box
            style={{
              fontSize: '3rem',
              color: '#002875',
              textAlign: 'center',
              margin: '20px auto',
            }}
          >
            {nowChooseShop.pName}
          </Box>
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
              <Box
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                }}
              >
                <IconButton
                  onClick={() => {
                    setOpen(false)
                    setNowChooseShop({})
                  }}
                  aria-label="close"
                  style={{
                    color: '#002875',
                  }}
                >
                  <MdClose />
                </IconButton>
              </Box>
            </Tabs>
          </Paper>
          <TabPanel value={tabValue} index={0}>
            <ShopDetailPage
              textField={detailTextField}
              layoutsData={detailLayoutsData}
              setLayoutsData={setDetailLayoutsData}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ShopDetailPage
              textField={menuTextField}
              layoutsData={menuLayoutsData}
              setLayoutsData={setMenuLayoutsData}
            />
          </TabPanel>
        </Container>
      </Dialog>
    </>
  )
}

export default PartnersDetailPage
