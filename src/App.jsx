import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [symbolAllowed, setSymbolAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // useRef hook
  const passwordRef = useRef(null) 

  const generatePassword = useCallback(() => {
    let password = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let num = "0123456789"
    let sym = "!@#$%^&*()_+"
    if (numberAllowed) str += num
    if (symbolAllowed) str += sym
    for (let i = 0; i < length; i++) {
      password += str.charAt(Math.floor(Math.random() * str.length))
    }
    // for (let i = 0; i < length; i++) {
    //   const randomNumber = Math.floor(Math.random() * 36)
    //   if (randomNumber < 10) {
    //     password += String.fromCharCode(randomNumber + 48)
    //   } else if (randomNumber < 36) {
    //     password += String.fromCharCode(randomNumber + 55)
    //   }
    // }
    setPassword(password)
  }, [length, numberAllowed, symbolAllowed,setPassword])

  // const copyPasswordToClipboard = useCallback(() => {
  //   passwordRef.current?.select()
  //   passwordRef.current?.setSelectionRange(0, 40)
  //   window.navigator.clipboard.writeText(password)
  //   // navigator.clipboard.writeText(password)
    
  // }, [password])
  
  // useEffect hook
useEffect(() => {
  generatePassword()
}, [length, numberAllowed, symbolAllowed, generatePassword])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-2'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
        />
        <button
        onClick={() => {
          passwordRef.current.select()
          document.execCommand('copy')
        }}
        // onClick={copyPasswordToClipboard}
        
        className='outline-none bg-blue-700 text-white px-3 py-1 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={36}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
             />
             <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
          {/* <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed(!numberAllowed)}
            /> */}
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={() => {setNumberAllowed((prev) => !prev)}}
            />
            <label>Number</label>
          </div>
          <div>
            <input
            type="checkbox"
            defaultChecked={symbolAllowed}
            id='symbolInput'
            onChange={() => {setSymbolAllowed((prev) => !prev)}}
            />
            <label>Symbol</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
