import React, { useContext, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
//import reportWebVitals from './reportWebVitals/reportWebVitals';

// Import React Components
import NAVBAR from './components/navbar/component'
import GALLERY from './components/gallery/component'
import LIVE_LOG_STREAM from './components/live-log-stream/component'
import JOB_QUEUE from './components/job-queue/component'
import PROMPT from './components/prompt/component'
import axios from 'axios'

document.title = "extropic - art"
//export const LatestJobContext = React.createContext(446);

export var TEST = "meep"
const API_URL_STATUS_ENDPOINT = "https://extropic.art/api/0/status"
var STATUS_RESPONSE: any

// Render the page
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* <LatestJobContext.Provider value={446} > */}

    {/* 
      <NAVBAR />
      <LIVE_LOG_STREAM />
    */}
    <div className="py-1 min-w-full max-w-6xl">
      <div className='py-4'> </div>
      <div className='py-2 px-5'>
        <PROMPT />
        <div className='py-2'></div>
        <JOB_QUEUE />
      </div>
      <div className='py-10'> </div>

      {
      /* 
      <div className='px-1'>
        <p>Welcome to project exia. Run state of the art machine learning models in the cloud to generate high resolution images from just text!</p>
      </div>

      <div className='py-20'></div>
    */}

      <div className='py-10'></div>

      <div className='px-6'>
        <GALLERY />
      </div>

    </div>

    {/* </LatestJobContext.Provider> */}

  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
