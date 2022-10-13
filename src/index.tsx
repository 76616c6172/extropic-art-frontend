import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
//import reportWebVitals from './reportWebVitals/reportWebVitals';

// Import Components
import NAVBAR from './components/navbar/main'
import GALLERY from './components/gallery/main'
import LIVE_LOG_STREAM from './components/live-log-stream/main'
import JOB_QUEUE from './components/job-queue/main'
import PROMPT from './components/prompt/main'

document.title = "Exia"

// Render the page
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>

    {/* <NAVBAR /> */}
    <div className="py-2 min-w-full max-w-6xl">
      {/*(<LIVE_LOG_STREAM/>*/}
      <div className='px-4'>
        <PROMPT />
      </div>

      <div className='py-2 px-5'>
        <JOB_QUEUE />
      </div>

      <div className='py-40 px-1'>
        <p>Welcome to project exia. Run state of the art machine learning models in the cloud to generate high resolution images from just text!</p>
      </div>



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
