import React, { Component, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom/client'

import './styles/index.css'

// Components
import NAVBAR from './components/navbar/index'
import HERO_INTRO from './components/Hero_intro/index'
import Prompt from './components/prompt/index'
import JOB_QUEUE from './components/job-queue/index'
import GALLERY from './components/gallery/index'
import axios from 'axios'

document.title = "Extropic"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <NAVBAR /> */}
    <div className="py-1 min-w-full max-w-6xl">
      <HERO_INTRO />
      <div className='py-0 px-5'>
        <Prompt />
        <div className='py-8'></div>
        <JOB_QUEUE />
      </div>
      <div className='py-8'></div>
      <div className='px-6'>
        <GALLERY />
      </div>
    </div>

  </React.StrictMode >
);

//import reportWebVitals from './reportWebVitals/reportWebVitals';
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();