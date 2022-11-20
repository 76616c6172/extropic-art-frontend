import React, { Fragment, useState } from "react"
//import React, { useState } from 'react';

import Select from 'react-select';

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import axios from "axios";

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
  const handlePromptSubmission = () => {
    /*
    console.log(prompt)
    console.log("model Pipeline: ", modelPipeline)
    console.log("use custom seed: ", isCustomSeed)
    console.log("seed: ", seed)
    console.log("high guidance: ", isHighGuidance)
    console.log("upscale: ", isUpScale)
    */

    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }

    setSubMissionButtonIsBusy(true)
    axios.post("https://extropic.art/api/1/jobs",
      {
        model_pipeline: modelPipeline,
        resolution: resolution,
        prompt: prompt,
        lock_seed: isCustomSeed,
        seed: seed,
        high_guidance: isHighGuidance,
        upscale: isUpScale,
      },
      { headers: headers }
    ).then((result) => {
      setSubMissionButtonIsBusy(false)
    }).catch(err => {
      console.log(err)
      setSubMissionButtonIsBusy(false)
    })

    /*
    const response = async () => {
      const resp = await axios.post("https://extropic.art/api/1/jobs/",
        {
          prompt: prompt
        }
      )
      console.log("yo")
      //resp.data.data
      //resp.data.headers['Content-Type']
    }
    */


  }

  const [isClearable, setIsClearable] = useState(false);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [isHighGuidance, setHighGuidance] = useState(false);
  const [isMakeVariations, setIsMakeVariations] = useState(true);
  const [isEnablePrePrompt, setIsEnablePrePrompt] = useState(true);
  const [isUpScale, setUpscale] = useState(false); // upscale pipeline
  const [isCustomSeed, setIsCustomSeed] = useState(false); // upscale pipeline

  //const options = ["1", "2", "3"]
  //const options = ["1", "2", "3"]


  const dropDownOptionsModelPipeline = [
    {
      value: 1,
      label: "Stable Diffusion (Midjourney v4 fine tune)",
      display: "Stable Diffusion (Midjourney v4 fine tune)",
    },
    /* 
    // TODO implement vanilla sd and disco diffusion inference pipelines
    {
      value: 2,
      label: "Stable Diffusion (1.5)",
      display: "Stable Diffusion (1.5)",
    },
    {
      value: 3,
      label: "Disco Diffusion (5.61)",
      display: "Stable Diffusion (5.61)",
    }
    */
  ]

  const dropDownOptionsResolution = [
    {
      value: 1,
      label: "512x512",
      display: "512x512",
    },
    {
      value: 2,
      label: "512x768",
      display: "512x768",
    },
    {
      value: 3,
      label: "768x512",
      display: "768x512",
    }
  ]


  // set up stateful user prompt input meta data
  const [prompt, setPrompt] = useState("")
  const [seed, setSeed] = useState("")
  const [modelPipeline, setModelPipeline] = useState(1)
  const [resolution, setResolution] = useState(1)
  // track and save the user provided metadata for job submissions
  const handlePromptChange = (a: any) => {
    setPrompt(a.target.value)
  }
  const handleSeedChange = (a: any) => {
    setSeed(a.target.value)
  }
  const handleModelPipelineChange = (a: any) => {
    setModelPipeline(a.value)
  }
  const handleResolutionChange = (a: any) => {
    setResolution(a.value)
  }

  /*
  // Display special status message
      <div className="">
        <blockquote className="border-l-4 border-green-500 text-white animate-pulse
          p-4 my-4  dark:bg-black bg-black"
        >
          STATUS: GPU is online
        </blockquote>
      </div>
  */

  return (

    <Fragment>

      <div className="">
        <blockquote className="border-l-4 border-green-500 text-white animate-pulse
          p-4 my-4  dark:bg-black bg-black"
        >
          STATUS: GPU worker pod offline
        </blockquote>
      </div>



      <div className="rounded bg-black
    px-1 py-2 shadow-xl  
    shadow-xl  shadow-[#db5481]/25
    ">

        {/* Model pipeline dropdown selection */}
        {/*isLoading={isLoading} //a prop that can be passed to the Selector to display a loading spinner..*/}
        <div>
          <Select
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary: '#db5481',
                primary25: '#000000',
                text: '#000000',
                neutral0: '#000000',
                neutral5: '#000000',
                neutral10: '#000000',
                neutral20: '#000000',
                neutral30: '#000000',
                primary50: '#db5481', //selection flash on click
                neutral80: '#ffffff', // title
                neutral90: '#0000000',

              },
            })}
            className="basic-single accent-black bg-black bg-black-primary hover:bg-black focus:bg-black active:bg-black border-solid border-black
          "
            classNamePrefix="select"
            onChange={handleModelPipelineChange}
            defaultValue={dropDownOptionsModelPipeline[0]}
            isDisabled={isDisabled}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            options={dropDownOptionsModelPipeline}
          />
        </div>

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
              border-noneg
              rounded
              transition
              ease-in-out
              m-0
              leading-tight 
              shadow appearance-none py-2 text-zinc-400 focus:outline-none focus:shadow-outline"
            id="prompt"
            onChange={handlePromptChange}
            placeholder=" > _ ">
          </textarea>
        </div>

        <div className="flex">

          {/* Advanced options expanding accordion*/}
          <Accordion open={open === 2}>
            <div
              className="text-xs flex flex-wrap
              hover:cursor-pointer text-zinc-400 hover:text-zinc-100
            sm:text-xs md:text-xs lg:text-s xl:text-s 2xl:text-md
            px-1 py-1"
            >

              {/*submission button*/}
              <div className="">
                <div className="">
                  <button className="w-24 py-3 m-1
              mx-auto
              rounded text-white bg-black text-xs
              sm:text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xs
              border-solid border-2 border-sky-500
                hover:text-sky-500
                "
                    onClick={() => handlePromptSubmission()}>
                    <div className="">
                      <div className=""> <SubmissionButton buttonLoading={submissionButtonIsBusy} /> </div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="px-0.5"></div>



              {/*resolution selector dropdown*/}
              <div className="rounded
                w-28 m-1
                border-solid border-zinc-800 hover:border-zinc-700
                bg-black
                hover:text-zinc-100 border-2 hover:bg-zinc-70 ">
                <Select
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary: '#db5481',
                      primary25: '#000000',
                      text: '#000000',
                      neutral0: '#000000',
                      neutral5: '#000000',
                      neutral10: '#000000',
                      neutral20: '#000000',
                      neutral30: '#000000',
                      primary50: '#db5481', //selection flash on click
                      neutral80: '#ffffff', // title
                      neutral90: '#0000000',

                    },
                  })}
                  className="basic-single accent-black bg-black bg-black-primary hover:bg-black focus:bg-black active:bg-black border-solid border-black
          "
                  classNamePrefix="select"
                  onChange={handleResolutionChange}
                  defaultValue={dropDownOptionsResolution[0]}
                  isDisabled={isDisabled}
                  isClearable={isClearable}
                  isRtl={isRtl}
                  isSearchable={isSearchable}
                  options={dropDownOptionsResolution}
                />
              </div>



              {/*advanced options button*/}
              <button
                onClick={() => handleOpen(2)}
                className="rounded 
              text-zinc-300 w-24  m-1
              border-solid  border-zinc-800 hover:border-zinc-700
               bg-black
               hover:text-zinc-100 border-2 hover:bg-zinc-700 
              ">
                advanced options
              </button>


            </div>
            <AccordionBody className="text-sm text-zinc-200 rounded
            px-1 
          accent-black"
            >
              <React.Fragment>

                <div>
                  <Checkbox
                    checked={isEnablePrePrompt}
                    onChange={() => setIsEnablePrePrompt((state) => !state)}
                  >
                    <text className="px-3" > enable aesthetic pre-prompt: "mdjrny-v4 style" </text>
                  </Checkbox>
                </div>

                { /*}
                <Checkbox
                  checked={isMakeVariations}
                  onChange={() => {
                    setIsMakeVariations((state) => !state);
                  }
                  }
                >
                  <text className="text-zinc-200 px-4">
                    make variations
                  </text>
                </Checkbox>
                */ }


                <div>
                  <Checkbox
                    checked={isHighGuidance}
                    onChange={() => setHighGuidance((state) => !state)}
                  >
                    <text className="px-3" > enable experimental high step count + high guidance scale </text>
                  </Checkbox>
                </div>


                <div className="flex
                          text-zinc-400 ">

                  <Checkbox
                    checked={isCustomSeed}
                    onChange={() => {
                      setIsCustomSeed((state) => !state)
                    }
                    }
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
                    onChange={handleSeedChange}
                    placeholder="lock seed"
                  />

                </div>



                {/*
                <div>
                  <Checkbox
                    checked={isUpScale}
                    onChange={() => setUpscale((state) => !state)}
                  >
                    <text className="px-3" > upscale </text>
                  </Checkbox>
                </div>
              */}


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
              </Checkbox> */}
              </React.Fragment>
              <div className="py-0">
                { /* more options can go here.. */}
              </div>
            </AccordionBody>
          </Accordion>
        </div >




      </div >



    </Fragment >
  );
}
function ButtonIsReady() {
  return (
    <div className="">
      submit </div>
  )
}

// Renders prompt submission button as loading spinner
function ButtonLoading() {
  return (
    <div>
      <div className=""> </div>
      <svg role="status" className="mx-auto
      w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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