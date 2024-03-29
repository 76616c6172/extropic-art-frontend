import React, { useState, useEffect, SetStateAction, useContext, useReducer } from 'react'
import axios from 'axios'

import {
	Accordion,
	AccordionHeader,
	AccordionBody,
} from "@material-tailwind/react";

// Emits one gallery image element, displaying both the picture and the corresponding prompt
// TODO: should display seed too!
// Prompt component for each gallery image
function Prompt(props: any) {
	const [submissionButtonIsBusy, setSubMissionButtonIsBusy] = useState(false)
	const [open, setOpen] = useState(1);
	const handleOpen = (value: any) => {
		setOpen(open === value ? 0 : value);
	};

	const model: { [key: string]: string } = {
		"-1": "[ Upscaled ]",
		"1": "Openjourney 1.5",
		"2": "Stable Diffusion 2.1",
		"3": "Openjourney 2",
		"4": "Abyss Orange Mix 2",
		"5": "Vintedois Diffusion 0.2",
		"6": "Pastel Mix",
		"7": "Stable Diffusion XL",
	};

	const handleUpscaleSubmission = (j: any) => {
		const headers = {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		}
		console.log(j)
		setSubMissionButtonIsBusy(true)
		axios.post("https://extropic.art/api/1/jobs",
			{

				model_pipeline: -1,
				prompt: j.prompt,
				upscale: true,
				seed: j.seed.toString(),
				lock_seed: true,
				resolution: parseInt(j.jobid)
			},
			{ headers: headers }
		).then((result) => {
			setSubMissionButtonIsBusy(false)
		}).catch(err => {
			console.log(err)
			setSubMissionButtonIsBusy(false)
		})
	}

	function toggleOpen() {
		setOpen(open === 1 ? 2 : 1);
	}


	return (
		<div onClick={() => toggleOpen()} >
			<div className="text-center break-words" >
				<div >
					{props.job.prompt}
				</div>
				<div className="text-zinc-600">
					{model[props.job.model_id]}
				</div>
				<div className="text-zinc-600">
					{props.job.seed}
				</div>
			</div>

			<Accordion open={open === 2}>
				<div
					className="text-center
              		hover:cursor-pointer text-zinc-400 
            		sm:text-lg md:text-lg lg:text-lg xl:text-s 2xl:text-lg
            		px-1 py-0"
				>
				</div>

				{props.job.model_id !== "-1" && (
					<AccordionBody className=" px-1 accent-black">
						{/*submission button*/}
						<div className="">

							<p className="text-zinc-600 mx-auto text-center text-base hover:text-white hover:cursor-pointer"
								onClick={() => handleUpscaleSubmission(props.job)}

							>
								<div className="">
									<div className=""> <SubmissionButton buttonLoading={submissionButtonIsBusy} /> </div>
								</div>
							</p>

						</div>
					</AccordionBody>
				)}

			</Accordion>
		</div >
	)
}

// Renders prompt submission button as loading spinner
function ButtonLoading() {
	return (
		<div> sending...</div>
	)
}

// Renders prompt submission button as loading spinner
function ButtonIsReady() {
	return (
		<div> upscale</div>
	)
}

// Renders prompt submission button when button is ready
function SubmissionButton(props: any) {
	if (props.buttonLoading) {
		return <ButtonLoading />;
	}
	return <ButtonIsReady />;
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
      shadow-xl
    hover:shadow-indigo-500/25
			'
			>
				<img
					className='mx-auto justify-center
					hover:cursor-pointer'
					src={IMG_API_URL + props.jobid} />

				<div className="px-1 py-1 rounded hover:shadow-indigo-600/10 shadow-xl max-w-5xl
          			bg-black"> <Prompt job={jobMetaData} />
				</div>

			</div>

			<div className="py-8 bg-transparent"></div>
		</div >
	)
}
