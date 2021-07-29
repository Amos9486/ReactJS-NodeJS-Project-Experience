import React, { useState, useEffect } from 'react'
import DetailEditDrawer from './DetailEditDrawer'
import DetailEditLayout from './DetailEditLayout'
import {
  GiSave,
  GiCancel,
  GiFoldedPaper,
  GiPaintBrush,
  GiPin,
  GiPapers,
} from 'react-icons/gi'

function PartnersDetailPage(props) {
  const {
    open,
    setOpen,
    handleDrawerClose,
    anchorEl,
    setAnchorEl,
    detailTextField,
    setTextField,
    detailLayoutsData,
    setLayoutsData,
  } = props

  // cb function
  const handleWillSave = () => {
    setWillSave(true)
    handleDrawerClose()
  }
  const handleWillNotSave = () => {
    setWillSave(false)
    handleDrawerClose()
  }
  const handleAddNewBlock = () => {
    console.log(detailTextField)
    const tempAddNewArr = [...detailTextField, { html: '', text: '' }]
    console.log(tempAddNewArr)
    setTextField(tempAddNewArr)
  }
  const handleDeleteBlock = (index) => {
    const tempDeleteLayouts = { lg: [], md: [], sm: [], xs: [], xxs: [] }
    for (let layout in detailLayoutsData) {
      detailLayoutsData[layout].forEach((e, i) => {
        if (i < index) tempDeleteLayouts[layout][i] = e
        if (i > index)
          tempDeleteLayouts[layout][i - 1] = { ...e, i: `${i - 1}` }
      })
    }
    const tempDeleteArr = [...detailTextField].filter((e, i) => i !== index)
    setLayoutsData(tempDeleteLayouts)
    setTextField(tempDeleteArr)
    console.log(tempDeleteLayouts)
    console.log(tempDeleteArr)
  }

  // 基礎資料
  const editBtnArr = [
    { name: '保存版面配置', func: handleWillSave, icon: <GiSave /> },
    { name: '放棄當前配置', func: handleWillNotSave, icon: <GiCancel /> },
    { name: '新增方塊', func: handleAddNewBlock, icon: <GiPapers /> },
    // { name: '單張圖片', func: '', icon: <GiPaintBrush /> },
    { name: '取得座標', func: '', icon: <GiPin /> },
  ]

  async function updateToSever() {
    // 開啟載入指示
    // setDataLoading(true)

    const newData = { detailTextField, detailLayoutsData }
    console.log(detailTextField, detailLayoutsData)
    // 連接的伺服器資料網址
    const url = 'http://localhost:7000/partners/update'

    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: 'PUT',
      body: JSON.stringify(newData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    console.log(JSON.stringify(newData))

    const response = await fetch(request)
    const data = await response.json()

    console.log('伺服器回傳的json資料by update', data)

    //直接在一段x秒關掉指示器
    // setTimeout(() => {
    //   setDataLoading(false)
    //   alert('儲存完成')
    //   props.history.push('/')
    // }, 1000)
  }

  // hooks
  // const [btnObjArr, setBtnObjArr] = useState(editBtnArr)
  const [layoutAttr, setLayoutAttr] = useState({
    isDraggable: false,
    isResizable: false,
  })
  const [preTextField, setPreTextField] = useState(detailTextField)
  const [preLayoutsData, setPreLayoutsData] = useState(detailLayoutsData)
  const [willSave, setWillSave] = useState(null)
  const [blockFlag, setBlockFlag] = useState([true, -1])

  // 若不儲存，恢復編輯前的狀態
  useEffect(() => {
    if (open) {
      // 抽屜開啟時儲存當前狀態
      setPreLayoutsData(detailLayoutsData)
      setPreTextField(detailTextField)
    }
    if (!open && willSave !== null && !willSave) {
      // 抽屜關閉，且放棄保存
      setLayoutsData(preLayoutsData)
      setTextField(preTextField)
    }
    if (!open && willSave) updateToSever() // 為了取得正確的hooks內容，必須於此處儲存
    setLayoutAttr({ ...layoutAttr, isDraggable: open, isResizable: open })
    setBlockFlag([true, -1])
    console.log('1.', willSave)
    console.log('2.', detailLayoutsData)
    console.log('3.', preLayoutsData)
    console.log('4.', blockFlag)
    console.log('5.', detailTextField)
    console.log('6.', preTextField)
  }, [open])

  // 元件載入以及卸載前的處理
  useEffect(() => {
    return () => {
      setOpen(false)
      setWillSave(null)
      setBlockFlag([true, -1])
    }
  }, [])

  return (
    <>
      <DetailEditDrawer
        open={open}
        btnObjArr={editBtnArr}
        setOpen={setOpen}
        setWillSave={setWillSave}
        setBlockFlag={setBlockFlag}
      ></DetailEditDrawer>
      <DetailEditLayout
        open={open}
        blockFlag={blockFlag}
        layoutsData={detailLayoutsData}
        layoutAttr={layoutAttr}
        textField={detailTextField}
        setBlockFlag={setBlockFlag}
        setLayoutsData={setLayoutsData}
        setTextField={setTextField}
        handleDeleteBlock={handleDeleteBlock}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      ></DetailEditLayout>
    </>
  )
}

export default PartnersDetailPage
