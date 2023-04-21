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
	const [open, setOpen] = useState(1);
	const handleOpen = (value: any) => {
		setOpen(open === value ? 0 : value);
	};

	const model: { [key: string]: string } = {
		"-1": "[ UPSCALED: esrgan-v1-x2plus ]",
		"1": "Openjourney 1.5",
		"2": "Stable Diffusion 2.1",
		"3": "Openjourney 2",
		"4": "Abyss Orange Mix 2",
		"5": "Vintedois Diffusion 0.2",
		"6": "Pastel Mix",
		"7": "Stable Diffusion XL",
	};

	return (
		<div onClick={() => setOpen(2)}>
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

				<AccordionBody className=" px-1 accent-black">
					<p className="text-zinc-500 mx-auto  text-base">
						status: {props.job.job_status}
					</p>
				</AccordionBody>
			</Accordion>
		</div >
	)
}
/*
const handlePromptSubmission = () => {
	const headers = {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	}

	axios.post("https://extropic.art/api/1/jobs",
		{
			model_pipeline: modelPipeline,
			resolution: resolution,
			prompt: prompt,
			lock_seed: isCustomSeed,
			seed: seed,
			high_guidance: isHighGuidance,
			pre_prompt: isEnablePrePrompt,
			upscale: isUpScale,
		},
		{ headers: headers }
	).then((result) => {
		setSubMissionButtonIsBusy(false)
	}).catch(err => {
		console.log(err)
		setSubMissionButtonIsBusy(false)
	})
}
*/



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
				<a href={IMG_API_URL + props.jobid} target="_blank" rel="noopener noreferrer">
					<img className='mx-auto justify-center
          							hover:cursor-pointer'
						/* onClick={() => alert(props.jobid)} */
						src={IMG_API_URL + props.jobid} />
				</a>

				<div className="px-1 py-1 rounded hover:shadow-indigo-600/10 shadow-xl max-w-5xl
          			bg-black"> <Prompt job={jobMetaData} />
				</div>

			</div>

			<div className="py-8 bg-transparent"></div>
		</div >
	)
}
