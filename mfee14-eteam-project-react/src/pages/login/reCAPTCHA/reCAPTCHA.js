import React, { useState, useRef, useEffect, useCallback } from 'react'

let isCalled = false
const grecaptcha = {
  render: function (element, { callback }) {
    if (isCalled) throw new Error('You can only call me once')
    isCalled = true
    element.innerText = 'click me if you are not robot'
    element.addEventListener('click', function () {
      callback('you got token!')
    })
  },
}

const ReCAPTCHA = ({ onChange }) => {
  const divRef = useRef()
  const cbRef = useRef(onChange)

  useEffect(() => {
    cbRef.current = onChange
  }, [onChange])

  useEffect(() => {
    const handleLoad = () => {
      grecaptcha.render(divRef.current, {
        callback: () => {
          cbRef.current()
        },
      })
    }
    handleLoad()
  }, [])

  return <div ref={divRef} />
}

export default function App() {
  const [isOld, setIsOld] = useState(true)
  const oldFunction = () => console.log('old function')
  const newFunction = () => console.log('new function')

  return (
    <div className="App">
      <ReCAPTCHA onChange={isOld ? oldFunction : newFunction} />
      <button
        onClick={() => {
          console.log('Switch to new function')
          setIsOld(false)
        }}
      >
        change function
      </button>
    </div>
  )
}
