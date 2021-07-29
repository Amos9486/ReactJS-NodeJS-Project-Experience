import React, { useState, useEffect } from 'react'

import '../usersConsumption/usersConsumption.css'

function SelectOrderBy(props) {
  // props 可以傳狀態也可以傳function
  const { uOrder, setUorder, getConsumptionOrderBy, getConsumptionToServer } =
    props

  return (
    <>
      <div className="userConsumptionOrderBy">
        <form></form>
        <label forhtml="">排序方式</label>
        <select
          value={uOrder}
          onChange={(e) => {
            setUorder(e.target.value)
            if (e.target.value === '') {
              getConsumptionToServer()
            } else {
              getConsumptionOrderBy(e.target.value)
            }
          }}
        >
          <option value="">請選擇</option>
          <option value="1">依購買日期早至晚</option>
          <option value="2">依購買日期晚至早</option>
          <option value="3">依商品單價低至高</option>
          <option value="4">依商品單價高至低</option>
        </select>
      </div>
      <p className="userConsumptionOrderByText">(依商品單價/購買日期排序)</p>
    </>
  )
}

export default SelectOrderBy
