import { useState, useCallback, useEffect,useRef } from "react"

function App() {

  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
 
  //useRef hooks
  const copySelection=useRef(null);
  const passwordGenerator = useCallback(() => {

    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*_?/";
    for (let i = 1; i <= length; i++) {
      let rand = Math.floor(Math.random() * str.length );
      pass += str.charAt(rand);
    }
    setPassword(pass);
  }, [numAllowed, length, charAllowed, setPassword]);

useEffect(()=>
{
  passwordGenerator();
},[numAllowed, length, charAllowed,passwordGenerator])
  
const copyToClipboard=useCallback(
  ()=>
{

  //To select whole password
  copySelection.current?.select();

  //If you want select only some particaular part then you can choose.
  // copySelection.current?.select();
  // copySelection.current?.setSelectionRange(1,3);
  // let pass=password.slice(0,3);
  
  window.navigator.clipboard.writeText(password);
},[password])
  

  return (
    <>
      <h1 className="text-center text-white text-2xl m-5">Password Generator</h1>
      <div className="flex  text-orange-500  py-5 px-4 my-8 
      max-w-md mx-auto items-center rounded-3xl flex-col shadow-xl bg-gray-700">
        <div className="inputField rounded-3xl mb-2">
          <input 
          className="outline-none px-4 py-1 rounded-full" 
          type="text" readOnly
          ref={copySelection}
           value={password} />
          <button
          onClick={copyToClipboard}
          className=" px-4 py-1 rounded-xl text-white bg-blue-500" >
            Copy</button>
        </div>
        <div className=" mt-2 chooseField flex flex-row gap-3">
          <input type="range" 
          className="cursor-pointer"
          min={8}
          max={30}
          value={length}
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label >Length : {length}</label>
          <input type="checkbox" name="number" checked={numAllowed} onChange={()=>{setNumAllowed(!numAllowed)}} /><span>Numbers</span>
          <input type="checkbox" name="character" checked={charAllowed} onChange={()=>{setCharAllowed(!charAllowed)}} /><span>Character</span>
        </div>
      </div>
    </>
  )
}

export default App
