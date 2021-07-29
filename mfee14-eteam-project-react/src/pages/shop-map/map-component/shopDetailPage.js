import React from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'

const ResponsiveGridLayout = WidthProvider(Responsive)

function ShopDetailPage(props) {
  const { textField, layoutsData, setLayoutsData } = props
  return (
    <>
      <ResponsiveGridLayout
        className="layout"
        layouts={layoutsData}
        isDraggable={false}
        isResizable={false}
        rowHeight={100}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        onLayoutChange={(layout, allLayout) => {
          setLayoutsData(allLayout)
        }}
      >
        {textField.map((v, i) => {
          return (
            <Paper
              key={i}
              elevation={3}
              square
              style={{
                margin: '0',
                padding: '20px',
                boxSizing: 'border-box',
                overflow: 'auto',
              }}
            >
              <Box
                style={{ wordBreak: 'break-all' }}
                dangerouslySetInnerHTML={{ __html: textField[i].html }}
              ></Box>
            </Paper>
          )
        })}
      </ResponsiveGridLayout>
    </>
  )
}

export default ShopDetailPage
