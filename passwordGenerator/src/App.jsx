import { useState, useCallback, useEffect, useRef } from "react"


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [passowrd, setPassword] = useState("")
  //useRef hook
  const passowrdRef = useRef(null)

  const passowrdGenerator = useCallback(() =>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!@#$%^&*=+"
    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,characterAllowed, setPassword])
  const copyPasswordToClipboard = useCallback(() => {
    passowrdRef.current?.select()
    window.navigator.clipboard.writeText(passowrd)
  },[passowrd])

  useEffect(() => { passowrdGenerator()}, [length, numberAllowed, characterAllowed, passowrdGenerator])
  return (
    <>
     <div className="w-full max-w-md mx-auto shadow-md
     rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700" >
      <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex rounded-lg overflow-hidden mb-5">
          
          <input 
          type="text"
          value={passowrd}
          className="outline-none w-full px-2 py-1"
          placeholder="password"
          readOnly
          ref={passowrdRef}
          />
          <button
          onClick={copyPasswordToClipboard}
           className="bg-blue-700 text-white px-3">Copy</button>
        </div>
        <div className="flex text-sm gap-x-3">
          <div className="flex items-center gap-x-1">
            <input 
            type="range"
            min={8}
            max={30}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Lenght: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
             type="checkbox"
             defaultChecked={numberAllowed}
             id="numberInput"
             onChange={()=>{
              setNumberAllowed((prev) => !prev)
             }}
             />
             <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
             type="checkbox"
             defaultChecked={characterAllowed}
             id="charInput"
             onChange={()=>{
              setCharacterAllowed((prev) => !prev)
             }}
             />
             <label htmlFor="charInput">Characters</label>
          </div>
        </div>
     </div>
    </>
  )
}

export default App
