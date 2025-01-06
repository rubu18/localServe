"use client"; // Add this line to mark the file as a client component

import React, { useState, useEffect } from 'react';

const CategoryList = ({ categoryList }) => {
    const [isLoading, setIsLoading] = useState(true); // Initialize loading state

    // Simulate data fetching with a timeout
    useEffect(() => {
        // Simulating an API call or data fetching
        const fetchData = setTimeout(() => {
            setIsLoading(false); // After data is fetched, set loading to false
        }, 3000); // 3 seconds delay to simulate loading

        return () => clearTimeout(fetchData); // Cleanup timeout if component unmounts
    }, []);

    return (
        <div className="flex flex-wrap gap-4 justify-center p-5 bg-gray-100">
            {isLoading ? (
                // Render animated placeholders while loading
                [1, 2, 3, 4, 5].map((item, index) => (
                    <div 
                        key={index} 
                        className="h-[120px] w-[200px] bg-gray-200 animate-pulse rounded-lg"
                    ></div>
                ))
            ) : (
                // Render category items after data is loaded
                categoryList.map(category => (
                    <div 
                        key={category.id} 
                        className="p-5 rounded-lg shadow-lg text-center transition-transform duration-300 transform hover:scale-105" 
                        style={{ backgroundColor: category.bgcolor.hex, flex: '1 1 200px', maxWidth: '250px' }}
                    >
                        <h2 className="text-xl mb-3 text-gray-800">{category.name}</h2>
                        <img 
                            src={category.icon.url} 
                            alt={category.name} 
                            className="w-[60px] h-[60px] object-contain mx-auto mb-3"
                        />
                    </div>
                ))
            )}
        </div>
    );
};

export default CategoryList;
