import { PinDropSharp } from '@material-ui/icons'
import React from 'react'
import { withRouter } from 'react-router-dom'

function UsersLogout(props) {
  async function usersLogoutToServer() {
    const token = localStorage.getItem('token')
    const url = `${process.env.REACT_APP_USERSURL}/logout/`
    const req = new Request(url, {
      method: 'post',
      body: JSON.stringify({ token }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const res = await fetch(req)
    const data = res.json
    console.log('伺服器回傳資料:', data)

    if (data) {
      localStorage.removeItem('token')
      props.history.push('/')
    }
  }

  return (
    <>
      <button
        onClick={() => {
          usersLogoutToServer()
        }}
      >
        登出
      </button>
    </>
  )
}

export default withRouter(UsersLogout)
