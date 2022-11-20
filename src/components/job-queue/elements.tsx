// CONTAINS ALL EXPORTED REACT ui ELEMENTS THAT RENDER JSX AND ARE USED BY THE PARENT COMPONENT
// THE FOLDER THIS FILE IS IN IS NAMED AFTER THE PARENT COMPONENT

// Outputs jsx for the prompt component of a single job
export function JOB_PROMPT(props: any) {
	// Unused tailwind classes
	// On hover should be text-sinc-100 when on click is implemented
	// onClick={() => alert("TODO: open jobid: " + props.jobid + " in new tab")} >
	// hover:cursor-pointer
	if (props.pulse) {
		return (
			<div className=''>
				<div className="animate-pulse
        text-zinc-100
         sm:text-xs md:text-lg lg:text-lg xl:text-lg 2xl:text-2xl
         px-1"
				>
					{props.prompt}
				</div>
			</div>
		)
	}
	return (
		<div className=''>
			<div className="
        text-zinc-400
         sm:text-xs md:text-lg lg:text-lg xl:text-lg 2xl:text-2xl
         px-1"
			>
				{props.prompt}
			</div>
		</div>
	)
}

// Outputs jsx for the progress bar component of a single job
export function PROGRESS_BAR(props: any) {

	const BAR = () => {

		return (
			<div className='h-1 w-full bg-black rounded px-1'>
				<div
					style={{ width: `${props.percentage}%` }}
					className={`h-full ${props.percentage < 70 ? 'bg-pink-600' : 'bg-pink-600'}`}>
				</div>
			</div>
		)
	}

	if (props.job_status === "processing") {
		return (<div className="animate-pulse"> <BAR /> </div>)
	}
	return (<div className="py-1"></div>)
}