import {useState,  useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const[password,setPassword] = useState("")

  //useref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*(){}[]~`"

    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)

      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])


  const copyPasswordToClipboard= useCallback(()=>{
    //for ui purpose
    passwordRef.current?.select()
    //range
    passwordRef.current?.setSelectionRange(0,3)
    //since we are working in core react so we are using window
    window.navigator.clipboard.writeText(password)
  },
[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    /*mx-auto px-6 py-3 my-8*/
    <>
    <div className=' w-full max-w-md grid place-content-center shadow-md rounded-lg  text-orange-300 bg-gray-700'>
      <h1 className='text-white text-center font-medium text-xl'>
        Password Generator
      </h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
        <input 
        type="text"
        value={password}
        className='outline-none w-full py-2 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
         />
         <button
         onClick={copyPasswordToClipboard} 
         className='bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded text-black'>Copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-centre gap-x-1'>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label >Length:{length}</label>
        </div>
        <div className='flex items-centre gap-x-1'>
        <input 
          type="checkbox"
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={()=>{
            setNumberAllowed((prev)=>!prev);
          }}
          />
          <label htmlFor='numberInput'>Number</label>
        </div>
        <div className='flex items-centre gap-x-1'>
        <input 
          type="checkbox"
          defaultChecked={charAllowed}
          id='characterInputInput'
          onChange={()=>{
            setCharAllowed((prev)=>!prev);
          }}
          />
          <label htmlFor='characterInput'>Characters</label>
        </div>
      </div>
    </div>

    </>
  )
}

export default App
