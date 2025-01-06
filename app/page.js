"use client";
import Header from './_components/Header';
import Hero from './_components/Hero';
import CategoryList from './_components/CategoryList'; 
// import { getCategory, getAllBusinessList } from '@/_services/GlobalApi';  // Named imports
import { getCategory, getAllBusinessList } from './_services/GlobalApi';
import { useEffect, useState } from 'react';
import BusinessList from './_components/BusinessList';

export default function Home() {
    const [categoryList, setCategoryList] = useState([]);
    const [businessLists, setBusinessList] = useState([]);

    // Fetch categories
    useEffect(() => {
        const getCategoryList = async () => {
            try {
                const resp = await getCategory();  // Fetch categories from GlobalApi
                console.log("Full API response:", JSON.stringify(resp, null, 2)); 

                if (resp && Array.isArray(resp)) {
                    setCategoryList(resp); 
                    console.log("Fetched categories:", resp); 
                } else {
                    console.warn("No categories found in the API response");
                    setCategoryList([]); 
                }
            } catch (error) {
                console.error("Error fetching category list:", error);
                setCategoryList([]); 
            }
        };

        getCategoryList();
    }, []);

    // Fetch business list
    useEffect(() => {
        const getAllBusinessListData = async () => {
            try {
                const resp = await getAllBusinessList();  // Fetch business lists
                console.log("Business List Response:", resp);

                if (resp && Array.isArray(resp)) {
                    console.log("Business Lists:", resp);
                    setBusinessList(resp); // Set business list state directly
                } else {
                    console.warn("No valid business lists found in the API response");
                    setBusinessList([]); 
                }
            } catch (error) {
                console.error("Error fetching business list:", error);
                setBusinessList([]);
            }
        };

        getAllBusinessListData(); 
    }, []);

    return (
        <div>
            <Header />
            <Hero />
            {Array.isArray(categoryList) && categoryList.length > 0 ? (
                <CategoryList categoryList={categoryList} />
            ) : (
                <p>Loading categories...</p> 
            )}
            <BusinessList businessLists={businessLists} title="Popular Business" />
        </div>
    );
}
