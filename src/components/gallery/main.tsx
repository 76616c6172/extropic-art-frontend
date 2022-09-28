import React, { useState, useEffect, SetStateAction } from 'react';

import axios from 'axios';

// import { FC } from 'react'; // Function component from react, return type we can use for strict typscript typing

export default function Gallery() {

  const [images, setImages]: SetStateAction<any> = useState([]);

  useEffect(() => {
    const apiRoot = "https://exia.art/api/0/img?type=thumbnail?jobid="
    const imgNumber = "242"
    axios
      .get(`${apiRoot}${imgNumber}`)
      //.then(res=>console.log(res.data)) //log debug info of the api data response in console
      .then(res => setImages([...images, ...res.data]))
  }, []) //empty array needed here so it doesnt do it every time

  return (

    /* 
      <Heading />
      <Loader />
      <GalleryImage />
 
    <div> Image 1 </div>
    <div> Image 2</div>
    <div> Image 3</div>
    <div> Image ...</div>
    </div>
     <div className='text-xl py-4'>Insert Infinite scroll gallery here</div>
   */


    <div className=' bg-black rounded'>

      <img className='mx-auto justify-center
          border-black rounded-t-md py-5
          opacity-40 hover:opacity-100 hover:cursor-pointer'
        src="https://exia.art/api/0/img?type=thumbnail?jobid=446" />

      <img className='rounded mx-auto justify-center py-2
          opacity-40 hover:opacity-100 hover:cursor-pointer'
        src="https://exia.art/api/0/img?type=thumbnail?jobid=445" />

      <img className='rounded mx-auto justify-center py-2
          opacity-40 hover:opacity-100 hover:cursor-pointer'
        src="https://exia.art/api/0/img?type=thumbnail?jobid=444" />

      <img className='rounded mx-auto justify-center py-2
          opacity-40 hover:opacity-100 hover:cursor-pointer'
        src="https://exia.art/api/0/img?type=thumbnail?jobid=443" />

      <img className='rounded mx-auto justify-center py-2
          opacity-40 hover:opacity-100 hover:cursor-pointer'
        src="https://exia.art/api/0/img?type=thumbnail?jobid=442" />


    </div>


  );

}