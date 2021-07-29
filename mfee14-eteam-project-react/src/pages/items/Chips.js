import React from 'react'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'

function Chips() {
  return (
    <>
      <Grid item>
        <Chip
          variant="outlined"
          size="small"
          label="日曬"
          component="a"
          href="#chip"
          clickable
        />
      </Grid>

      <Grid item>
        <Chip
          variant="outlined"
          size="small"
          label="拉丁美洲"
          component="a"
          href="#chip"
          clickable
        />
      </Grid>
    </>
  )
}

export default Chips
