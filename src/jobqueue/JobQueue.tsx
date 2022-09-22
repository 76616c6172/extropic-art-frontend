import { useEffect } from 'react';
import useAxios from "../utils/UseAxios"

const URL = "https://exia.art/api/1"

// Helper function to provide a sleep time interval for the inifinite query loop in refreshJobQueue()
function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

// Outputs jsx to render a single job element
function renderSingleQueuedJobElement(promptText: string) {
    return (
      <div className="hover:text-white hover:cursor-pointer
        sm:text-xs md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl
        px-1 py-1"
        onClick={() => console.log("click trigger")} >
        {promptText}
      </div>
    )
}

// <JobQueue /> dynamically renders the current job queue by making requests to the api/1/queue
export default function JobQueue() {

  // Custom axios react hook for making GET requests to /api/1/queue
  const { response, loading, error, sendRequest } = useAxios( {
    method: "get",
    url: `${URL}/queue`,
    headers: {
      accept: '*/*'
    }
  } );

// refreshJobQueue runs asyncrhonously and reloads the jobqueue 
// FIXME: Currently due to how useAxios is implemented, this currently refreshes twice everytime
const refreshJobQueue = async () => {
  while (true) {
    await delay(5000)
    sendRequest()
  }
}

// This fires once on page load and then everytime the state changes which is a bit of a waste
useEffect(()=>{
  refreshJobQueue();
},[]); // Why do we need an empty array at the end again?

	// Dynamically rebuild the joblist from the api response
  // React will automatically rebuild it whenever the api response changes)
  const queuedJobList = response?.data.map(renderSingleQueuedJobElement)

  return (
    <div className="rounded bg-black px-1 py-1 shadow-md">
      { queuedJobList }
    </div>
  )
}