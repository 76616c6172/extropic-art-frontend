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

    <div className="min-width-full py-1">

      <div className="rounded bg-black justify-center max-w-sm
         sm:text-xs md:text-md lg:text-md xl:text-lg 2xl:text-2xl
         px-4 py-4" >
        <div className="">
          Insert cool prompt component here.
        </div>

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