"use client"; // Mark this as a client component

import React, { useEffect, useState } from "react";
import BusinessList from "@/app/_components/BusinessList";
import { getBusinessListByCategory } from "@/app/_services/GlobalApi";

function BusinessByCategory({ params }) {
  // Unwrap the promise for `params`
  const category = React.use(params)?.category; // Use React.use() to safely resolve the params

  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) {
      setError("Category parameter is missing.");
      return;
    }

    // Fetch businesses when the category changes
    fetchBusinessList(category);
  }, [category]);

  const fetchBusinessList = async (category) => {
    setLoading(true);
    setError(null); // Reset error before API call

    try {
      console.log("Fetching businesses for category:", category);

      const response = await getBusinessListByCategory(category);
      console.log("API Response:", response);

      if (response && Array.isArray(response)) {
        setBusinessList(response);
      } else {
        throw new Error("Unexpected response structure or empty business list.");
      }
    } catch (err) {
      console.error("Error fetching business data:", err);
      setError("Failed to fetch business data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="business-category-container">
      <h2 className="text-2xl font-bold mb-4">
        Businesses in {category || "Unknown"} Category
      </h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && businessList.length === 0 && (
        <p>No businesses available for this category.</p>
      )}

      {!loading && !error && businessList.length > 0 && (
        <BusinessList title={category} businessLists={businessList} />
      )}
    </div>
  );
}

export default BusinessByCategory;
