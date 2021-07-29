import React from 'react'
import { Select, MenuItem } from '@material-ui/core'

function SortingSelect(props) {
  const { sortingType, setSortingType } = props

  return (
    <Select
      value={sortingType}
      onChange={(event) => {
        setSortingType(event.target.value)
        console.log(event.target.value)
      }}
      displayEmpty
      inputProps={{ 'aria-label': 'Without label' }}
    >
      <MenuItem value="">
        <em>請選擇</em>
      </MenuItem>
      <MenuItem value="newToOld">由新到舊</MenuItem>
      <MenuItem value="oldToNew">由舊到新</MenuItem>
    </Select>
  )
}

export default SortingSelect
