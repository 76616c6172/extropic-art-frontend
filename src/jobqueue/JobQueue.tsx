import React from 'react'
import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import useAxios from "../utils/UseAxios"

const url = "https://exia.art/api/1"

// Sleep a milisecond time interval
function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

// This function executes once on pageload
// TODO: make it use hooks to rerender when data changes while requests for in background
export default function JobQueue() {

  const { response, loading, error, sendData } = useAxios({
    method: "get",
    url: `${url}/queue`,
    headers: {
      accept: '*/*'
    }
  });

// Reload the Job Queue list by firing useAxios every 5000ms, this is triggered from send data
// Due to the hooks the UI element will rerender automatically after the update
// FIXME: Currently due to how useAxios is implemented, this currently refreshes twice everytime
const refreshJobQueue = async () => {
  while (true) {
    await delay(5000)
    sendData()
  //setContent(response?.data)
  }
}

// Fire off the queue refresh on pageload
useEffect(()=>{
  refreshJobQueue();
},[]); //not sure how this syntax works at the end, see fireship

  // TODO:
  // Insert logic that fetches periodically through the API and builds the correct job queue
  // Use state hook somehow so the JobQueue element rerenders when the state (aka the jobqueue) changes
  const queuedJobList = response?.data.map ( (job: string) => {
       return <button className="hover:text-white break-all
       sm:text-xs md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl
       px-1 py-1"

       onClick={() => console.log("click trigger")}
       ># / {job} </button> })


  return ( <div className="rounded bg-black px-1 py-1 shadow-md">
      { queuedJobList }
    </div>
  )
}