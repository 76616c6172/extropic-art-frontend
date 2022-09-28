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
    <div className="py-6 min-w-full max-w-6xl">
      {/*(<LIVE_LOG_STREAM/>*/}
      {/*<PROMPT />*/}
      <JOB_QUEUE />
      <div className='py-1'></div>
      <GALLERY />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
