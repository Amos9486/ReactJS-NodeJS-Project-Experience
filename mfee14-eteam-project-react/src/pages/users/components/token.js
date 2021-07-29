// 用function 引入 驗證機制
async function tokenToServer() {
  // 讀取token
  const token = localStorage.getItem('token')

  // console.log(token);

  const url = 'http://localhost:7000/users/jwt-verify'

  const req = new Request(url, {
    method: 'post',
    body: JSON.stringify({ token }),
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  })
  console.log(req.body)
  const res = await fetch(req)
  const data = await res.json()
  console.log('伺服器回傳資料', data)
  return data
}

export default tokenToServer
