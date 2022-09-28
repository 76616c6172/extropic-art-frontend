import { useEffect } from 'react'
// Import helper funcs
import { useAxios } from './funcs'
import { Delay } from './funcs'
// Local components used by the main component
import { JOB_PROMPT } from './components'
import { PROGRESS_BAR } from './components'
// Globally scoped vars
const URL = "https://exia.art/api/1"
const MS_TIME_BETWEEN_REFRESH = 5000
let IS_FIRST_PAGE_LOAD = true

// Rebuild the joblist from the api response, react will rebuilds it whenever the api response changes
const map_jobs_to_list_component = (Job: any) => {
  const percentage = Job.iteration_status / Job.iteration_max * 100
  return (
    // TODO? Does this need to be an actual <li> list? And does this need key props?
    <div className="" key={Job.job_id} >
      <JOB_PROMPT prompt={Job.prompt} jobid={Job.jobid} />
      <PROGRESS_BAR job_status={Job.job_status} percentage={percentage} />
    </div>
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
      await Delay(MS_TIME_BETWEEN_REFRESH)
      sendRequest()
    }
  }
  // Fire the live queue request loop only once on page load
  useEffect(() => {
    if (IS_FIRST_PAGE_LOAD) {
      continouslyRefreshJobQueue()
      IS_FIRST_PAGE_LOAD = false
    }
    return
  }, []) // Why do we need an empty array at the end again?

  const job_list_componenet = response?.data.map(map_jobs_to_list_component)

  return (
    <div className="rounded bg-black px-1 py-1 shadow-md">
      {job_list_componenet}
    </div>
  )
}