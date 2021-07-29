import React, { useState, useRef } from 'react'

import axios from 'axios'

import $ from 'jquery'

function UploadFun(props) {
  // class UploadClass extends Component {
  // 初始狀態設定
  const [selectedFile, setSelectedFile] = useState({})
  // state = {
  //   selectedFile: null,
  // }
  const buttonRef = useRef()

  const fileSelectedHandler = (event) => {
    // 取得檔案資訊
    console.log(event.target.files[0])
    // 將檔案資訊 狀態綁定
    setSelectedFile({
      selectedFile: event.target.files[0],
    })
  }

  // axios 傳送資料至後端
  const fileUploadHandler = () => {
    const token = localStorage.getItem('token')
    const fd = new FormData()
    fd.append(
      'image',
      this.state.selectedFile,
      this.state.selectedFile.name,
      token
    )
    // axios.post(url, data, config)
    axios
      .post(
        `${process.env.REACT_APP_USERSURL}/usersEditImg/`,
        fd,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
        //   顯示上傳進度條
        {
          onUploadProgress: (ProgressEvent) => {
            console.log(
              'Upload Process:' +
                Math.round(ProgressEvent.loaded / ProgressEvent.total) * 100 +
                '%'
            )
            buttonRef.current =
              Math.round(ProgressEvent.loaded / ProgressEvent.total) * 100 + '%'
          },
        }
      )
      .then((res) => {
        // 測試與後端連線
        console.log('後端傳回的資料:' + res)
      })
    // .then((data) => {
    //   data.json()
    //   console.log('後端傳回的資料:' + data)
    // })
  }
  // render() {
  return (
    <>
      <div>
        <input
          /* 將input 隱藏的方法 */
          // style={{ display: 'none' }}
          type="file"
          onChange={fileSelectedHandler}
          /* 另做一個button給input */
          ref={buttonRef}
        />
        {/* 另做一個button給input */}
        {/* <button onClick={() => this.fileInput.click()}>選擇檔案</button> */}
        {/* 實際上傳用的button */}
        <button
          onClick={() => {
            fileUploadHandler()
          }}
        >
          上傳檔案
        </button>

        {/* <div style={{ width: '100px', height: '100px', background: 'yellow' }}>
          {buttonRef}
        </div> */}
      </div>
    </>
  )
}

export default UploadFun
