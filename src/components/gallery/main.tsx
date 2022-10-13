import React, { useState, useEffect, SetStateAction, useContext } from 'react';
import { Waypoint } from "react-waypoint";

import axios from 'axios';

// Emits one gallery image element
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

// TODO: This should be set by the asynchronous query and should use a state hook to it rerenders
// For testing purposes set this to a low value to not overload the web traffic
const NEWEST_COMPLETED_JOBID = 350

export default function Gallery() {

  const data = [
    {
      id: 1,
      text: String(NEWEST_COMPLETED_JOBID - 1),
    },
  ]

  for (let i = 2; i < NEWEST_COMPLETED_JOBID; i++) {
    data.push({ id: i, text: String(NEWEST_COMPLETED_JOBID - i) })
  }

  const useInfiniteScroll = (data: any, limit: any, page: any) => {
    const ending = limit * page + 1;
    return data.slice(0, ending);
  }

  const INFINITE_GALLERY = () => {
    const limit = 1
    const [page, setPage] = useState(1);
    const completed_jobs = useInfiniteScroll(data, limit, page);
    return (
      <div className="">
        {completed_jobs.map((element: any) => (
          <React.Fragment key={element.id}>
            < GALLERY_IMAGE img_url={element.text} />

            {element.id - 1 === limit * page ? (
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