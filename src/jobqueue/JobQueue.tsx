import { stringify } from 'querystring'
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
function RenderJobPrompt(props: any) {
    return (

      <div className=''>
       <div className="hover:text-white hover:cursor-pointer
         sm:text-xs md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl
         px-1 py-1"
         onClick={() => alert(props.jobid)} >
         {props.prompt} 
       </div>
      </div>
    )
}

// Render single progress bar for an element in the job list
function RenderProgressBar(props: any) {

  const ProgressBar = () => {
    return (
        <div className='h-1 w-full bg-slate-900 rounded animate-pulse'>
            <div
                style={{ width: `${props.percentage}%`}}
                className={`h-full ${
                    props.percentage < 70 ? 'bg-pink-600' : 'bg-blue-600'}`}>
            </div>
        </div>
      )
    }

          if (props.job_status === "processing" ) {
        return(
          <div>
            < ProgressBar />
            </div>
          )
        }
   return( <div className="py-2"></div>)
  }


// <JobQueue /> dynamically renders the current job queue by making requests to the api/1/queue
export default function JobQueue() {

  // Custom axios react hook for GET-ing a list of jobs from the /queue
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
  const emitNewJobListElement = (job: any) => {
  const percentage = job.iteration_status / job.iteration_max * 100

    return ( 

      // TODO? Does this need to be an actual <li> list? And does this need key props?
     <div className="" key={job.job_id} >
       <RenderJobPrompt prompt={job.prompt} jobid={job.jobid} />
       <RenderProgressBar job_status={job.job_status} percentage={percentage} />
     </div>
    )
  }
  const queuedJobList = response?.data.map(emitNewJobListElement)

  return (
    <div className="rounded bg-black px-1 py-1 shadow-md">

      { queuedJobList }

    </div>
  )
}