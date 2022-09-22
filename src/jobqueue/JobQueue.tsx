import { useEffect } from 'react';
import useAxios from "../utils/UseAxios"

const url = "https://exia.art/api/1"

// Helper function to provide a sleep time interval for the inifinite query loop in refreshJobQueue()
function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

// The "main" function that is called by <JobQueue />
export default function JobQueue() {

  const { response, loading, error, sendRequest } = useAxios({
    method: "get",
    url: `${url}/queue`,
    headers: {
      accept: '*/*'
    }
  });

// refreshJobQueue runs asyncrhonously and reloads the jobqueue 
// Due to the hooks the UI element will rerender automatically after the update
// FIXME: Currently due to how useAxios is implemented, this currently refreshes twice everytime
const refreshJobQueue = async () => {
  while (true) {
    await delay(5000)
    sendRequest()
  }
}

// Fire off the queue refresh on pageload
useEffect(()=>{
  refreshJobQueue();
},[]); //not sure how this syntax works at the end, see fireship

  // TODO:
  // Insert logic that fetches periodically through the API and builds the correct job queue
  // Use state hook somehow so the JobQueue element rerenders when the state (aka the jobqueue) changes
  const queuedJobList = response?.data.map ( (job: string) => 
{
return    <div className="hover:text-white hover:cursor-pointer
          sm:text-xs md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl
          px-1 py-1"
          onClick={() => console.log("click trigger")} >
          {job}
        </div>
}
    )

  return ( <div className="rounded bg-black px-1 py-1 shadow-md">
      { queuedJobList }
    </div>
  )
}

// A single prompt/job element in the queue list
function ListElement(props: string) {
  return (
    <div className="hover:text-white hover:cursor-pointer
      sm:text-xs md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl
      px-1 py-1"
      onClick={() => console.log("click trigger")}
    > {props} </div>
  )
} 