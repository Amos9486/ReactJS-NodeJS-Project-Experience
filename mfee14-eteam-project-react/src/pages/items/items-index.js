import React, { useState, useEffect } from 'react'
import './items-index.css'
import SortingSelect from './SortingSelect'
import CardMedia from '@material-ui/core/CardMedia'
import CategoriesList from './CategoriesList'
import ProductCard from './ProductCard'
import GuessYouLikeCard from './GuessYouLikeCard'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

function ItemsIndex() {
  //排序方式
  const [sortingType, setSortingType] = useState('')

  //商品分類
  const [open, setOpen] = useState(false)
  const [iCateId, setICateId] = useState(0)

  //商品卡
  const [itemsArr, setItemsArr] = useState([])

  //頁碼
  const [pagesArray, setPagesArray] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [nowPage, setNowPage] = useState(0)

  const PagesComponent = () => {
    let Arr = []
    for (let i = 1; i <= totalPages; i++) {
      Arr.push(i)
    }
    setPagesArray(Arr)
    console.log(Arr)
  }

  // 後端相關function：顯示全部商品
  async function getAllItemsData(page) {
    // 連接的伺服器資料網址
    const url = `http://localhost:7000/items?page=${
      page >= 0 ? page : ''
    }&sort=${sortingType}&iCateId=${iCateId}`

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
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
    setItemsArr(data.result2)

    setTotalPages(data.totalPages)
    setNowPage(data.page)
  }

  // 後端相關function：加入或更新購物車
  async function getCartData(iId, cartQty, sId) {
    // 連接的伺服器資料網址
    const url = `http://localhost:7000/items/session?iId=${iId}&cartQty=${cartQty}&sId=${sId}`

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      credentials: 'include',
      method: 'GET', //GET不能接body
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log('伺服器回傳的json資料by read', data)
  }

  //初次渲染
  useEffect(() => {
    getAllItemsData()
  }, [])

  useEffect(() => {
    PagesComponent()
  }, [nowPage, totalPages])

  useEffect(() => {
    getAllItemsData()
    PagesComponent()
  }, [sortingType, iCateId])

  return (
    <>
      <div className="itemsIndex">
        <CardMedia
          className="itemsIndexBg"
          component="img"
          image="http://localhost:3000/index/items-index-bg.jpg"
          title="itemsIndexBg"
        />

        <div className="PicAndTitle">
          <div className="itemsIndexPic">
            <CardMedia
              component="img"
              image="http://localhost:3000/index/items-index-pic.jpg"
              height="100%"
              title="itemsIndexPic"
            />
          </div>

          <p className="itemsIndexPicTitle">PRODUCT STORE</p>
        </div>
      </div>
      <Grid container justify="center">
        <Grid container className="itemsIndexProduct">
          <Grid
            item
            xs={2}
            className="itemsIndexCategories"
            style={{ marginTop: '180px' }}
          >
            <CategoriesList
              open={open}
              setOpen={setOpen}
              setICateId={setICateId}
            ></CategoriesList>
          </Grid>

          <Grid item xs={9} container className="itemsIndexTitle">
            <Grid container justify="space-between">
              <Grid item>
                <h4>全部商品</h4>
              </Grid>

              <Grid
                item
                className="itemsIndexSorting"
                style={{ marginTop: '150px' }}
              >
                <Grid item container alignItems="center">
                  <Grid item>
                    <p>排序方式</p>
                  </Grid>

                  <Grid item>
                    <SortingSelect
                      sortingType={sortingType}
                      setSortingType={setSortingType}
                    >
                      <em>請選擇</em>
                    </SortingSelect>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item spacing={2} container>
              {itemsArr.map((value, index) => {
                if (index === 0 || index === itemsArr.length - 1) {
                  return (
                    <Grid key={index} item>
                      <ProductCard big={true} product={value}></ProductCard>
                    </Grid>
                  )
                } else {
                  return (
                    <Grid key={index} item>
                      <ProductCard product={value}></ProductCard>
                    </Grid>
                  )
                }
              })}
            </Grid>

            <Grid
              item
              container
              justify="flex-end"
              xs={12}
              style={{ marginTop: '100px' }}
            >
              <Grid item>
                <IconButton
                  aria-label="left"
                  onClick={() => {
                    console.log('上一頁', nowPage)
                    if (+nowPage <= 1) return
                    getAllItemsData(+nowPage - 1)
                  }}
                >
                  <IoIosArrowBack />
                </IconButton>
              </Grid>

              {pagesArray.map((value, index) => (
                <Grid item key={index}>
                  <IconButton
                    onClick={() => {
                      console.log('第幾頁', nowPage)
                      getAllItemsData(value)
                    }}
                  >
                    {value}
                  </IconButton>
                </Grid>
              ))}

              <Grid item>
                <IconButton
                  onClick={() => {
                    console.log('下一頁', nowPage)
                    if (+nowPage >= totalPages) return
                    getAllItemsData(+nowPage + 1)
                  }}
                  aria-label="right"
                >
                  <IoIosArrowForward />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider variant="middle" style={{ marginTop: '50px' }} />

      <Grid container justify="center" style={{ marginBottom: '80px' }}>
        <Grid container justify="center" className="GuessYouLike">
          <Grid item justify="flex-start">
            <h4>猜你也喜歡</h4>
          </Grid>
          <Grid item container>
            <Grid item container spacing={6} justify="center">
              {itemsArr.slice(0, 4).map((value, index) => {
                return (
                  <Grid
                    key={index}
                    item
                    xs={2}
                    style={{ boxSizing: 'content-box' }}
                  >
                    <GuessYouLikeCard product={value}></GuessYouLikeCard>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
export default ItemsIndex
