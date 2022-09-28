import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'

// The Components
import Navbar from './navbar/Navbar'
import Gallery from './gallery/Gallery'
import LiveLog from './livelog/LiveLog'
import JobQueue from './jobqueue/JobQueue'
import Prompt from './prompt/Prompt'

//import reportWebVitals from './reportWebVitals/reportWebVitals';

document.title = "Exia"


// Render the page
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
  {/* <Navbar /> */ }
  <div className="py-6 min-w-full max-w-6xl">
      {/*(<LiveLog/>*/}
      <Prompt />
      <JobQueue />
      <Gallery />
  </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
