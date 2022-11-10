import React, { Fragment, useState } from "react"
//import React, { useState } from 'react';

import Select from 'react-select';
//import { colourOptions } from '../data';

// import { setEnvironmentData } from "worker_threads"

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { stringify } from "querystring";

export default function PROMPT() {
  const [open, setOpen] = useState(1);

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };


  const Checkbox = ({ children, ...props }: JSX.IntrinsicElements['input']) => (
    <label style={{ marginRight: '1em' }}>
      <input type="checkbox" {...props} />
      {children}
    </label>
  );

  const [submissionButtonIsBusy, setSubMissionButtonIsBusy] = useState(false)
  const toggleFunc = () => {
    if (submissionButtonIsBusy == false) {
      setSubMissionButtonIsBusy(true)
    } else {
      setSubMissionButtonIsBusy(false)
    }
  }

  const [isClearable, setIsClearable] = useState(false);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [isHighGuidance, setHighGuidance] = useState(false); // low steps low guidance pipeline fast!
  const [isUpScale, setUpscale] = useState(false); // upscale pipeline
  const [isCustomSeed, setIsCustomSeed] = useState(false); // upscale pipeline

  //const options = ["1", "2", "3"]
  //const options = ["1", "2", "3"]


  const dropDownOptions = [
    {
      value: 1,
      label: "Stable Diffusion (512x512) - square",
      display: "Stable Diffusion (512x512)",
    },
    {
      value: "2",
      label: "Stable Diffusion (512x768) - portrait",
      display: "Stable Diffusion (512x768)",
    },
    {
      value: "3",
      label: "Stable Diffusion (768x512) - scenic",
      display: "Stable Diffusion (768x512)",
    }
  ]

  return (

    <Fragment>


      <div className="rounded bg-black
    px-1 py-2 shadow-xl  
    shadow-xl  shadow-[#db5481]/25
    ">

        {/* Model pipeline dropdown selection */}
        {/*isLoading={isLoading} //a prop that can be passed to the Selector to display a loading spinner..*/}
        <Select
          className="basic-single accent-black bg-black bg-black-primary hover:bg-black focus:bg-black active:bg-black"
          classNamePrefix="select"
          defaultValue={dropDownOptions[0]}
          isDisabled={isDisabled}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          options={dropDownOptions}
        />


        {/* Prompt text input field*/}
        <div className="py-1 ">
          <div>



          </div>
          <textarea className="
              bg-black flex-wrap
              form-control 
              block
              w-full
              px-5
              pb-20
              text-base
              border-none
              rounded
              transition
              ease-in-out
              m-0
              leading-tight 
              shadow appearance-none py-2 text-zinc-400 focus:outline-none focus:shadow-outline"
            id="prompt" placeholder="A beautiful painting of a singular lighthouse, shining its light across a tumultuous sea of blood by greg rutkowski and thomas kinkade, trending on Artstation..">
          </textarea>
        </div>

        {/* Advanced options expanding accordion*/}
        <div className="flex">
          <Accordion open={open === 2}>
            <div onClick={() => handleOpen(2)}
              className="hover:cursor-pointer text-zinc-400 hover:text-zinc-100
            sm:text-xs md:text-xs lg:text-s xl:text-s 2xl:text-md
            px-1"
            >

              <button className="py-1 px-1 rounded text-zinc-400 bg-black hover:text-zinc-100
              ">
                [ toggle advanced options ]
              </button>
            </div>
            <AccordionBody className="text-sm text-zinc-200
            px-1
          accent-black"
            >

              <React.Fragment>

                <div className="flex
                          text-zinc-400
 ">
                  <Checkbox
                    checked={isCustomSeed}
                    onChange={() => setIsCustomSeed((state) => !state)}
                  >
                  </Checkbox>
                  <input type="text"
                    className="
                    			text-xs
                          form-control
                          block
                          px-1
                          bg-black bg-clip-padding
                          border border-solid border-zinc-400
                          rounded
                          transition
                          ease-in-out
                          focus:text-gray-200 focus:bg-black focus:border-zinc-200 focus:outline-none
                        "
                    id="userSeedInput"
                    placeholder="provide custom seed"
                  />
                </div>


                <div>
                  <Checkbox
                    checked={isHighGuidance}
                    onChange={() => setHighGuidance((state) => !state)}
                  >
                    <text className="px-3" > high guidance </text>
                  </Checkbox>
                </div>

                <div>
                  <Checkbox
                    checked={isUpScale}
                    onChange={() => setUpscale((state) => !state)}
                  >
                    <text className="px-3" > upscale </text>
                  </Checkbox>
                </div>


                {/*}
              <Checkbox
                checked={isClearable}
                onChange={() => setIsClearable((state) => !state)}
              >
                Clearable
              </Checkbox>
              <Checkbox
                checked={isSearchable}
                onChange={() => setIsSearchable((state) => !state)}
              >
                Searchable
              </Checkbox>
              <Checkbox
                checked={isDisabled}
                onChange={() => setIsDisabled((state) => !state)}
              >
                Disabled
              </Checkbox>
              <Checkbox
                checked={isLoading}
                onChange={() => setIsLoading((state) => !state)}
              >
                Loading
              </Checkbox>
              <Checkbox checked={isRtl} onChange={() => setIsRtl((state) => !state)}>
                RTL
              </Checkbox>
  */}
              </React.Fragment>
            </AccordionBody>
          </Accordion>

        </div>

        {/*submission button*/}
        <div className="m-1">
          <button className="w-24 py-1 px-7 rounded text-white bg-black
            sm:text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xs
            border-solid border-2 border-sky-500
          hover:text-sky-500
            "
            onClick={() => toggleFunc()}>
            <div className="flex">
              <div className=""> <SubmissionButton buttonLoading={submissionButtonIsBusy} /> </div>
            </div>
          </button>
        </div>

      </div >

    </Fragment >
  );
}
function ButtonIsReady() {
  return (
    <div className="">
      submit
    </div>

  )
}

// Renders prompt submission button as loading spinner
function ButtonLoading() {
  return (
    <div className="flex px-1">
      <div className="m-1"> </div>
      <svg role="status" className="mr-2 self-center w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
      </svg>
    </div>
  )
}

// Renders prompt submission button when button is ready
function SubmissionButton(props: any) {
  if (props.buttonLoading) {
    return <ButtonLoading />;
  }
  return <ButtonIsReady />;
}

/*
export default function PROMPT() {

  const [submissionButtonIsBusy, setSubMissionButtonIsBusy] = useState("off")



          return (

          <div className="min-width-full py-1">

            <div className="rounded bg-black justify-center max-w-sm
         sm:text-xs md:text-md lg:text-md xl:text-lg 2xl:text-2xl
         px-4 py-4" >
              <div className="">
                Insert cool prompt component here.
              </div>

            </div>

            { /*

      <div className="py-2">
        <div> Testing: {submissionButtonIsBusy} </div>
        <button className="py-2 px-2 rounded bg-slate-600 hover:bg-slate-300" onClick={ () => toggleFunc() }>Toggle on/off</button>
      </div>
    }

    </div>

  );
}
*/