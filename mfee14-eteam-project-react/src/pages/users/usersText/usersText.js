import React, { useState, useEffect } from 'react'

import { Link, withRouter } from 'react-router-dom'
// withRouter功用是把URL params注入到元件的props.params裡。URL params再也不用一層層往下傳，只要在需要用到的那一層元件，透過enhancer注入props即可。

import './usersText.css'

import '../usersDiscountCanUse/usersDiscountCanUse.css'

import $ from 'jquery'

import UsersTitle from '../components/usersTitle'

// 測試對話框(全屏) Dialog  material-ui
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

// 測試對話框(全屏)
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}))
// 測試對話框(全屏)
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

// import Test4 from ''
// import Test4 from '../img/'+ users.uImg
// 2021-07-18Test4.jpg
function UsersText(props) {
  // 初始狀態設定
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [openReadCredit, setOpenReadCredit] = useState(false)
  const [openAddCredit, setOpenAddCredit] = useState(false)
  const [openEditCredit, setOpenEditCredit] = useState(false)
  const [users, setUsers] = useState([])
  const [dataLoading, setDataLoading] = useState(false)
  const [discountToUse, setDiscountToUse] = useState('')
  const [discountNotToUse, setDiscountNotToUse] = useState('')
  // 編輯信用卡
  const [credit, setCredit] = useState('')
  const [creditEdit, setCreditEdit] = useState('')

  const [inputs, setInputs] = useState({
    cName: '',
    cNum: '',
    cExp: '',
    cCCV: '',
  })

  const onChangeForInput = (InputName) => (e) => {
    setInputs((state) => ({
      ...state,
      [InputName]: e.target.value,
    }))
  }

  // 因為有用 token 所以改用post功能(fetch)
  async function getUserToServer() {
    setDataLoading(true)
    const token = localStorage.getItem('token')

    const url = `${process.env.REACT_APP_USERSURL}/usersText/`
    const req = new Request(url, {
      method: 'post',
      body: JSON.stringify({ token }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log('伺服器回傳資料:', data)

    // 改變原狀態，把取得的資料加入
    setUsers(data)
  }

  // 尚未使用
  async function canUseDiscountToServer() {
    setDataLoading(true)
    const token = localStorage.getItem('token')

    const url = `${process.env.REACT_APP_USERSURL}/usersDiscountCanUse/`
    const req = new Request(url, {
      method: 'post',
      body: JSON.stringify({ token }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log('伺服器回傳資料:', data)

    // 改變原狀態，把取得的資料加入
    setDiscountToUse(data)
  }

  // 開啟彈窗(未使用)
  const handleClickOpen = () => {
    setOpen(true)
  }

  // 關閉彈窗(未使用)
  const handleClose = () => {
    setOpen(false)
  }

  // 已使用
  async function notCanUseDiscountToServer() {
    setDataLoading(true)
    const token = localStorage.getItem('token')

    const url = `${process.env.REACT_APP_USERSURL}/usersDiscountNotCanUse/`
    const req = new Request(url, {
      method: 'post',
      body: JSON.stringify({ token }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log('伺服器回傳資料:', data)

    // 改變原狀態，把取得的資料加入
    setDiscountNotToUse(data)
  }

  // 開啟彈窗(已使用)
  const handleClickOpen1 = () => {
    setOpen1(true)
  }

  // 關閉彈窗(已使用)
  const handleClose1 = () => {
    setOpen1(false)
  }
  // 讀取信用卡(多筆資料)
  async function getUserCreditCardToServer() {
    setDataLoading(true)
    const token = localStorage.getItem('token')

    const url = `${process.env.REACT_APP_USERSURL}/usersCreditCard/`
    const req = new Request(url, {
      method: 'post',
      body: JSON.stringify({ token }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log('伺服器回傳資料 讀取信用卡資料:', data)

    // 改變原狀態，把取得的資料加入
    setCredit(data)
  }
  // 刪除信用卡
  async function deleteUserCreditCardToServer(cId) {
    setDataLoading(true)

    const token = localStorage.getItem('token')
    const url = `${process.env.REACT_APP_USERSURL}/usersDeleteCreditCard/` + cId

    const req = new Request(url, {
      method: 'delete',
      body: JSON.stringify({ token, cId }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log('伺服器回傳資料:', data)

    setTimeout(() => {
      setDataLoading(false)
      if (data !== false) {
        // setCredit(data)
        alert('刪除完成')
        window.location.reload()
      } else {
        alert('刪除失敗')
        props.history.push('/usersText')
      }
    }, 1000)
  }

  // 開啟彈窗(讀取信用卡)
  const handleClickOpenReadCredit = () => {
    setOpenReadCredit(true)
  }

  // 關閉彈窗(讀取信用卡)
  const handleCloseReadCredit = () => {
    setOpenReadCredit(false)
  }

  // 新增信用卡
  async function postUserCreditCardToServer() {
    // 開啟載入指示
    setDataLoading(true)
    // 找uId
    console.log(props)
    // 取token 內的 uId
    const token = localStorage.getItem('token')
    // 取得使用者輸入的值
    const newData = { ...inputs, token }
    // console.log(newData)
    // 連接的伺服器資料網址
    const url = `${process.env.REACT_APP_USERSURL}/usersCreditCardAdd/`
    // 注意資料格式要設定，伺服器才知道是json格式
    const req = new Request(url, {
      method: 'post',
      body: JSON.stringify(newData),
      // cross origin 傳送 cookie
      // credentials: 'include',
      // 預先告訴伺服器  等等要傳的資料為json 格式
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const res = await fetch(req)
    const data = await res.json()

    console.log('伺服器回傳資料:', data)

    setTimeout(() => {
      // 關閉指示器
      setDataLoading(false)
      if (data !== false) {
        setInputs(data)
        alert('新增成功')
        // setOpenAddCredit(false)
        window.location.reload()
        // props.history.push('/usersCreditCard')
      } else {
        alert('新增失敗')
        // props.history.push('/usersText')
        // props.history.push('/usersCreditCardAdd')
      }
    }, 1000)
  }

  // 開啟彈窗(新增信用卡)
  const handleClickOpenAddCredit = () => {
    setOpenAddCredit(true)
  }

  // 關閉彈窗(新增信用卡)
  const handleCloseAddCredit = () => {
    setOpenAddCredit(false)
  }

  // 編輯信用卡 顯示功能(單筆資料)
  async function getUserEditCreditCardToServer(cId) {
    setDataLoading(true)
    // console.log('找cId', props)
    // const cIdPathname = props.location.pathname
    // const cId = cIdPathname.slice(21)
    const token = localStorage.getItem('token')

    const url = `${process.env.REACT_APP_USERSURL}/usersCreditCardReadSingle/`
    const req = new Request(url, {
      method: 'post',
      body: JSON.stringify({ token, cId }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log('編輯信用卡 顯示功能(單筆資料):', data)

    // 改變原狀態，把取得的資料加入
    setCreditEdit(data)
  }

  // 編輯信用卡 編輯功能
  async function putUserCreditCardToServer(cId) {
    setDataLoading(true)
    // const token = localStorage.getItem('token')
    // 取得使用者輸入的值
    // const cIdPathname = props.location.pathname
    // const cId = cIdPathname.slice(21)

    const newData = { ...inputs, cId }

    const url = `${process.env.REACT_APP_USERSURL}/usersCreditCardEdit/`

    const req = new Request(url, {
      method: 'put',
      body: JSON.stringify(newData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const res = await fetch(req)
    const data = await res.json()

    console.log('伺服器put回傳資料:', data)

    setTimeout(() => {
      setDataLoading(false)
      if (data !== false) {
        setInputs(data)
        alert('編輯完成')
        window.location.reload()
        // props.history.push('/usersCreditCard')
      } else {
        alert('編輯失敗')
        // props.history.push('/usersText')
      }
    }, 1000)
  }
  // ******e.currentTarget.id 全域物件event的方法******
  // e.Target.id 區域物件event的方法

  // 開啟彈窗(編輯信用卡)
  const handleClickOpenEditCredit = (e) => {
    setOpenEditCredit(true)
    getUserEditCreditCardToServer(e.currentTarget.id)
    setDataLoading(false)
    // props.history.push(`/usersText/${v.cId}`)
  }

  // 關閉彈窗(編輯信用卡)
  const handleCloseEditCredit = () => {
    setOpenEditCredit(false)
  }

  // const checkToken = () => {
  //   if (!localStorage.token) {
  //     alert('請先行登入')
  //     props.history.push('/usersLogin')
  //   }
  // }

  // 生命週期
  // 一開始載入資料(componentDidMount 代表元件”已經”出現在網⾴上，這個⽅法中可以使⽤直接DOM處理，或向伺服器要初始化資料的JS程式碼)

  // 驗證token 是否存在，若存在才顯示畫面
  useEffect(() => {
    if (localStorage.token) {
      getUserToServer()
      canUseDiscountToServer()
      notCanUseDiscountToServer()
      getUserCreditCardToServer()
    } else {
      alert('請先行登入')
      props.history.push('/usersLogin')
    }
  }, [])

  // background 轉換顏色功能
  // setAttribute 更改屬性
  useEffect(() => {
    // const usersTextStar = document.querySelector('.usersTextStar')
    // const boxOriginalColor = usersTextStar.className('background-color')

    // const usersTextDot1 = document.querySelector('#usersTextDot1')
    // const usersTextDot2 = document.querySelector('#usersTextDot2')
    // const usersTextDot3 = document.querySelector('#usersTextDot3')

    // usersTextStar.addEventListener('click', () => {
    //   console.log('hi')
    // if (usersTextStar.className('background-color') === '') {
    //   usersTextStar.className({
    //     background: '#245363',
    //     left: '155px',
    //     transform: 'rotate(360deg)',
    //   })
    //   usersTextDot1.className('width', '25px')
    //   usersTextDot2.className('width', '15px')
    //   usersTextDot3.className('width', '12px')
    // }
    // })

    // jquery
    const boxOriginalColor = $('.usersTextStar').css('background-color')

    $('.usersTextOutside').click(() => {
      if ($('.usersTextStar').css('background-color') === boxOriginalColor) {
        // console.log('hi')
        $('.usersTextStar').css({
          background: '#245363',
          left: '155px',
          transform: 'rotate(360deg)',
        })
        $('#usersTextDot1').css('width', '25px')
        $('#usersTextDot2').css('width', '15px')
        $('#usersTextDot3').css('width', '12px')
        $('.memberBg').css({
          background: '#0065b4',
          color: '#fcf5e9',
        })
        // jq 吃不到
        // $('#memberCard').css({
        //   background: '#O02875',
        // })
        // $('usersTextBtn').css({
        //   background: '#f9f9f9',
        //   color: '#0065b4',
        // })
      } else {
        // console.log('hi2')
        $('.usersTextStar').css({
          background: '#ffe179',
          left: '5px',
          transform: 'rotate(0deg)',
        })
        $('#usersTextDot1').css('width', '20px')
        $('#usersTextDot2').css('width', '10px')
        $('#usersTextDot3').css('width', '6px')
        $('.memberBg').css({
          background: '#fcf5e9',
          color: '#0065b4',
        })
      }
    })
  }, [])

  // scrollTop 淡入淡出
  useEffect(() => {
    $(window).scroll(function () {
      let scrolltop = $(this).scrollTop()
      //console.log(scrolltop);
      let windowheight = $(window).height()
      //為可視範圍console.log(windowheight);
      let websideheight = $('body').height()
      //console.log(websideheight);
      let persent1 = Math.floor(
        (scrolltop / (websideheight - windowheight)) * 100
      )
      // console.log(persent1) //等於 scrolltop/scrolltop

      if (persent1 >= 10) {
        $('.memberTextOutput').css('transition', '0.5s').css('opacity', '1')
      } else {
        $('.memberTextOutput').css('opacity', '10%')
      }
    })
  }, [])

  //componentDidUpdate 代表元件”已經”更新完成(真實DOM)，這個⽅法中可以得到最後更新的狀態值 (只有State更新，或接收到新的props
  useEffect(() => {
    setTimeout(() => {
      setDataLoading(false)
    }, 1000)
  }, [users, credit, inputs])

  const loading = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )

  const display = (
    <>
      <div className="memberTextOutput memberBg">
        {/* 背景顏色轉換 */}
        <div className="usersTextOutside">
          <div className="usersTextStar">
            <div className="usersTextDot" id="usersTextDot1"></div>
            <div className="usersTextDot" id="usersTextDot2"></div>
            <div className="usersTextDot" id="usersTextDot3"></div>
          </div>
        </div>
        <div className="memberTextL">
          {/* <img src={Test4} alt="" /> */}
          {/* <img src="../img/2021-07-18Test4.jpg" alt="" /> */}

          <div className="usersTextImg">
            <img
              // 圖片資料夾要放在public裡面
              // 前端存圖片路徑
              // src={`http://localhost:3000/img/users/${users.uImg}`}
              // 後端存圖片的路徑
              // 若取出的值為陣列 users.length > 0 && users[0].iImg
              // 若取出的值為物件 users.iImg
              src={`http://localhost:7000/img/${users.uImg}`}
              alt="123"
            />
          </div>
          <div id="memberCard" className="memberCard">
            <div className="memberCardL">
              <div>性別</div>
              <div>暱稱</div>
              <div>興趣</div>
            </div>

            <div className="memberCardR">
              <div>{users.uGender}</div>
              <div>{users.uNickname}</div>
              <div>{users.uHobby}</div>
            </div>
          </div>

          {/* 信用卡資訊 */}

          <div className="creditCardOutButton">
            <button
              className="usersTextBtn2"
              variant="outlined"
              color="primary"
              onClick={handleClickOpenReadCredit}
            >
              信用卡資訊
            </button>
            <Dialog
              fullScreen
              open={openReadCredit}
              onClose={handleCloseReadCredit}
              TransitionComponent={Transition}
            >
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleCloseReadCredit}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    信用卡資訊
                  </Typography>
                </Toolbar>
              </AppBar>
              <List>
                <ListItem button>
                  {/* <ListItemText primary="Phone ringtone" secondary="Titania" /> */}
                  <div className="usersCreaditCardTitle">
                    <div class="usersCreaditCardTitleIn">
                      <div>持卡人(英文)</div>
                      <div>卡號</div>
                      <div>有效期限</div>
                      <div>驗證碼</div>
                    </div>
                  </div>
                </ListItem>
                <Divider />

                {/* <ListItemText
                    primary="Default notification ringtone"
                    secondary="Tethys"
                  /> */}
                {credit.length &&
                  credit.map((v) => {
                    return (
                      <ListItem button>
                        <div className="usersCreaditCardText" key={v.cId}>
                          <div class="usersCreaditCardTextIn">
                            <div className="usersCreaditCardName">
                              {v.cName}
                            </div>
                            <div className="usersCreaditCardNumber">
                              {v.cNum}
                            </div>
                            <div className="usersCreaditCardExp">{v.cExp}</div>
                            <div className="usersCreaditCardPwd">{v.cCCV}</div>
                          </div>
                          {/* 刪除信用卡 */}
                          <div className="usersCreaditCardIcon">
                            <IconButton
                              edge="start"
                              color="inherit"
                              onClick={() => {
                                deleteUserCreditCardToServer(v.cId)
                              }}
                              aria-label="close"
                            >
                              <CloseIcon />
                            </IconButton>
                            {/* <Link
                              to=""
                              onClick={() => {
                                deleteUserCreditCardToServer(v.cId)
                              }}
                            >
                              X
                            </Link> */}
                          </div>
                          {/* 編輯信用卡 */}
                          <div className="usersCreaditCardBtn">
                            <div class="usersCreaditCardEditBtnEdit">
                              <button
                                className="usersTextBtn3"
                                autoFocus
                                color="inherit"
                                onClick={handleClickOpenEditCredit}
                                // onClick={(e) => {
                                //   console.log(e.currentTarget.id)
                                // }}
                                id={v.cId}
                              >
                                編輯
                              </button>
                            </div>
                            <div>
                              <Dialog
                                fullScreen
                                open={openEditCredit}
                                onClose={handleCloseEditCredit}
                                TransitionComponent={Transition}
                              >
                                <AppBar className={classes.appBar}>
                                  <Toolbar>
                                    <IconButton
                                      edge="start"
                                      color="inherit"
                                      onClick={handleCloseEditCredit}
                                      aria-label="close"
                                    >
                                      <CloseIcon />
                                    </IconButton>
                                    <Typography
                                      variant="h6"
                                      className={classes.title}
                                    >
                                      編輯信用卡
                                    </Typography>
                                  </Toolbar>
                                </AppBar>
                                <List>
                                  <ListItem button>
                                    <div className="usersCreaditCardEditTitle">
                                      <div>持卡人姓名(英文)</div>
                                      <div>卡號(請直接輸入數字)</div>
                                      <div>有效期限</div>
                                      <div>驗證碼</div>
                                    </div>
                                  </ListItem>
                                  <Divider />

                                  <ListItem button>
                                    <div className="usersCreaditCardEditText">
                                      <div className="usersCreaditCardEditInp">
                                        <input
                                          className="usersCreditEditInpCname"
                                          name="cName"
                                          type="text"
                                          placeholder={
                                            '原設定的持卡人姓名:' +
                                            creditEdit.cName
                                          }
                                          value={inputs.cName}
                                          onChange={onChangeForInput('cName')}
                                        />
                                      </div>
                                      <div className="usersCreaditCardEditInp">
                                        <input
                                          className="usersCreditEditInpCnum"
                                          name="cNum"
                                          type="text"
                                          placeholder={
                                            '原設定的卡號:' + creditEdit.cNum
                                          }
                                          value={inputs.cNum}
                                          onChange={onChangeForInput('cNum')}
                                        />
                                      </div>
                                      <div className="usersCreaditCardEditInp">
                                        <input
                                          className="usersCreditEditInpCexp"
                                          name="cExp"
                                          type="text"
                                          placeholder={
                                            '原設定的有效期限:' +
                                            creditEdit.cExp
                                          }
                                          value={inputs.cExp}
                                          onChange={onChangeForInput('cExp')}
                                        />
                                      </div>
                                      <div className="usersCreaditCardEditInp">
                                        <input
                                          className="usersCreditEditInpCCCV"
                                          name="cCCV"
                                          type="text"
                                          placeholder={
                                            '原設定的CCV:' + creditEdit.cCCV
                                          }
                                          value={inputs.cCCV}
                                          onChange={onChangeForInput('cCCV')}
                                        />
                                      </div>
                                    </div>
                                  </ListItem>
                                  <div class="usersCreaditCardAddBtnEdit">
                                    <button
                                      className="usersTextBtn3"
                                      id={v.cId}
                                      onClick={(e) => {
                                        putUserCreditCardToServer(e.target.id)

                                        // console.log(e.target)
                                        // console.log(e.target.id)
                                        // console.log(v)
                                      }}
                                    >
                                      確認
                                    </button>
                                  </div>
                                </List>
                              </Dialog>
                            </div>
                            {/* <button
                              onClick={() => {
                                props.history.push(
                                  `/usersCreditCardEdit/${v.cId}`
                                )
                              }}
                            >
                              編輯
                            </button> */}
                          </div>
                        </div>
                      </ListItem>
                    )
                  })}
                <div className="usersCreaditCardBtnAdd">
                  <button
                    className="usersTextBtn3"
                    onClick={handleClickOpenAddCredit}
                  >
                    新增
                  </button>
                </div>
                <div>
                  <Dialog
                    fullScreen
                    open={openAddCredit}
                    onClose={handleCloseAddCredit}
                    TransitionComponent={Transition}
                  >
                    <AppBar className={classes.appBar}>
                      <Toolbar>
                        <IconButton
                          edge="start"
                          color="inherit"
                          onClick={handleCloseAddCredit}
                          aria-label="close"
                        >
                          <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                          新增信用卡
                        </Typography>
                        {/* <Button autoFocus color="inherit" onClick={handleClose}>
                save
              </Button> */}
                      </Toolbar>
                    </AppBar>
                    <List>
                      <ListItem button>
                        <div className="usersCreaditCardAddTitle">
                          <div>持卡人(英文)</div>
                          <div>卡號</div>
                          <div>有效期限</div>
                          <div>驗證碼</div>
                        </div>
                      </ListItem>
                      <Divider />
                      <ListItem button>
                        <div className="usersCreaditCardAddText">
                          <div className="usersCreaditCardAddInp">
                            <input
                              name="cName"
                              type="text"
                              placeholder="請輸入持卡人姓名(英文)"
                              value={inputs.cName}
                              onChange={onChangeForInput('cName')}
                              required
                            />
                          </div>
                          <div className="usersCreaditCardAddInp">
                            <input
                              name="cNum"
                              type="text"
                              placeholder="請輸入卡號"
                              value={inputs.cNum}
                              onChange={onChangeForInput('cNum')}
                              required
                            />
                          </div>
                          <div className="usersCreaditCardAddInp">
                            <input
                              name="cExp"
                              type="text"
                              placeholder="請輸入信用卡有效期限"
                              value={inputs.cExp}
                              onChange={onChangeForInput('cExp')}
                              required
                            />
                          </div>
                          <div className="usersCreaditCardAddInp">
                            <input
                              name="cCCV"
                              type="text"
                              placeholder="請輸入驗證碼"
                              value={inputs.cCCV}
                              onChange={onChangeForInput('cCCV')}
                              required
                            />
                          </div>
                        </div>
                      </ListItem>
                      <div className="usersCreaditCardAddBtnAddChk">
                        <button
                          className="usersTextBtn3"
                          // type="submit"
                          onClick={() => {
                            postUserCreditCardToServer()
                          }}
                        >
                          確認
                        </button>
                      </div>
                    </List>
                  </Dialog>
                </div>
              </List>
            </Dialog>
          </div>

          {/* <Link to="/usersCreditCard" className="usersTextBtn">
            信用卡登錄/刪除事項
          </Link> */}

          {/* 折扣碼資訊 */}
          <div className="usersTrackOutButton">
            <button
              className="usersTextBtn2"
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              折扣碼資訊
            </button>
            <Dialog
              fullScreen
              open={open}
              onClose={handleClose}
              TransitionComponent={Transition}
            >
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  {/* 未使用折扣碼 */}
                  <Typography variant="h6" className={classes.title}>
                    未使用折扣碼資訊
                  </Typography>

                  <Button autoFocus color="inherit" onClick={handleClickOpen1}>
                    已使用過的折扣碼
                  </Button>

                  {/* 已使用折扣碼 */}
                  <div>
                    {/* <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleClickOpen1}
                    >
                      已使用折扣碼資訊
                    </Button> */}
                    <Dialog
                      fullScreen
                      open={open1}
                      onClose={handleClose1}
                      TransitionComponent={Transition}
                    >
                      <AppBar className={classes.appBar}>
                        <Toolbar>
                          <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose1}
                            aria-label="close"
                          >
                            <CloseIcon />
                          </IconButton>
                          <Typography variant="h6" className={classes.title}>
                            已使用折扣碼資訊
                          </Typography>
                        </Toolbar>
                      </AppBar>
                      <List>
                        <ListItem button>
                          {/* <ListItemText primary="Phone ringtone" secondary="Titania" /> */}
                          <div className="usersDiscountTitle">
                            <div>折扣碼代號</div>
                            <div>折扣碼減價</div>
                            <div>新增時間</div>
                            <div>有效期限</div>
                          </div>
                        </ListItem>
                        <Divider />

                        {/* <ListItemText
                    primary="Default notification ringtone"
                    secondary="Tethys"
                  /> */}
                        {discountNotToUse.length &&
                          discountNotToUse.map((v) => {
                            return (
                              <ListItem button>
                                <div className="usersDiscountText" key={v.dId}>
                                  <div className="usersDiscountName">
                                    {v.dName}
                                  </div>
                                  <div className="usersDiscountNumber">
                                    {v.dPrice}
                                  </div>
                                  <div className="usersDiscountExp">
                                    {v.created_at}
                                  </div>
                                  <div className="usersDiscountAdd">
                                    {v.created_at}
                                  </div>
                                </div>
                              </ListItem>
                            )
                          })}
                      </List>
                    </Dialog>
                  </div>
                </Toolbar>
              </AppBar>
              <List>
                <ListItem button>
                  {/* <ListItemText primary="Phone ringtone" secondary="Titania" /> */}
                  <div className="usersDiscountTitle">
                    <div>折扣碼代號</div>
                    <div>折扣碼減價</div>
                    <div>新增時間</div>
                    <div>有效期限</div>
                  </div>
                </ListItem>
                <Divider />

                {/* <ListItemText
                    primary="Default notification ringtone"
                    secondary="Tethys"
                  /> */}
                {discountToUse.length &&
                  discountToUse.map((v) => {
                    return (
                      <ListItem button>
                        <div className="usersDiscountText" key={v.dId}>
                          <div className="usersDiscountName">{v.dName}</div>
                          <div className="usersDiscountNumber">{v.dPrice}</div>
                          <div className="usersDiscountExp">{v.created_at}</div>
                          <div className="usersDiscountAdd">{v.expiry}</div>
                        </div>
                      </ListItem>
                    )
                  })}
              </List>
            </Dialog>
          </div>

          {/* <Link to="/usersDiscountCanUse" className="usersTextBtn">
            折扣碼
          </Link> */}
        </div>
        <div className="memberTextC">
          <div></div>
          <div>姓名</div>
          <div>身分證字號</div>
          <div>e-mail</div>
          <div>電話</div>
          <div>出生年月日</div>
          <div>地址</div>
          <div>個人描述</div>
          <Link to="/usersEdit/" className="usersTextBtn">
            編輯
          </Link>
        </div>

        <div className="memberTextR">
          <div></div>
          <div>{users.uName}</div>
          <div>{users.uTWId}</div>
          <div>{users.uMail}</div>
          <div>{users.uPhone}</div>
          <div>{users.uBirth}</div>
          <div>{`${users.uCountry}  ${users.uCity} ${users.uTownship} ${users.uStreet}`}</div>
          <div>{users.uDiscr}</div>
        </div>
      </div>
    </>
  )

  return (
    <>
      <UsersTitle />
      {dataLoading ? loading : display}
    </>
  )
}

export default withRouter(UsersText)
