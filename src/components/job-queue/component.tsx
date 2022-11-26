import React, { useEffect } from 'react'
// Import helper funcs
import { useAxios } from './funcs'
import { Delay } from './funcs'
// Local components used by the main component
import { JOB_PROMPT } from './elements'
import { PROGRESS_BAR } from './elements'


// Globally scoped vars
const URL = "https://extropic.art/api/1"
const MS_TIME_BETWEEN_REFRESH = 2000
let IS_FIRST_PAGE_LOAD = true

// Rebuild the joblist from the api response, react will rebuilds it whenever the api response changes
const map_jobs_to_list_component = (Job: any) => {
  // console.log(Job)
  const percentage = Job.iteration_status / Job.iteration_max * 100


  if (percentage > 0) {
    return (
      <React.Fragment key={Job.jobid}>
        <JOB_PROMPT prompt={Job.prompt} jobid={Job.jobid} pulse={true} />
        <PROGRESS_BAR job_status={Job.job_status} percentage={percentage} pulse={true} />
      </React.Fragment>
    )
  }
  return (
    <React.Fragment key={Job.jobid}>
      <JOB_PROMPT prompt={Job.prompt} jobid={Job.jobid} percentage={percentage} pulse={false} />
      <PROGRESS_BAR job_status={Job.job_status} percentage={percentage} pulse={false} />
    </React.Fragment>
  )
}


// The React component that displays live job queue
export default function JOB_QUEUE() {

  // Set up custom Axios hook for making API requests to the api/0/queue endpoint
  const { response, loading, error, sendRequest } = useAxios({
    method: "GET",
    url: `${URL}/queue`,
    headers: {
      accept: '*/*'
    }
  })

  // Asynchrounously makes requests to check the live job queue over and over
  const continouslyRefreshJobQueue = async () => {
    while (true) {
      sendRequest()
      await Delay(MS_TIME_BETWEEN_REFRESH)
    }
  }
  // Fire the live queue request loop only once on page load
  useEffect(() => {
    if (IS_FIRST_PAGE_LOAD) {
      continouslyRefreshJobQueue()
      IS_FIRST_PAGE_LOAD = false
    }
  }, []) // Empty array so this is only triggered once



  const build_job_queue_if_exists = () => {
    if (response?.data.queue != null) {
      return (response?.data.queue.map(map_jobs_to_list_component))
    }
    // Returns empty queue
    return (
      <React.Fragment key={0}>

        <div className="">

          <div className="text-center text-zinc-300">
            queue is empty
          </div>

          <div className="text-center text-zinc-600">
            {response?.data.freeUsesRemaining} rem
          </div>

        </div>
      </React.Fragment>
    )
  }

  // const job_list_componenet = build_job_queue_if_exists

  var job_list_componenet = build_job_queue_if_exists()
  // response?.data.map(map_jobs_to_list_component)

  return (
    <div className="rounded bg-black
    shadow-xl  shadow-[#db5481]/90
    ">

      <div className="center">

        <div className="flex rounded 
        border-zinc-800 
        px-2 py-1
        ">

          <div className=" text-white"> </div>
        </div>



        <div className="px-1 py-2">
          {job_list_componenet}


        </div>

      </div>


    </div>
  )
}