import React from 'react';

export default function LiveLog() {
  return (

    <div className='py-2 '>

      <div className="rounded bg-black min-w-full px-1 py-1 ">
      {/* <div className='table-header-group '  >Scheduler log</div> */}
        {/* <div className="text-center">Queue</div> */}
        <div className="rounded text-xs"> [scheduler] 2022 1400 waiting for job.. </div>
        <div className="rounded text-xs"> [scheduler] found jobid 40112.. </div>
        <div className="rounded text-xs"> [scheduler] found worker 23423-32sfds2-dsfdsf23-32432432.. </div>
        <div className="rounded text-xs"> [scheduler] assigned jobid 40112 to worker 23424-2943294-3243242432</div>
        <div className="rounded text-xs"> [scheduler] 2022 1400 waiting for job.. </div>
       </div>

     </div>

  );
}