import React from 'react';
import logo from '../assets/Logo.svg'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

function RegisterF() {
  return (
    <main className='flex flex-col bg-white sm:rounded-3xl w-full md:w-2/5 lg:w-1/4 md:h-5/6 lg:h-5/6 h-screen shadow-lg p-5'>
        <Link>
            <FontAwesomeIcon className='size-6 lg:size-8' icon={faCircleArrowLeft} />
        </Link>
        <img src={logo} className='w-1/5 mb-5 mx-auto'/>
        <p className='mx-auto font-bold lg:text-3xl text-2xl'>
            PCForge
        </p>
        <div className="my-2 mx-5">
          <label className="block my-1 font-medium text-gray-700">
            Full name
          </label>
          <input type="text" placeholder="Full name" className="w-full border border-gray-300 rounded-lg h-10 px-4 focus:outline-none focus:border-indigo-500"
          />
      </div>
        <div className="my-2 mx-5">
          <label className="block my-1 font-medium text-gray-700">
            Email
          </label>
          <input type="email" placeholder="username@gmail.com" className="w-full border border-gray-300 rounded-lg h-10 px-4 focus:outline-none focus:border-indigo-500"
          />
      </div>
      <div className="my-2 mx-5">
        <label className="block my-1 font-medium text-gray-700">
          Password
        </label>
        <input type="password" placeholder="Password" className="w-full border border-gray-300 rounded-lg h-10 px-4 focus:outline-none focus:border-indigo-500" />
      </div>
      <button className="bg-indigo-500 text-white rounded-lg h-10 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-900 mx-10 my-5">
        Register now
      </button>
      <div className="flex items-center justify-center mt-6">
        <p className="text-gray-600">
          Already have an account?
        </p>
        <Link to="/" className="text-indigo-500 hover:underline ml-1">
          Sign in
        </Link>
        </div>
    </main>
  );
}

export default RegisterF;