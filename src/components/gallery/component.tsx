// CONTAINS THE MAIN EXPORTED REACT COMPONENT OF THIS FOLDER WITH THE SAME NAME
// TODO: CLEAN THIS CODE

import React, { useState, useEffect, SetStateAction, useContext } from 'react';
import { Waypoint } from "react-waypoint";

import axios from 'axios';

// Emits one gallery image job_object
export function GALLERY_IMAGE(props: any) {
  const IMG_URL = "https://exia.art/api/0/img?type=thumbnail?jobid="
  const JOB_URL = "https://exia.art/api/0/jobs?jobid="

  return (
    <div>
      <img className='mx-auto justify-center
          border-black rounded-t-md py-5
          opacity-50 hover:opacity-100 hover:cursor-pointer'
        onClick={() => alert(props.img_url)}
        src={IMG_URL + props.img_url} />
      <p>{JOB_URL + props.img_url} </p>
    </div>

  )
}

const NEWEST_COMPLETED_JOBID = 350

export default function Gallery() {

  // Define an array of "job objects" that is then used to build the gallery
  const job_list = [
    {
      id: 1,
      img_url: String(NEWEST_COMPLETED_JOBID - 1),
    },
  ]
  // TODO SCALING CHANGE:
  // Build out the full list of completed job objects based on the latest completed job
  // This will have to be changed to not build all the way down to job 1
  // But rather depend on how far the user has scrolled, else it won't scale to 1000x jobs
  for (let i = 2; i < NEWEST_COMPLETED_JOBID; i++) {
    job_list.push({ id: i, img_url: String(NEWEST_COMPLETED_JOBID - i) })
  }

  //  Define a func to return only the slice of the job list that has to be rendered
  const useInfiniteScroll = (job_list: any, limit: any, page: any) => {
    const ending = limit * page + 1;
    return job_list.slice(0, ending);
  }

  const INFINITE_GALLERY = () => {
    const limit = 1
    const [page, setPage] = useState(1);
    const completed_jobs = useInfiniteScroll(job_list, limit, page);
    return (
      <div className="">
        {completed_jobs.map((job_object: any) => (
          <React.Fragment key={job_object.id}>
            < GALLERY_IMAGE img_url={job_object.img_url} />

            {job_object.id - 1 === limit * page ? (
              <Waypoint onEnter={() => setPage(page + 1)} />) : null}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className=' bg-black rounded'>
      < INFINITE_GALLERY />
    </div>
  );
}