// Hero.js
import React from 'react';

export default function Hero() {
    return (
        <div className='flex flex-col items-center justify-center p-6 dark:bg-gray-900 dark:text-gray-100'>
            <h2 className='font-bold text-4xl text-center text-gray-800 dark:text-gray-100 pt-14 pb-7'>
                Find Local
                <span className='text-blue-500 font-semibold dark:text-blue-400'> services/Repair</span>
                <br /> Near You
            </h2>
            <h3 className='text-xl text-gray-600 dark:text-gray-300 mb-6'>
                Explore Local Services & Repairs near you
            </h3>
            <div className="flex items-center">
                <input 
                    type="text" 
                    placeholder='Search'
                    className="rounded-l-full md:w-[350px] p-3 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-300 ease-in-out dark:bg-gray-800 dark:text-gray-100"
                />
                <button className="bg-blue-500 dark:bg-blue-600 text-white rounded-r-full px-4 py-3 font-semibold transition duration-300 ease-in-out hover:bg-blue-600 dark:hover:bg-blue-700">
                    Search
                </button>
            </div>
        </div>
    );
}
 