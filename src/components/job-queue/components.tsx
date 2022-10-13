/* This file contans react UI components that are used to build up the JOB_QUEUE */

// Outputs jsx for the prompt component of a single job
export function JOB_PROMPT(props: any) {
	return (
		<div className=''>
			<div className="hover:text-zinc-100 hover:cursor-pointer
        text-zinc-400
         sm:text-xs md:text-lg lg:text-lg xl:text-lg 2xl:text-2xl
         px-1"
				onClick={() => alert("TODO: open jobid: " + props.jobid + " in new tab")} >
				{props.prompt}
			</div>
		</div>
	)
}

// Outputs jsx for the progress bar component of a single job
export function PROGRESS_BAR(props: any) {
	const BAR = () => {
		return (
			<div className='h-1 w-full bg-black rounded animate-pulse px-1'>
				<div
					style={{ width: `${props.percentage}%` }}
					className={`h-full ${props.percentage < 70 ? 'bg-pink-600' : 'bg-pink-600'}`}>
				</div>
			</div>
		)
	}

	if (props.job_status === "processing") {
		return (<div> <BAR /> </div>)
	}
	return (<div className="py-1"></div>)
}