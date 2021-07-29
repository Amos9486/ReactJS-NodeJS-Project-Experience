// 導入react-markdown-editor-lite，另外還需要導入一個Markdown解析器(必要)
import React from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import Popper from '@material-ui/core/Popper'
import styled from 'styled-components'

// 初始化Markdown解析器
const mdParser = new MarkdownIt()

const EditorBox = styled(Popper)`
  width: 30vw;
  height: 15vw;
`

// 編輯器主體
function LiteEditor(props) {
  const { blockFlag, textField, setTextField, anchorEl } = props
  return (
    <EditorBox open={!blockFlag[0]} anchorEl={anchorEl}>
      <MdEditor
        value={blockFlag[1] === -1 ? '' : textField[blockFlag[1]].text}
        style={{ height: '100%' }}
        view={{ menu: true, md: true, html: false }}
        renderHTML={(text) => mdParser.render(text)}
        onChangeTrigger="afterRender"
        onChange={({ html, text }) => {
          // console.log('html:', html, typeof html)
          // console.log('text:', text, typeof text)
          const tempTextField = [...textField]
          tempTextField[blockFlag[1]].html = html
          tempTextField[blockFlag[1]].text = text
          setTextField(tempTextField)
          console.log(tempTextField)
          console.log(blockFlag)
        }}
      />
    </EditorBox>
  )
}

export default LiteEditor
