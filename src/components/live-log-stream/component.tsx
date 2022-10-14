// Live stream of the main backend log output
export default function LIVE_LOG_STREAM() {
  return (

    <div className='py-2 '>
      <div className="rounded bg-black min-w-full px-1 py-1 ">
        <div className="rounded sm:text-xs md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl"> {/* autoscale based on screensize */}
          <div>[scheduler] 2022 1400 waiting for job..</div>
          <div> [scheduler] found worker 23423-32sfds2-dsfdsf23-32432432.. </div>
          <div> [scheduler] assigned jobid 40112 to worker 23424-2943294-3243242432</div>
          <div> [scheduler] 2022 1400 waiting for job.. </div>
        </div>
      </div>
    </div>

  );
}