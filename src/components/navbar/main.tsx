import React from 'react';
import '../styles/index.css'

export default function Navbar() {
  return (
    <div>
<section className="relative w-full px-8 text-zinc-400 body-font">
  <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
    <a href="#_" className="relative z-10 flex items-center w-auto text-2xl font-extrabold leading-none text-black select-none">eXia.</a>

    <nav className="top-0 left-0 z-0 flex items-center justify-center w-full h-full py-5 -ml-0 space-x-5 text-base md:-ml-5 md:py-0 md:absolute">
      <a
        href="#_"
        className="relative font-medium leading-6 text-zinc-900 transition duration-150 ease-out hover:text-green-400"
        x-data="{ hover: false }"
      >
        <span className="block text-lg">Home</span>
        <span className="absolute bottom-0 left-0 inline-block w-full h-0.5 -mb-1 overflow-hidden">
          <span
            className="absolute inset-0 inline-block w-full h-1 h-full transform bg-gray-900"
          ></span>
        </span>
      </a>
      <a
        href="#_"
        className="relative font-medium leading-6 text-zinc-900 transition duration-150 ease-out hover:text-zinc-400"
        x-data="{ hover: false }"
      >
        <span className="block">Features</span>
        <span className="absolute bottom-0 left-0 inline-block w-full h-0.5 -mb-1 overflow-hidden">
          <span
            x-show="hover"
            className="absolute inset-0 inline-block w-full h-1 h-full transform bg-gray-900"
          ></span>
        </span>
      </a>
      <a
        href="#_"
        className="relative font-medium leading-6 text-gray-900 transition duration-150 ease-out hover:text-zinc-400"
        x-data="{ hover: false }"
      >
        <span className="block">Pricing</span>
        <span className="absolute bottom-0 left-0 inline-block w-full h-0.5 -mb-1 overflow-hidden">
          <span
            x-show="hover"
            className="absolute inset-0 inline-block w-full h-1 h-full transform bg-gray-900"
          ></span>
        </span>
      </a>
      <a
        href="#_"
        className="relative font-medium leading-6 text-zinc-900 transition duration-150 ease-out hover:text-zinc-400"
        x-data="{ hover: false }"
      >
        <span className="block">Blog</span>
        <span className="absolute bottom-0 left-0 inline-block w-full h-0.5 -mb-1 overflow-hidden">
          <span
            x-show="hover"
            className="absolute inset-0 inline-block w-full h-1 h-full transform bg-gray-900"
          ></span>
        </span>
      </a>
    </nav>

    <div className="relative z-10 inline-flex items-center space-x-3 md:ml-5 lg:justify-end">
      <a
        href="#"
        className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-zinc-400 whitespace-no-wrap bg-black border border-black rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none"
      >
        Sign in
      </a>
      <span className="inline-flex rounded-md shadow-sm">
        <a
          href="#"
          className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-zinc-400 whitespace-no-wrap bg-black border border-black rounded-md shadow-sm hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign up
        </a>
      </span>
    </div>
  </div>
</section>
</div>

  );
}