import React, { useState, useEffect } from 'react';
import GlobalApi from './GlobalApi'; // Make sure this path is correct

const ServiceList = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await GlobalApi.getCategory();
        setCategories(fetchedCategories);
        console.log('Fetched Categories:', fetchedCategories); // Log to verify data is fetched
      } catch (err) {
        console.error('Error fetching categories:', err.message);
        setError('Failed to fetch categories.');
      }
    };

    fetchCategories(); // Call the async function
  }, []);

  return (
    <div>
      <h1>Service Categories</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServiceList;
