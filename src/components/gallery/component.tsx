// CONTAINS THE MAIN EXPORTED REACT COMPONENT OF THIS FOLDER WITH THE SAME NAME
// TODO: CLEAN THIS CODE

import React, { useState, useEffect, SetStateAction, useContext, useReducer } from 'react'
import { Waypoint } from "react-waypoint"
import { useAxios } from "./funcs"
import { Delay } from "./funcs"
import { TEST } from "../../index" //testing importing "global state variable"
import axios from 'axios'
import { prototype } from 'events'

import { GALLERY_IMAGE } from './elements'

const URL = "https://exia.art/api/1"
const MS_TIME_BETWEEN_REFRESH = 5000

var LIVE_NEWEST_COMPLETED_JOB: string = ""
var OLD_NEWEST_COMPLETED_JOB: any = null

var LIVE_GAL_NOT_FIRED_LOOP = true
var GAL_NOT_FIRED_LOOP = true

var DID_SET_NEWEST_JOB = false

var COUNTER = 1

// Experimental
var PUSH_NEW_JOBS = false
// Declare the gallery component that autoupdates with new completed jobs above the scrolling one
// To add images above the infinite gallery, simply add jobs to this array
function Live_Gallery(): JSX.Element {

  var DID_SET_NEWEST_JOB = false

  const [newestJob, setNewestJob] = useState(0)
  // Asynchrounously makes requests to check the live job queue over and over
  const continouslyRefreshJobQueue = async () => {
    while (true) {
      axios.get(URL + "/status").then((result) => {
        OLD_NEWEST_COMPLETED_JOB = LIVE_NEWEST_COMPLETED_JOB
        LIVE_NEWEST_COMPLETED_JOB = result.data.newest_completed_job

        if (!DID_SET_NEWEST_JOB) {
          setNewestJob(parseInt(LIVE_NEWEST_COMPLETED_JOB))
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
    if (LIVE_GAL_NOT_FIRED_LOOP) {
      continouslyRefreshJobQueue()
      LIVE_GAL_NOT_FIRED_LOOP = false
      // set NEWEST_COMPLETED_JOB_ON_FIRST_LOAD
      //OLD_RESPONSE = response?.data
    }
    return
  }, []) // Empty array so this only happens on first page load and not every time the component reloads

  // BIG
  // Image list related
  const [dynamicImgList, setDyanmicImgList] = useState([
    {
      id: 0, //starting valuej
      jobid: "0", //placeholder
    },
  ])



  // takes i the jobid of a newly completed job and pushes it to the live gallery
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



  // Experiment update the image list
  if (PUSH_NEW_JOBS) {
    if (DID_SET_NEWEST_JOB && LIVE_NEWEST_COMPLETED_JOB != OLD_NEWEST_COMPLETED_JOB) {
      PUSH_NEW_JOBS = true
      // Push the difference in jobids
      const live_newest_completed_job = parseInt(LIVE_NEWEST_COMPLETED_JOB)
      const old_newest_completed_job = parseInt(OLD_NEWEST_COMPLETED_JOB)
      const number_of_new_completed_jobs = live_newest_completed_job - old_newest_completed_job
      //build the array to be pushed to the live gallery
      // Push it
      for (var i = live_newest_completed_job; i >= old_newest_completed_job; i--) {
        update_img_list(i.toString())
        console.log("pushed jobd:", i)
      }
    }




    /*
        const List_element = dynamicImgList.slice(0).reverse().map((job_object: any) => (
          <React.Fragment key={job_object.id}>
            < GALLERY_IMAGE jobid={job_object.jobid} />
          </React.Fragment>
        ))
        */
  }

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
  }
  return (
    <div>
      <React.Fragment></React.Fragment>
    </div>)
}

export default function GALLERY() {

  const [newestJobOnFirstLoad, setNewestJobOnFirstLoad] = useState(0)
  // Asynchrounously makes requests to check the live job queue over and over
  const continouslyRefreshJobQueue = async () => {
    while (true) {
      axios.get(URL + "/status").then((result) => {
        OLD_NEWEST_COMPLETED_JOB = LIVE_NEWEST_COMPLETED_JOB
        LIVE_NEWEST_COMPLETED_JOB = result.data.newest_completed_job

        if (!DID_SET_NEWEST_JOB) {

          //[NEWEST_COMPLETED_JOB_ON_FIRST_LOAD, setNewestJobOnFirstLoad] = useEffect(parseInt(LIVE_NEWEST_COMPLETED_JOB))
          setNewestJobOnFirstLoad(parseInt(LIVE_NEWEST_COMPLETED_JOB))

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
    if (GAL_NOT_FIRED_LOOP) {
      continouslyRefreshJobQueue()
      GAL_NOT_FIRED_LOOP = false
      // set NEWEST_COMPLETED_JOB_ON_FIRST_LOAD
      //OLD_RESPONSE = response?.data
    }
    return
  }, []) // Empty array so this only happens on first page load and not every time the component reloads



  // Define an array of "job objects" that is then used to build the gallery
  // TODO: Probably will need to change the implementation details so that react does not
  // reload all images when the first element changes
  const gallery_items_list = [
    {
      id: 1,
      jobid: String(newestJobOnFirstLoad),
    },
  ]

  // TODO SCALING CHANGE:
  // Build out the full list of completed job objects based on the latest completed job
  // This will have to be changed to not build all the way down to job 1
  // But rather depend on how far the user has scrolled, else it won't scale to 1000x jobs
  let id = 2
  for (let i = newestJobOnFirstLoad - 1; i > 0; i--) {
    gallery_items_list.push({ id: id, jobid: String(i) })
    id++
  }

  //  Define a func to return only the slice of the job list that has to be rendered
  const useInfiniteScroll = (gallery_items_list: any, limit: any, page: any) => {
    const ending = limit * page + 1;
    return gallery_items_list.slice(0, ending);
  }

  // Declare the ininite scrolling gallery
  const Infinite_Gallery = (props: any) => {
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


  return (
    <div>
      < Live_Gallery />
      < Infinite_Gallery />
    </div>
  );
}
