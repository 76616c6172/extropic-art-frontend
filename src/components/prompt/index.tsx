import React, { Fragment, useState } from "react"
import { EnhanceAI } from "enhanceai"
//import React, { useState } from 'react';

import Select from 'react-select';

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import axios from "axios";

function TopStatusMessage() {
  return (
    <div>
      <div className="">
        <blockquote className="border-l-4  animate-pulse
        border-[#db5481]
          p-4 my-4  dark:bg-black bg-black"
        >
          <p className="text-white">
            STATUS: Temporarily reverted back to SD 1.5 (Mj Finetune)
          </p>
        </blockquote>
      </div>

      <div className="">
        {/*
        <blockquote className="border-2 border-pink-600
          p-4 my-4  dark:bg-black bg-black"
        >
          <div className="text-zinc-100"></div>
          <p>
            Hi there! This page has become very popular recently. I'm happy you like it :) </p>

          <p className="py-1"></p>

          <p> However processing your prompts is computationally very intensive - due to recent super high demand I've temporarily disabled public prompt submissions, until I code up some kind of daily usage limit. I should have that working by tomorrow! You can find me on the internet <a className="text-white" href="https://twitter.com/76616c6172/"> here</a>.
          </p>

          <p className="py-1"></p>

          <p>If you're technical enough you can run the current model on your own GPUs for free! (see <a className="text-white" href="https://huggingface.co/prompthero/openjourney"> this repo</a> on huggingface)</p>

        </blockquote>
  */}
      </div >
    </div>
  )

}

export default function Prompt() {
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
  const [isClearable, setIsClearable] = useState(false)
  const [isSearchable, setIsSearchable] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRtl, setIsRtl] = useState(false)
  const [isHighGuidance, setHighGuidance] = useState(false)
  const [isMakeVariations, setIsMakeVariations] = useState(true)
  const [isEnablePrePrompt, setIsEnablePrePrompt] = useState(true)
  const [isUpScale, setUpscale] = useState(false)
  const [isCustomSeed, setIsCustomSeed] = useState(false)
  const steps = [10, 20, 30, 40, 50]


  const handlePromptSubmission = () => {
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

  const dropDownOptionsModelPipeline = [
    {
      value: 1,
      label: "Openjourney 1.5",
      display: "Openjourney 1.5",
    },
    //{
    //  value: 2,
    //  label: "Stable Diffusion 2.1",
    //  display: "Stable Diffusion 2.1",
    //},
    // {
    //   value: 3,
    //   label: "Openjourney 2",
    //   display: "Openjourney 2",
    // },
    {
      value: 4,
      label: "Abyss Orange Mix 2",
      display: "Model: Abyss Orange Mix 2",
    },
    //{
    //  value: 5,
    //  label: "Vintedois Diffusion 0.2",
    //  display: "Vintedois Diffusion 0.2",
    //},
    {
      value: 6,
      label: "Pastel Mix",
      display: "Pastel Mix",
    },
    {
      value: 7,
      label: "Stable Diffusion XL",
      display: "Stable Diffusion XL",
    },
    /*
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
      label: "512x512 square",
      display: "512x512",
    },
    {
      value: 2,
      label: "512x768 portrait",
      display: "512x768",
    },
    {
      value: 3,
      label: "768x512 landscape",
      display: "768x512",
    },
    //
    //    {
    //      value: 4,
    //      label: "1024x512 ultrawide",
    //      display: "1024x512",
    //    },
    //    {
    //      value: 5,
    //      label: "512x1024 long",
    //      display: "512x1024",
    //    },
    //    {
    //      value: 6,
    //      label: "768x768 square lg",
    //      display: "768x768",
    //    },
    //    {
    //      value: 7,
    //      label: "768x1024 portrait lg",
    //      display: "768x1024",
    //    },
    //    {
    //      value: 8,
    //      label: "1024x768 wide lg",
    //      display: "1024x768",
    //    },
  ]


  // set up stateful user prompt input meta data
  const [prompt, setPrompt] = useState("")
  const [seed, setSeed] = useState("enter seed number..")
  const [modelPipeline, setModelPipeline] = useState(7)
  const [resolution, setResolution] = useState(0)
  const [x_res, setX_res] = useState(steps[0]);

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setX_res(Number(event.target.value))
  };


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


      <div className="rounded bg-black
    shadow-xl
    hover:shadow-indigo-600/25
    ">

        <div className="flex">

          <div className="flex ">
            <div className="pl-2 py-[0.4rem] "> </div>

            {/* Model pipeline dropdown selection */}
            {/*isLoading={isLoading} //a prop that can be passed to the Selector to display a loading spinner..*/}
            <div className="w-max
            ">
              <div className="p-0.5 border-l-1 hover:border-solid rounded border-r-0 hover:bg-[#4F46E5]/40" >
                <Select
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary: '#4F46E5',
                      primary25: '#000000',
                      text: '#000000',
                      neutral0: '#000000',
                      neutral5: '#000000',
                      neutral10: '#000000',
                      neutral20: '#000000',
                      neutral30: '#000000',
                      primary50: '#4F46E5', //selection flash on click
                      neutral80: '#FFFFFF', // title
                      neutral90: '000000',

                    },
                  })}
                  className="basic-single accent-black bg-black bg-black-primary hover:bg-black focus:bg-black active:bg-black border-solid border-black
          "
                  classNamePrefix="select"
                  onChange={handleModelPipelineChange}
                  defaultValue={dropDownOptionsModelPipeline[3]}
                  isDisabled={isDisabled}
                  isClearable={isClearable}
                  isRtl={isRtl}
                  isSearchable={isSearchable}
                  options={dropDownOptionsModelPipeline}
                />
              </div>
            </div>
          </div>

          <div className="w-full"></div>


          <div className="flex">
            <div className="py-[0.4rem] pl-2">
            </div>

          </div>

        </div>


        {/* Prompt text input field*/}
        <div className="p-0.5 rounded hover:bg-[#4F46E5]/40
        ">
          <EnhanceAI context={"Image alt text:"}>
            <textarea className="
              bg-black flex-wrap
              form-control 
              block
              w-full
              px-5
              pb-16
              text-base
              border-noneg
              rounded
              transition
              ease-in-out
              m-0
              leading-tightu
              shadow appearance-none py-2 text-zinc-400 focus:outline-none focus:shadow-outline"
              id="prompt"
              onChange={handlePromptChange}
              placeholder="What do you want to see?">
            </textarea>
          </EnhanceAI>
        </div>




        {/* Advanced options expanding accordion*/}
        <Accordion open={open === 2}>
          <div
            className="text-xs flex flex-wrap
              hover:cursor-pointer text-zinc-400 hover:text-zinc-100
            sm:text-xs md:text-xs lg:text-s xl:text-s 2xl:text-md
            px-1 py-0"
          >
          </div>


          <AccordionBody className="text-sm text-zinc-200 rounded
          accent-black"
          >
            <React.Fragment>


              {/*
                modelPipeline == 0 &&
                <div>
                  <Checkbox
                    checked={isEnablePrePrompt}
                    onChange={() => setIsEnablePrePrompt((state) => !state)}
                  >
                    <text className="px-3" > enable aesthetic pre-prompt: "mdjrny-v4 style" </text>
                  </Checkbox>
                </div>
                */
              }

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






              { /*
              <div>
                <Checkbox
                  checked={isHighGuidance}
                  onChange={() => setHighGuidance((state) => !state)}
                >
                  <text className="px-3" > enable experimental high step count</text>
                </Checkbox>
              </div>
              */}

              <div className="flex
                          text-zinc-400 ">

                <div className="px-2">--</div>
                <div className="
                hover:cursor-pointer
                px-2"
                  onClick={() => { setIsCustomSeed(!isCustomSeed) }} >
                  {isCustomSeed ? <div className="text-white">seed locked: </div> : <div>seed: random </div>}

                </div>


                <div>
                  {isCustomSeed ?

                    <input type="text"
                      className="
                form-control
                block
                bg-black bg-clip-padding
                hover:border hover:border-solid border-zinc-400
                rounded
                transition
                ease-in-out
                focus:text-gray-200 focus:bg-black focus:border-zinc-200 focus:outline-none
                "
                      id="userSeedInput"
                      onChange={handleSeedChange}
                      placeholder={seed}
                    />
                    : null
                  }
                </div>


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


        <div className="flex">

          <div className="w-full">

            {/*resolution selector dropdown*/}
            <div className="p-0.5 border-l-1 hover:border-solid rounded border-r-0 hover:bg-[#4F46E5]/40" >
              <Select
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary: '#4F46E5',
                    primary25: '#000000',
                    text: '#000000',
                    neutral0: '#000000',
                    neutral5: '#000000',
                    neutral10: '#000000',
                    neutral20: '#000000',
                    neutral30: '#000000',
                    primary50: '#4F46E5', //selection flash on click
                    neutral80: '#0000000', // title
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
          </div>


          <div className="w-full text-zinc-200 rounded-bl bg-black " ></div>

          {/*advanced options button*/}
          { /* hover:bg-gradient-to-t hover:from-[#db5481]/50  */}
          <button
            onClick={() => handleOpen(2)}
            className=" 
              min-w-max
              w-24  px-3

            hover:text-white
            text-zinc-400
            bg-black


              ">
            options
          </button>

          {/*submission button*/}
          <div className="w-28">
            <button className="min-w-fit rounded-r
             w-20 py-2
             text-zinc-400 bg-black
             hover:text-white"
              onClick={() => handlePromptSubmission()}>
              <div className="">
                <div className=""> <SubmissionButton buttonLoading={submissionButtonIsBusy} /> </div>
              </div>
            </button>
          </div>


        </div>

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
    <div> sending...</div>
  )
  /*
  <div>
        <div className=""> </div>
        <svg role="status" className="mx-auto
    w-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
        </svg>
      </div>
      */
}

// Renders prompt submission button when button is ready
function SubmissionButton(props: any) {
  if (props.buttonLoading) {
    return <ButtonLoading />;
  }
  return <ButtonIsReady />;
}