import React, { useState } from 'react'

function Upload(props) {
  const { uImg, setUimg } = props
  // 檔案上傳，測試取值
  const onChangeHandler = (event) => {
    console.log(event.target.files[0])
  }
  // 檔案上傳至伺服器
  async function onClickHandler() {
    const newData = new FormData()
    newData.append('file', this.state.selectedFile)
    const url = 'http://localhost:7000/users/usersEditImg'

    const req = new Request(url, {
      method: 'post',
      body: JSON.stringify(newData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    console.log(JSON.stringify(newData))

    const res = await fetch(req)
    const data = await res.json()

    console.log('伺服器put回傳資料:', data)
  }

  return (
    <>
      <form // 阻擋表單預設行為
        onSubmit=""
      >
        <label forhtml="uImg">
          <input
            id="uImg"
            name="uImg"
            // 檔案上傳
            type="file"
            accept="image/png, image/jpeg"
            onChange={onChangeHandler}
          />
          請上傳照片
        </label>
        <button type="submit">編輯照片</button>
      </form>
    </>
  )
}

export default Upload
