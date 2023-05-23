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
          </div>
        </div>
      </div >
    );
  }
}


export default function HERO_INTRO() {
  const isLargeScreen = useMediaQuery({ minWidth: 800 });

  return (
    <div className="min-w-full w-full flex ">
      {isLargeScreen ? (
        <div>
          <div className="py-0"></div>
          <VideoPlayer />

          <div>
            <div className="rounded px-2 sm:text-xs md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
              <div className="px-1 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-tl from-indigo-600 to-blue-400 drop-shadow-lg shadow-white"></div>
              <div className="py-2"></div>
              <div className="py-4 px-1 text-zinc-300/80 text-lg text-opacity-96 ">
                Just for fun. Code is available on{' '}
                <a className="text-zinc-300 hover:text-zinc-200" href="https://github.com/76616c6172">
                  github {' '}
                </a>
                and I don't make any money from this.
                You can find me on{' '}
                <a className="text-zinc-300 hover:text-zinc-100" href="https://twitter.com/76616c6172">
                  twitter
                </a>
                .
              </div>
              <div className="py-1"></div>
            </div>
          </div>

          <div className="py-1"></div>
        </div>
      ) : (
        <div>
          <div className="rounded px-2 text-xs sm:text-xs md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
            <VideoPlayerSmall />
            <div>
              <div className="rounded px-2 sm:text-xs md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
                <div className="px-1 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-tl from-indigo-600 to-blue-400 drop-shadow-lg shadow-white"></div>
                <div className="py-2"></div>
                <div className="py-4 px-1 text-zinc-300/80 text-lg text-opacity-96 ">
                  Just for fun. Code is available on{' '}
                  <a className="text-zinc-300 hover:text-zinc-200" href="https://github.com/76616c6172">
                    github {' '}
                  </a>
                  and I don't make any money from this.
                  You can find me on{' '}

                  <a className="text-zinc-300 hover:text-zinc-100" href="https://twitter.com/76616c6172">
                    twitter
                  </a>
                  .
                </div>
              </div>
            </div>
            <div className="py-4"></div>
          </div>
        </div>
      )}
    </div>
  );
}