import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

export default function BusinessList({ businessLists = [], title = 'Business List' }) {
    return (
        <div className='mt-5 p-4 bg-gray-100 rounded-lg shadow-md'>
            <h2 className='font-bold text-2xl text-center mb-4'>{title}</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5'>
                {businessLists.length > 0 ? (
                    businessLists.map((business, index) => {
                        console.log(`Business ${index}:`, business);
                        
                        const imageUrl = business.images?.url || null;
                        console.log(`Business ${index} Image URL:`, imageUrl);

                        // State to handle loading
                        const [isLoading, setIsLoading] = useState(true);
                        const [buttonClicked, setButtonClicked] = useState(false); // State for button click animation

                        const handleBookNowClick = () => {
                            setButtonClicked(true);
                            setTimeout(() => {
                                setButtonClicked(false);
                            }, 300); // Match this duration to the animation duration
                        };

                        return (
                            <Link href={'/details/'+business.id} key={business.id || index} className='bg-white rounded-lg shadow-lg overflow-hidden'>
                                <div className='relative'>
                                    {isLoading && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                                            <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-10 h-10 animate-spin"></div>
                                        </div>
                                    )}
                                    {imageUrl ? (
                                        <Image 
                                            src={imageUrl} 
                                            alt={business.name || 'Business Image'} 
                                            width={500}  
                                            height={281} 
                                            className='w-full object-cover rounded-t-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg'
                                            unoptimized 
                                            onLoad={() => setIsLoading(false)} 
                                            onError={(e) => {
                                                e.target.onerror = null; 
                                                e.target.src = '/fallback-image.png';
                                            }}
                                        />
                                    ) : (
                                        <img 
                                            src='/fallback-image.png' 
                                            alt='Fallback' 
                                            className='h-48 w-full object-cover rounded-t-lg'
                                        />
                                    )}
                                </div>
                                <div className='p-4'>
                                    <h3 className='font-semibold text-lg'>{business.name || 'No name provided'}</h3>
                                    <p className='text-gray-600 text-sm'>{business.category?.name || 'No category'}</p>
                                    
                                    {/* Styled services section */}
                                    <div className='flex flex-wrap mt-2'>
                                        {business.services?.map((service, index) => (
                                            <span 
                                                key={index} 
                                                className='bg-purple-500 text-white text-xs font-medium mr-2 mb-2 px-3 py-1 rounded-full shadow-md'
                                            >
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <p className='text-gray-600 text-sm mt-2'>
                                        {business.address || 'No address available.'}
                                    </p>
                                    <p className='text-gray-600 text-sm mt-2'>Contact: {business.contactPerson || 'N/A'}</p>
                                    
                                    {/* Book Now Button */}
                                    <button 
                                        onClick={handleBookNowClick} 
                                        className={`mt-4 w-full bg-purple-600 text-white py-2 rounded-full hover:bg-purple-700 transition duration-200 transform ${buttonClicked ? 'scale-95' : 'scale-100'}`}
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <p>No businesses available.</p>
                )}
            </div>

            {/* CSS Styles for loader */}
            <style jsx>{`
                .loader {
                    border-top-color: transparent;
                    animation: spin 3s linear infinite;
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
}
