// CONTAINS THE MAIN EXPORTED REACT COMPONENT OF THIS FOLDER WITH THE SAME NAME
// TODO: CLEAN THIS CODE

import React, { useState, useEffect, SetStateAction, useContext } from 'react'
import { Waypoint } from "react-waypoint"
import { useAxios } from "./funcs"
import { Delay } from "./funcs"
import { TEST } from "../../index" //testing importing "global state variable"
import axios from 'axios'
import { prototype } from 'events'

const URL = "https://exia.art/api/1"
const MS_TIME_BETWEEN_REFRESH = 5000

var DID_SET_NEWEST_JOB = false
var IS_FIRST_PAGE_LOAD = true
var RECEIVED_DATA_FROM_QUEUE_API = false
var LIVE_NEWEST_COMPLETED_JOB: string = ""
var OLD_NEWEST_COMPLETED_JOB: any = null
var COUNTER = 1

// Emits one gallery image job_object
export function GALLERY_IMAGE(props: any) {
  const IMG_API_URL = "https://exia.art/api/0/img?type=full?jobid="
  const JOB_URL = "https://exia.art/api/0/jobs?jobid="

  // Set up reactive variable jobMetadData for use by each gallery image element
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



// Prompt component for each gallery image
function Prompt(props: any) {
  return <div className="text-center
  ">{props.job.prompt}</div>
}

export default function Gallery() {

  var [NEWEST_COMPLETED_JOB_ON_FIRST_LOAD, setNewesstJobOnFirstLoad] = useState(0)



  //OLD_RESPONSE = response?.data[2]


  //  if (OLD_RESPONSE.data != response?.data) {
  //  }


  // Define an array of "job objects" that is then used to build the gallery
  // TODO: Probably will need to change the implementation details so that react does not
  // reload all images when the first element changes
  const gallery_items_list = [
    {
      id: 1,
      jobid: String(NEWEST_COMPLETED_JOB_ON_FIRST_LOAD),
    },
  ]

  // TODO SCALING CHANGE:
  // Build out the full list of completed job objects based on the latest completed job
  // This will have to be changed to not build all the way down to job 1
  // But rather depend on how far the user has scrolled, else it won't scale to 1000x jobs

  let id = 2
  for (let i = NEWEST_COMPLETED_JOB_ON_FIRST_LOAD - 1; i > 0; i--) {
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
    const update_img_list = (i: string) => {
      const new_list = dynamicImgList
      new_list.push(
        {
          id: COUNTER,
          jobid: i
        },
      )
      setDyanmicImgList(new_list)
      COUNTER++
    }

    // Asynchrounously makes requests to check the live job queue over and over
    const continouslyRefreshJobQueue = async () => {
      while (true) {
        sendRequest()
        axios.get(URL + "/status").then((result) => {
          OLD_NEWEST_COMPLETED_JOB = LIVE_NEWEST_COMPLETED_JOB
          LIVE_NEWEST_COMPLETED_JOB = result.data.newest_completed_job

          //console.log(LIVE_NEWEST_COMPLETED_JOB)

          if (DID_SET_NEWEST_JOB && LIVE_NEWEST_COMPLETED_JOB != OLD_NEWEST_COMPLETED_JOB) {
            // Push the difference in jobids
            const live_newest_completed_job = parseInt(LIVE_NEWEST_COMPLETED_JOB)
            const old_newest_completed_job = parseInt(OLD_NEWEST_COMPLETED_JOB)
            const number_of_new_completed_jobs = live_newest_completed_job - old_newest_completed_job

            //build the array to be pushed to the live gallery

            // Push it
            for (var i = live_newest_completed_job; i > old_newest_completed_job; i--) {
              update_img_list(i.toString())
              console.log("pushed jobd:", i)
            }
          }








          if (!DID_SET_NEWEST_JOB) {
            setNewesstJobOnFirstLoad(parseInt(LIVE_NEWEST_COMPLETED_JOB))
            DID_SET_NEWEST_JOB = true
          }

        }).catch(err => {
          console.log(err)
        })
        await Delay(MS_TIME_BETWEEN_REFRESH)
      }
    }
    // Fire the live queue request loop only once on page load
    useEffect(() => {
      if (IS_FIRST_PAGE_LOAD) {
        continouslyRefreshJobQueue()
        IS_FIRST_PAGE_LOAD = false
        // set NEWEST_COMPLETED_JOB_ON_FIRST_LOAD
        //OLD_RESPONSE = response?.data
      }
      return
    }, []) // Empty array so this only happens on first page load and not every time the component reloads

    /*
    /// check the first image list item
    if (dynamicImgList[0].jobid == "0" || RECEIVED_DATA_FROM_QUEUE_API) {
      if (response?.data.length > 0) {
        //console.log("response has length greater 1")
        //console.log("saving response data")
        console.log(response?.data)
        OLD_RESPONSE = response?.data
        RECEIVED_DATA_FROM_QUEUE_API = true
      }
    }
      */

    const List_element = dynamicImgList.slice(0).reverse().map((job_object: any) => (
      <React.Fragment key={job_object.id}>
        < GALLERY_IMAGE jobid={job_object.jobid} />
      </React.Fragment>
    ))


    // Only render this element when new jobs move "down" from the queue
    if (dynamicImgList.length > 0) {
      return (
        <div className="">
          {dynamicImgList.slice(0).reverse().map((job_object: any) => (
            <React.Fragment key={job_object.id}>
              < GALLERY_IMAGE jobid={job_object.jobid} />

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
      < LIVE_GALLERY />
      < INFINITE_GALLERY />
    </div>
  );
}
