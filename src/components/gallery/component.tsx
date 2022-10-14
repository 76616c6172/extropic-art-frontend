// CONTAINS THE MAIN EXPORTED REACT COMPONENT OF THIS FOLDER WITH THE SAME NAME
// TODO: CLEAN THIS CODE

import React, { useState, useEffect, SetStateAction, useContext } from 'react';
import { Waypoint } from "react-waypoint";

import axios from 'axios';
// import { LatestJobContext } from '../..';

// Emits one gallery image job_object
export function GALLERY_IMAGE(props: any) {
  const IMG_URL = "https://exia.art/api/0/img?type=thumbnail?jobid="
  const JOB_URL = "https://exia.art/api/0/jobs?jobid="

  return (
    <div>
      <img className='mx-auto justify-center
          border-black rounded-t-md py-5
          opacity-50 hover:opacity-100 hover:cursor-pointer'
        onClick={() => alert(props.jobid)}
        src={IMG_URL + props.jobid} />
      <div className="px-5">Wide-angle shot of The Emperor of Mankind facing off against Horus Lupercal on the bridge of the Vengeful Spirit, in the background is the Eye of Terror, detailed, high-definition, realistic shading, inspired by Adrian Smith, Neil Roberts, John Michelbach</div>
      {/* <p>{JOB_URL + props.jobid} </p> */}
    </div>

  )
}

// TODO this should ne updated asyncrhonously

export default function Gallery() {

  //let NEWEST_COMPLETED_JOBID = useContext(LatestJobContext)
  // FIXME: Don't hardcode this, this should autoupdate
  const NEWEST_COMPLETED_JOBID = 446


  // Define an array of "job objects" that is then used to build the gallery
  // TODO: Probably will need to change the implementation details so that react does not
  // reload all images when the first element changes
  const job_list = [
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
    job_list.push({ id: id, jobid: String(i) })
    id++
  }

  //  Define a func to return only the slice of the job list that has to be rendered
  const useInfiniteScroll = (job_list: any, limit: any, page: any) => {
    const ending = limit * page + 1;
    return job_list.slice(0, ending);
  }

  const INFINITE_GALLERY = () => {
    const limit = 3
    const [page, setPage] = useState(1);
    const rendered_image_list = useInfiniteScroll(job_list, limit, page);
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
    <div className=' bg-black rounded'>
      < INFINITE_GALLERY />
    </div>
  );
}