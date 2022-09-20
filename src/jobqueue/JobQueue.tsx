import React from 'react';

export default function JobQueue() {

  // TODO:
  // Insert logic that fetches periodically through the API and builds the correct job queue
  // Use state hook somehow so the JobQueue element rerenders when the state (aka the jobqueue) changes
  const exampleJobs: string[] = [
    "Portrait of Darth Vader, painted in ian mcque style drawn by vania zouravliov and takato yamamoto, inspired by Star Wars, intricate acrylic gouache painting, high detail, sharp high detail, artstation",
    "3d render of celestial space nebula, cosmic, space station, unreal engine 3, photorealistic materials, trending on Artstation",
    "Design only, 2050 s retro future art blueprint borders lines decorations space machine. muted colors. by jean baptiste monge"
  ];

  const jobList = exampleJobs.map ( (job) => {
       return <div className="rounded bg-black hover:text-indigo-600
       sm:text-xs md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl
       px-1 py-1
       "> # / {job} </div> })

  return ( <React.Fragment> { jobList } </React.Fragment> )
}