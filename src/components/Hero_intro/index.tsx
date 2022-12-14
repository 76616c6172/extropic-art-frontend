import { useMediaQuery } from 'react-responsive'

// Live stream of the main backend log output
export default function HERO_INTRO() {
  const isLargeScreen = useMediaQuery({ minWidth: 800 })


  return (


    <div className="min-w-full w-full flex ">

      {isLargeScreen ?

        <div>
          <div className="py-40"></div>
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

                  <p className="py-1 text-right text-zinc-500">                — ChatGPT</p>
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
                Harness the power of AI to generate stunning original images from just text.
              </div>
              <div className="py-2"></div>

              <p className="py-4 px-1 text-zinc-300/80 text-lg
            text-opacity-96
            ">
                A convenient web UI for powerful latent text to image models. Built entirely on open source software.

                <div className="py-2"></div>

                Big thank you to <a className="text-zinc-300 hover:text-zinc-200" href="https://stability.ai/">stability.ai</a> for providing stable diffusion. All of the code behind this site is publicly available on my <a className="text-zinc-300
            hover:text-zinc-200
            "
                  href="https://github.com/76616c6172">GitHub</a> and I don't make any money from this.


                <p className="py-6 px-1">
                  If you'd like to get in touch, you can find me on <a className="text-zinc-300
              hover:text-zinc-200
                "
                    href="https://twitter.com/76616c6172">twitter</a>
                  .
                </p>
              </p>
              <div className="py-5"></div>
            </div>




          </div>
          <div className="py-28"></div>
        </div>


        :
        <div className="rounded 
          px-2
          sm:text-xs md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
          {/* autoscale based on screensize */}
          <div className="py-24"></div>
          <div className="px-1 text-3xl font-bold 
            bg-clip-text
            text-transparent
            bg-gradient-to-tl from-indigo-600 to-blue-400
            drop-shadow-lg
            shadow-white" >
            Harness the power of AI to generate stunning original images from just text.
          </div>
          <div className="py-2"></div>

          <p className="py-4 px-1 text-zinc-300/80 text-lg
            text-opacity-96
            ">
            A convenient web UI for powerful latent text to image models. Built entirely on open source software.

            <div className="py-2"></div>

            Big thank you to <a className="text-zinc-300 hover:text-zinc-200" href="https://stability.ai/">stability.ai</a> for providing stable diffusion. All of the code behind this site is publicly available on my <a className="text-zinc-300
            hover:text-zinc-200
            "
              href="https://github.com/76616c6172">GitHub</a> and I don't make any money from this.


            <p className="py-6 px-1">
              If you'd like to get in touch, you can find me on <a className="text-zinc-300
              hover:text-zinc-200
                "
                href="https://twitter.com/76616c6172">twitter</a>
              .
            </p>
          </p>
          <div className="py-20"></div>
        </div>

      }
    </div >


  );
}