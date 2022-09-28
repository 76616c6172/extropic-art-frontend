import { useState } from "react"
import { setEnvironmentData } from "worker_threads"



export default function PROMPT() {

  const [newVar, setVar] = useState("off")

  // Toggle between a / b
  const toggleFunc = () => {
    if (newVar == "off") {
      setVar("on")
    } else {
      setVar("off")
    }

  }


  return (

    <div className="min-width-full py-2">

      <div className="rounded bg-black
         sm:text-xs md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl
         px-1 py-10" >
        <div className=""> {'>'} ...</div>

      </div>

      { /*
      <div className="py-2">

        <div> Testing: {newVar} </div>
        <button className="py-2 px-2 rounded bg-slate-600 hover:bg-slate-300" onClick={ () => toggleFunc() }>Toggle on/off</button>
      </div>
    */}

    </div>

  );
}