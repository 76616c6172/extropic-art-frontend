import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
//import reportWebVitals from './reportWebVitals/reportWebVitals';

// Import Components
import NAVBAR from './components/navbar/main'
import GALLERY from './components/gallery/main'
import LIVE_LOG_STREAM from './components/live-log-stream/main'
import JOB_QUEUE from './components/job-queue/component'
import PROMPT from './components/prompt/component'

document.title = "Exia"

// Render the page
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>

    {/* 
    <NAVBAR />
    <LIVE_LOG_STREAM />
    <PROMPT />
    */}
    <div className="py-1 min-w-full max-w-6xl">

      <div className='py-4'> </div>

      <div className='py-2 px-5'>
        <JOB_QUEUE />
      </div>

      <div className='py-10'></div>

      {/* 
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
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
