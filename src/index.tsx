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

    <div className="bg-black">

      {/* <NAVBAR /> */}
      <div className="flex items-center
      flex-col  justify-center
      ">

        <section className="bg-black">

          <div className="py-0 min-w-full max-w-6xl">
            <HERO_INTRO />
          </div>
        </section>

      </div>

    </div>

    <div className="py-6"></div>

    <div className="flex items-center
      flex-col  justify-center
      ">

      <section>
        <div className="py-0 min-w-full max-w-6xl">
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
      </section>
    </div>

  </React.StrictMode >
);

//import reportWebVitals from './reportWebVitals/reportWebVitals';
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();