import React, { useState, useEffect, SetStateAction, useContext, useReducer } from 'react'
import axios from 'axios'

// Emits one gallery image element, displaying both the picture and the corresponding prompt
// TODO: should display seed too!
// Prompt component for each gallery image
function Prompt(props: any) {
	return <div className="text-center
  ">{props.job.prompt}
		<p className="text-zinc-600">{props.job.seed} </p>
	</div>
}

export function GALLERY_IMAGE(props: any) {
	const IMG_API_URL = "https://extropic.art/api/0/img?type=thumbnail?jobid="
	const JOB_URL = "https://extropic.art/api/0/jobs?jobid="

	// Set up reactive variable jobMetadData for use by each gallery image element
	const [jobMetaData, setJobMetaData] = useState(
		{
			"jobid": "0", "seed": "loading..", "prompt": "loading..", "job_status": "completed", "iteration_status": 0, "iteration_max": 250, "img_path": "https://extropic.art/api/0/img?jobid=0"
		})
	useEffect(() => {
		axios.get(JOB_URL + props.jobid).then(resp => {
			setJobMetaData(resp.data)
		})
	}, []); //empty array as second argument so the request only fires once per element
	// if this is ommited react will fire this every time GALLERY_IMAGE is rerendered causing an infinite loop 

	//opacity-50 hover:opacity-100 
	return (
		<div className="opacity-100 hover:opacity-100" >

			<div className='bg-black rounded 
      shadow-xl  shadow-[#db5481]/25
			'
			>

				<a href={IMG_API_URL + props.jobid} target="_blank" rel="noopener noreferrer">
					<img className='mx-auto justify-center
          hover:cursor-pointer'
						/* onClick={() => alert(props.jobid)} */
						src={IMG_API_URL + props.jobid} />
				</a>

				<div className="px-1 py-1 rounded
          shadow-xl  shadow-[#db5481]/10
          bg-black"> <Prompt job={jobMetaData} />
				</div>

			</div>

			<div className="py-4 bg-transparent"></div>
		</div >
	)
}
