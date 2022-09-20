import React, {useState, useEffect, SetStateAction} from 'react';

import axios from 'axios';

import {Heading} from '../components/heading';
import {Loader} from '../components/loader';
import {GalleryImage} from '../components/galleryImage';

// import { FC } from 'react'; // Function component from react, return type we can use for strict typscript typing

export default function Gallery() {

  const [images, setImages]:SetStateAction<any> = useState([]);

  useEffect(() => {
      const apiRoot = "https://exia.art/api/0/img?type=thumbnail?jobid="
      const imgNumber = "242"
      axios
        .get(`${apiRoot}${imgNumber}`)
        //.then(res=>console.log(res.data)) //log debug info of the api data response in console
        .then(res => setImages([...images, ...res.data]))
    }, []) //empty array needed here so it doesnt do it every time

   return (
     		<React.Fragment>
          <br></br>
          <div className='text-xl py-4'>Insert Infinite scroll gallery here</div>
          
           <Heading />
           <Loader />
           <GalleryImage />
    
         <div> Image 1 </div>
         <div> Image 2</div>
         <div> Image 3</div>
         <div> Image ...</div>
         </React.Fragment>
  );

}