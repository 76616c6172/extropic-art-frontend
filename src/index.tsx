import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import reportWebVitals from './reportWebVitals/reportWebVitals';
//import App from './example/App';
import Navbar from './navbar/Navbar';
import Gallery from './gallery/Gallery'

document.title = "Exia"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <React.StrictMode>
    <Navbar />

      <Gallery />

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
