import { useState } from "react"
import { setEnvironmentData } from "worker_threads"



export default function Prompt() {


  const [ newVar, setVar ] = useState("off")

   // Toggle between a / b
  const toggleFunc = () => {
   if (newVar == "off") {
   setVar("on")
   }else{
   setVar("off")
   }

}


  return (

    <div className="min-width-full py-2">

      <div className="rounded bg-black">  
        <div className="text-xs px-1 py-1"> {'>'} type prompt here etc...</div>

        <div> Testing: {newVar} </div>
      </div>

      <div className="py-2">
        <button className="py-2 px-2 rounded bg-slate-600 hover:bg-slate-300" onClick={ () => toggleFunc() }>Toggle on/off</button>
      </div>


    </div>

  );
}