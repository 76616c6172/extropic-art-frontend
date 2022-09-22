import { useEffect } from 'react'
import useAxios from "../utils/UseAxios"

const URL = "https://exia.art/api/1"
const MS_TIME_BETWEEN_REFRESH = 5000

let isFirstPageLoad = true

// Helper function to provide a sleep time interval for the inifinite query loop in continouslyRefreshJobQueue()
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
  })

  // Runs asyncrhonously and reloads the jobqueue
  const continouslyRefreshJobQueue = async () => {
    while (true) {
      await delay(MS_TIME_BETWEEN_REFRESH)
      sendRequest()
    }
  }

  // This fires once on page load and then everytime the state changes which is a bit of a waste
  useEffect(()=>{
    if ( isFirstPageLoad ) {
      continouslyRefreshJobQueue()
      isFirstPageLoad = false
    }
    return
  },[]) // Why do we need an empty array at the end again?

	// Dynamically rebuild the joblist from the api response
  // React will automatically rebuild it whenever the api response changes)
  const queuedJobList = response?.data.map(renderSingleQueuedJobElement)

  return (
    <div className="rounded bg-black px-1 py-1 shadow-md">
      { queuedJobList }
    </div>
  )
}