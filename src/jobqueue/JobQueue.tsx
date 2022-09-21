import React from 'react'
import { useState } from 'react'
import axios from 'axios'


// Sleep a milisecond time interval
function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

// TODO:
// Figure out how to get a job with axios
// Fetches a job and returns it
const url = "https://exia.art/api/0"

async function fetchJob(jobid: string) {


  while (true) {
    const response = axios.get(`${url}/jobs?jobid=${jobid}`)
    console.log((await response).data.prompt)
    // setX((await response).data.prompt)
    await delay(5000)
  }

}

// TODO / FIXME:
// This does not work, I need to create my own hook
// see:  https://reactjs.org/docs/hooks-custom.html

// This function executes once on pageload
// TODO: make it use hooks to rerender when data changes while requests for in background
export default function JobQueue() {
  fetchJob("2")

// Just testing
const [X, setX] = useState("Placeholder job set at first")


  // TODO:
  // Insert logic that fetches periodically through the API and builds the correct job queue
  // Use state hook somehow so the JobQueue element rerenders when the state (aka the jobqueue) changes
  const exampleJobs: string[] = [
    "Portrait of Darth Vader, painted in ian mcque style drawn by vania zouravliov and takato yamamoto, inspired by Star Wars, intricate acrylic gouache painting, high detail, sharp high detail, artstation",
    "3d render of celestial space nebula, cosmic, space station, unreal engine 3, photorealistic materials, trending on Artstation",
    "Design only, 2050 s retro future art blueprint borders lines decorations space machine. muted colors. by jean baptiste monge"
  ];

  const jobList = exampleJobs.map ( (job) => {
       return <div className="hover:text-white
       sm:text-xs md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl
       px-1 py-1
       "> {job} </div> })

  return ( <div className="rounded bg-black px-1 py-1 shadow-md">
    { jobList } </div>
  )
}