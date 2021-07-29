import React, { Component } from 'react'

import axios from 'axios'

class UploadClass extends Component {
  // 初始狀態設定

  state = {
    selectedFile: null,
  }

  fileSelectedHandler = (event) => {
    // 取得檔案資訊
    console.log(event.target.files[0])
    // 將檔案資訊 狀態綁定
    this.setState({
      selectedFile: event.target.files[0],
    })
  }

  // axios 傳送資料至後端
  fileUploadHandler = () => {
    // 如果發送的值與 String 或 Blob 不同，它將自動轉換為 String：

    // formData.append('name', true);
    // formData.append('name', 74);
    // formData.append('name', 'John');

    // formData.getAll('name'); // ["true", "74", "John"]

    const token = localStorage.getItem('token')
    // fd 會放在 req.file
    const fd = new FormData()
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
    // token 會放在 req.body
    fd.append('token', token)
    console.log(fd)
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
  render() {
    return (
      <>
        <div>
          <input
            /* 將input 隱藏的方法 */
            style={{ display: 'none' }}
            type="file"
            onChange={this.fileSelectedHandler}
            /* 另做一個button給input */
            ref={(fileInput) => (this.fileInput = fileInput)}
          />
          {/* 另做一個button給input */}
          <button
            style={{ marginTop: '100px', width: '150px' }}
            onClick={() => this.fileInput.click()}
          >
            編輯圖片
          </button>
          {/* 實際上傳用的button */}
          <button
            style={{ marginTop: '20px', width: '150px' }}
            onClick={this.fileUploadHandler}
          >
            上傳圖片
          </button>
        </div>
      </>
    )
  }
}

export default UploadClass
