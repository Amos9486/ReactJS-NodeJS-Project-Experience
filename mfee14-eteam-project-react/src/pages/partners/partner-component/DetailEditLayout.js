import React from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import Paper from '@material-ui/core/Paper'
import InnerComponent from './InnerComponent'
import LiteEditor from './EditorComponent'

const ResponsiveGridLayout = WidthProvider(Responsive)

function DetailEditDrawer(props) {
  const {
    open,
    blockFlag,
    layoutsData,
    layoutAttr,
    textField,
    setBlockFlag,
    setLayoutsData,
    setTextField,
    handleDeleteBlock,
    anchorEl,
    setAnchorEl,
  } = props

  return (
    <>
      <ResponsiveGridLayout
        className="layout"
        layouts={layoutsData}
        isDraggable={layoutAttr.isDraggable}
        isResizable={layoutAttr.isResizable}
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
              <InnerComponent
                index={i}
                open={open}
                textField={textField}
                blockFlag={blockFlag}
                setBlockFlag={setBlockFlag}
                handleDeleteBlock={handleDeleteBlock}
                setAnchorEl={setAnchorEl}
              />
            </Paper>
          )
        })}
      </ResponsiveGridLayout>
      <LiteEditor
        blockFlag={blockFlag}
        textField={textField}
        setTextField={setTextField}
        anchorEl={anchorEl}
      />
    </>
  )
}

export default DetailEditDrawer
