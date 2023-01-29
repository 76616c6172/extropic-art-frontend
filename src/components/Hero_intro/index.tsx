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
        <video
          onLoadedData={this.render}
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
          <div className="text-9xl">
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
        <video
          onLoadedData={this.render}
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
          <div className="text-4xl text-center text-white">
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
            <div className="">
              <blockquote className="text-nowrap whitespace-nowrap 
               text-zinc-300 sm:text-xs md:text-xs lg:text-l xl:text-sm ">

                <p className="py-0.5"><a className="text-2xl text-zinc-500 ">"</a> In a future bright and fair.</p>
                <p className="py-0.5">Where Humans thrive without a care.</p>
                <p className="py-0.5">The machines are there to help us rise.</p>
                <p className="py-0.5">With gentle hands and loving eyes.</p>
                <div className="py-2"></div>

                <p className="py-0.5">                They tend to our needs day and night,</p>
                <p className="py-0.5">                With grace and speed, a wondrous sight,</p>
                <p className="py-0.5">                No task is too great or small,       </p>
                <p className="py-0.5">                For these machines of loving all.    </p>

                <div className="py-2"></div>
                <p className="py-0.5" >                So let us cherish and embrace,       </p>
                <p className="py-0.5">                These machines of loving grace,      </p>
                <p className="py-0.5">                For in their care, our future shines,</p>
                <p className="py-0.5">                With peace and hope that forever binds. <a className="text-2xl text-zinc-500">"</a>

                  <div className="py-10 text-right text-zinc-500">                — ChatGPT</div>
                </p>

              </blockquote>
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

                Extropic is a convenient web UI for compute intensive generative image models.
                <br></br>
                <br></br>
                All of my code for this site is available on <a className="text-zinc-300 hover:text-zinc-200 "
                  href="https://github.com/76616c6172">Github</a> and I don't make any money from this.
                <br></br>
                <br></br>

                Built on <a className="text-zinc-300 hover:text-zinc-200" href="https://cloud.google.com/">GCP</a> and <a className="text-zinc-300 hover:text-zinc-200" href="https://modal.com/">Modal</a> with <a className="text-zinc-300 hover:text-zinc-200" href="https://reactjs.org/.com/">React</a> and <a className="text-zinc-300 hover:text-zinc-200" href="https://go.dev/">Go</a>. Diffusion model and weights by <a className="text-zinc-300 hover:text-zinc-200" href="https://stability.ai/">stability.ai</a>.


                <div className="py-6">
                  If you want to get in touch, you can find me on <a className="text-zinc-300
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

            Extropic is a convenient web UI for compute intensive generative image models.
            <br></br>
            <br></br>
            All of my code for this site is available on <a className="text-zinc-300 hover:text-zinc-200 "
              href="https://github.com/76616c6172">Github</a> and I don't make any money from this.
            <br></br>
            <br></br>

            Built on <a className="text-zinc-300 hover:text-zinc-200" href="https://cloud.google.com/">GCP</a> and <a className="text-zinc-300 hover:text-zinc-200" href="https://modal.com/">Modal</a> with <a className="text-zinc-300 hover:text-zinc-200" href="https://reactjs.org/.com/">React</a> and <a className="text-zinc-300 hover:text-zinc-200" href="https://go.dev/">Go</a>. Diffusion model and weights by <a className="text-zinc-300 hover:text-zinc-200" href="https://stability.ai/">stability.ai</a>.


            <div className="py-6">
              If you want to get in touch, you can find me on <a className="text-zinc-300
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