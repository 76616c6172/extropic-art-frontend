import { useMediaQuery } from 'react-responsive'

import React from 'react';
// import 'demo.mp4' from './mp4/demo.mp4'

class VideoPlayer extends React.Component {
  render() {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <video className=""
          src="https://extropic.art/demo.mp4"
          itemType="video/mp4"
          playsInline
          muted
          autoPlay
          loop
          style={{
            width: '50%}',
          }}
        />
        <div style={{
          position: 'static',
          color: 'white',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-20%)'

        }}>
          <div className="text-8xl text-white">
            Extropic
          </div>
        </div>
      </div>
    );
  }
}

class VideoPlayerSmall extends React.Component {
  render() {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <video className=""
          src="https://extropic.art/demo.mp4"
          itemType="video/mp4"
          playsInline
          muted
          autoPlay
          loop
          style={{
            width: '60%}',
          }}
        />
        <div style={{

          position: 'absolute',
          color: 'white',
          transform: 'translateY(440%)'

        }}>
          <div className="text-4xl text-center text-zinc-50/95">
            Extropic
          </div>
        </div>
      </div >
    );
  }
}


// Live stream of the main backend log output
export default function HERO_INTRO() {
  const isLargeScreen = useMediaQuery({ minWidth: 800 })


  return (


    <div className="min-w-full w-full flex ">

      {isLargeScreen ?

        <div>

          <div className="py-0"></div>

          < VideoPlayer />

          <div className="w-full flex mx-auto">
            <div className="w-60">
              {
                // TODO: insert something interesting here
              }
              Openjourney 1.5
              <br></br>
              Openjourney 2
              <br></br>
              Stable Diffusion 2.1
              <br></br>
              Abyss Orange Mix 2
              <br></br>
              Vintedois Diffusion 0.2
              <br></br>
              Pastel Mix
            </div >
            <div className="px-20"></div>

            <div className="rounded 
          px-2
          sm:text-xs md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
              {/* autoscale based on screensize */}
              <div className="px-1 text-3xl font-bold 
            bg-clip-text
            text-transparent
            bg-gradient-to-tl from-indigo-600 to-blue-400
            drop-shadow-lg
            shadow-white" >
                Harness the power of AI to generate stunning original images from text.
              </div>
              <div className="py-2"></div>
              <div className="py-4 px-1 text-zinc-300/80 text-lg text-opacity-96 ">

                A  web UI for compute intensive generative image models.
                <br></br>
                <br></br>
                All of my code for this site is available on <a className="text-zinc-300 hover:text-zinc-200 "
                  href="https://github.com/76616c6172">Github</a> and I don't make any money from this.
                <br></br>
                <br></br>

                Built on <a className="text-zinc-300 hover:text-zinc-200" href="https://cloud.google.com/">GCP</a>/<a className="text-zinc-300 hover:text-zinc-200" href="https://modal.com/">Modal</a> with <a className="text-zinc-300 hover:text-zinc-200" href="https://reactjs.org/">React</a>, <a className="text-zinc-300 hover:text-zinc-200" href="https://go.dev/">Go</a> and <a className="text-zinc-300 hover:text-zinc-200" href="https://pytorch.org/">Pytorch</a>.


                <div className="py-6">
                  If you would like to get in touch, you can find me on <a className="text-zinc-300
                  hover:text-zinc-200
                  "
                    href="https://twitter.com/76616c6172">twitter</a>
                  .
                </div>
              </div>

              <div className="py-1"></div>
            </div>




          </div>
          <div className="py-1"></div>
        </div>

        :

        <div className="rounded 
          px-2
          text-xs
          sm:text-xs md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
          {/* autoscale based on screensize */}

          < VideoPlayerSmall />
          <div className="py-2"></div>
          <div className="px-1 text-xl font-bold 
            bg-clip-text
            text-transparent
            bg-gradient-to-tl from-indigo-600 to-blue-400
            drop-shadow-lg
            shadow-white" >
            Harness the power of AI to generate stunning original images from text.
          </div>
          <div className="py-2"></div>
          <div className="py-4 px-1 text-zinc-300/80 text-lg text-opacity-96 ">

            A  web UI for compute intensive generative image models.
            <br></br>
            <br></br>
            All of my code for this site is available on <a className="text-zinc-300 hover:text-zinc-200 "
              href="https://github.com/76616c6172">Github</a> and I don't make any money from this.
            <br></br>
            <br></br>

            Built on <a className="text-zinc-300 hover:text-zinc-200" href="https://cloud.google.com/">GCP</a>/<a className="text-zinc-300 hover:text-zinc-200" href="https://modal.com/">Modal</a> with <a className="text-zinc-300 hover:text-zinc-200" href="https://reactjs.org/">React</a>, <a className="text-zinc-300 hover:text-zinc-200" href="https://go.dev/">Go</a> and <a className="text-zinc-300 hover:text-zinc-200" href="https://pytorch.org/">Pytorch</a>.


            <div className="py-6">
              If you would like to get in touch, you can find me on <a className="text-zinc-300
                  hover:text-zinc-200
                  "
                href="https://twitter.com/76616c6172">twitter</a>
              .
            </div>
          </div>





          <div className="py-4"></div>
        </div>

      }
    </div >


  );
}