import React, { useState, useEffect, SetStateAction, useContext, useReducer } from 'react'
import { Waypoint } from "react-waypoint"
import { useAxios } from "./funcs"
import { Delay } from "./funcs"
import axios from 'axios'

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import { GALLERY_IMAGE } from './elements'

const URL = "https://extropic.art/api/1"
const JOBS_API_URL = "https://extropic.art/api/0/jobs?jobid="
const MS_TIME_BETWEEN_REFRESH = 2000

var LIVE_GAL_NOT_FIRED_LOOP = true
var GALLERY_REQUEST_NOT_FIRED = true
var DID_SET_NEWEST_JOB = false

var COUNTER = 1
var LIVE_NEWEST_COMPLETED_JOB: string = ""
var OLD_NEWEST_COMPLETED_JOB: any = null

var DID_SET_NEWEST_JOB = false

// Experimental Update hook?
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update state to force render
}

// Experimental
// Declare the gallery component that autoupdates with new completed jobs above the scrolling one
// To add images above the infinite gallery, simply add jobs to this array
function Live_Gallery(): JSX.Element {
  const forcefully_update_the_live_gallery_component = useForceUpdate()

  const [newestJob, setNewestJob] = useState(0)
  // Asynchrounously makes requests to check the live job queue over and over
  const continouslyRefreshJobQueue = async () => {
    while (true) {

      axios.get(URL + "/status").then((result) => {
        OLD_NEWEST_COMPLETED_JOB = LIVE_NEWEST_COMPLETED_JOB
        LIVE_NEWEST_COMPLETED_JOB = result.data.newest_completed_job
        const live_newest_completed_job = parseInt(LIVE_NEWEST_COMPLETED_JOB)
        const old_newest_completed_job = parseInt(OLD_NEWEST_COMPLETED_JOB)

        if (!DID_SET_NEWEST_JOB) {
          setNewestJob(parseInt(LIVE_NEWEST_COMPLETED_JOB))
          DID_SET_NEWEST_JOB = true
        }


        if (DID_SET_NEWEST_JOB && (old_newest_completed_job != live_newest_completed_job)) {

          // Push the newly completed jobs to the live gallery element
          for (var i = live_newest_completed_job; i > old_newest_completed_job; i--) {
            axios.get(JOBS_API_URL + i.toString()).then((result) => {
              console.log(result.data)
              if (result.data.job_status == "completed") {
                update_img_list((i + 1).toString())
                forcefully_update_the_live_gallery_component()
              }
            }
            )
          }
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
    }
    return
  }, []) // Empty array so this only happens on first page load and not every time the component reloads

  // the gallery is actually two components, one that is updated by changes in the queue and one that is based on the status
  const [dynamicImgList, setDyanmicImgList] = useState([
    {
      id: 0, //starting value
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


  // Only render this element when new jobs move "down" from the queue
  if (dynamicImgList.length > 0) {
    return (
      <div className="">
        {dynamicImgList.slice(1).reverse().map((job_object: any) => (
          <React.Fragment key={job_object.id}>
            < GALLERY_IMAGE jobid={job_object.jobid} />

          </React.Fragment>
        ))}
      </div>
    )
  }
  return (
    <div>
      <React.Fragment>
      </React.Fragment>
    </div>)
}


export default function GALLERY() {

  const [newestJobOnFirstLoad, setNewestJobOnFirstLoad] = useState(0)
  const get_newest_completed_job = async () => {
    axios.get(URL + "/status").then((result) => {
      setNewestJobOnFirstLoad(parseInt(result.data.newest_completed_job))
    }).catch(err => {
      console.log(err)
    })
  }

  // Fire the live queue request loop only once on page load
  useEffect(() => {
    // Do we really need this check? I'm not sure but I'm paranoid because idk the useEffect hook well enough
    if (GALLERY_REQUEST_NOT_FIRED) {
      get_newest_completed_job()
      GALLERY_REQUEST_NOT_FIRED = false
    }
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