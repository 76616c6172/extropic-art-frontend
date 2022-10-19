// CONTAINS THE MAIN EXPORTED REACT COMPONENT OF THIS FOLDER WITH THE SAME NAME
// TODO: CLEAN THIS CODE

import React, { useState, useEffect, SetStateAction, useContext } from 'react'
import { Waypoint } from "react-waypoint"
import { useAxios } from "./funcs"
import { Delay } from "./funcs"
import { TEST } from "../../index" //testing importing "global state variable"
import axios from 'axios'
import { prototype } from 'events'



// import { LatestJobContext } from '../..';

// TODO: Don't hardcode this
const JOB_QUEUE_STATE_CHANGED = false

const IMG_API_URL = "https://exia.art/api/0/img?type=full?jobid="

var loaded = false

// Emits one gallery image job_object
export function GALLERY_IMAGE(props: any) {
  const IMG_API_URL = "https://exia.art/api/0/img?type=full?jobid="
  const JOB_URL = "https://exia.art/api/0/jobs?jobid="
  const [jobMetaData, setJobMetaData] = useState(
    {
      "jobid": "0", "prompt": "loading..", "job_status": "completed", "iteration_status": 0, "iteration_max": 250, "img_path": "https://exia.art/api/0/img?jobid=0"
    })
  useEffect(() => {
    axios.get(JOB_URL + props.jobid).then(resp => {
      setJobMetaData(resp.data)
    })
  }, []); //empty array as second argument so the request only fires once per element
  // if this is ommited react will fire this every time GALLERY_IMAGE is rerendered causing an infinite loop 

  //opacity-50 hover:opacity-100 
  return (
    <div className="opacity-80 hover:opacity-100" >

      <div className='bg-black rounded 
      shadow-xl  shadow-[#db5481]/25 '
      >


        <a href={IMG_API_URL + props.jobid} target="_blank" rel="noopener noreferrer">
          <img className='mx-auto justify-center
          hover:cursor-pointer'
            /* onClick={() => alert(props.jobid)} */
            src={IMG_API_URL + props.jobid} />
        </a>

        <div className="px-1 py-1 rounded
shadow-xl  shadow-[#db5481]/10
          bg-black"> <Prompt job={jobMetaData} />
        </div>

      </div>



      <div className="py-4 bg-transparent"></div>
    </div >
  )
}

const URL = "https://exia.art/api/1"
const MS_TIME_BETWEEN_REFRESH = 5000
let IS_FIRST_PAGE_LOAD = true
let RECEIVED_DATA_FROM_QUEUE_API = false
let OLD_RESPONSE: any = null
let COUNTER = 1
var NEW_RESPONSE: any = null

// Helper function that sets RESPONSE to the passed in value
export function Update_Response(props: any) {
  NEW_RESPONSE = props.response
  return (
    <div></div>
  )
}


// Prompt component for each gallery image
function Prompt(props: any) {
  return <div className="text-center
  ">{props.job.prompt}</div>
}

export default function Gallery() {
  const NEWEST_COMPLETED_JOBID = 220



  //OLD_RESPONSE = response?.data[2]


  //  if (OLD_RESPONSE.data != response?.data) {
  //  }


  // Define an array of "job objects" that is then used to build the gallery
  // TODO: Probably will need to change the implementation details so that react does not
  // reload all images when the first element changes
  const gallery_items_list = [
    {
      id: 1,
      jobid: String(NEWEST_COMPLETED_JOBID),
    },
  ]
  // TODO SCALING CHANGE:
  // Build out the full list of completed job objects based on the latest completed job
  // This will have to be changed to not build all the way down to job 1
  // But rather depend on how far the user has scrolled, else it won't scale to 1000x jobs
  let id = 2
  for (let i = NEWEST_COMPLETED_JOBID - 1; i > 0; i--) {
    gallery_items_list.push({ id: id, jobid: String(i) })
    id++
  }

  //  Define a func to return only the slice of the job list that has to be rendered
  const useInfiniteScroll = (gallery_items_list: any, limit: any, page: any) => {
    const ending = limit * page + 1;
    return gallery_items_list.slice(0, ending);
  }

  // Declare the ininite scrolling gallery
  const INFINITE_GALLERY = (props: any) => {
    const limit = 3
    const [page, setPage] = useState(1);
    const rendered_image_list = useInfiniteScroll(gallery_items_list, limit, page);

    return (
      <div className="">
        {rendered_image_list.map((job_object: any) => (
          <React.Fragment key={job_object.id}>
            < GALLERY_IMAGE jobid={job_object.jobid} />
            {job_object.id - 1 === limit * page ? (
              <Waypoint onEnter={() => setPage(page + 1)} />) : null}
          </React.Fragment>
        ))}
      </div>
    );
  }


  let [dynamicImgList, setDyanmicImgList] = useState([
    {
      id: 0, //starting valuej
      jobid: "0", //placeholder
    },
  ])



  // Declare the gallery component that autoupdates with new completed jobs above the scrolling one
  // To add images above the infinite gallery, simply add jobs to this array
  const LIVE_GALLERY = () => {

    // Set up custom Axios hook for making API requests to the api/0/queue endpoint
    const { response, loading, error, sendRequest } = useAxios({
      method: "GET",
      url: `${URL}/queue`,
      headers: {
        accept: '*/*'
      }
    })

    // maps an array [ {jobid: 300}, {jobid: 200} ] and adds all items to the live gallery
    const update_img_list = (j: any) => {
      const new_list = dynamicImgList
      new_list.push(
        {
          id: COUNTER,
          jobid: j.jobid
        },
      )
      setDyanmicImgList(new_list)
      COUNTER++
    }

    // Asynchrounously makes requests to check the live job queue over and over
    const continouslyRefreshJobQueue = async () => {
      while (true) {
        // change the auto refreshing list component
        // Here add the function to add tco the img list as jobs finish from the queue
        if (RECEIVED_DATA_FROM_QUEUE_API) {
          //console.log("old:", OLD_RESPONSE)
          //console.log("new:", NEW_RESPONSE)
          // BUG BUG BUG
          // the simple problem the next line will be executed before the data has been received so it doesn't work!
          // SOLUTION:
          // I need to call another function in the same way I called delay that finshes when data has been received
          // And I need to make a new api endpoint api/2/status that shows the last completed job
          //console.log(response?.data)
          //OLD_RESPONSE.map(update_img_list)
        }
        await Delay(MS_TIME_BETWEEN_REFRESH)
        sendRequest()
      }
    }


    // Fire the live queue request loop only once on page load
    useEffect(() => {
      if (IS_FIRST_PAGE_LOAD) {
        continouslyRefreshJobQueue()
        // set NEWEST_COMPLETED_JOBID
        //OLD_RESPONSE = response?.data
        IS_FIRST_PAGE_LOAD = false
      }
      return
    }, []) // Why do we need an empty array at the end again?

    /// check the first image list item
    if (dynamicImgList[0].jobid == "0" || RECEIVED_DATA_FROM_QUEUE_API) {
      if (response?.data.length > 0) {
        //console.log("response has length greater 1")
        //console.log("saving response data")
        OLD_RESPONSE = response?.data
        RECEIVED_DATA_FROM_QUEUE_API = true
      }


    }
    // check the oldest job in the queue
    if (response?.data[response.data.length - 1].jobid == 1) {
      console.log(response?.data)
    }

    // Only render this element when new jobs move "down" from the queue
    if (dynamicImgList.length > 1) {
      return (
        <div className="">
          {dynamicImgList.slice(0).reverse().map((job_object: any) => (
            <React.Fragment key={job_object.id}>
              < GALLERY_IMAGE jobid={job_object.jobid} />

              {/* FIXME: Crazy ugly  hack to update the NEW_RESPONSE variable */}
              {!loading && (
                <Update_Response response={response?.data}></Update_Response>
              )}

            </React.Fragment>
          ))}
        </div>
      )
    } else {
      return (<div></div>)
    }
  }

  return (
    <div>
      < Update_Response />
      < LIVE_GALLERY />
      < INFINITE_GALLERY />
    </div>
  );
}
