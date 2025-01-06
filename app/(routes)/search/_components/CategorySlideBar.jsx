"use client";
import { useEffect, useState } from "react";
import Image from "next/image"; // Import Image from 'next/image'
import Link from "next/link";
import { getCategory } from "@/app/_services/GlobalApi"; // Correct import
import { usePathname } from "next/navigation"; // Correct usage for Next.js navigation

function CategorySlideBar() {
  const [categoryList, setCategoryList] = useState([]); // State for storing categories
  const [selectedCategory, setSelectedCategory] = useState(); // State for selected category
  const params = usePathname(); // Get current path
  const currentCategory = params?.split("/")[2]; // Extract the category from the path

  useEffect(() => {
    // Function to fetch the category list
    const getCategoryList = async () => {
      try {
        const resp = await getCategory(); // Fetch categories from the API
        console.log("Full API response:", JSON.stringify(resp, null, 2)); // Log full response

        if (resp && Array.isArray(resp)) {
          setCategoryList(resp); // Update categoryList state
          console.log("Fetched categories:", resp); // Log fetched categories
        } else {
          console.warn("No categories found in the API response");
          setCategoryList([]); // Set an empty array if no categories found
        }
      } catch (error) {
        console.error("Error fetching category list:", error); // Log error
        setCategoryList([]); // Set an empty array on error
      }
    };

    getCategoryList(); // Fetch the categories when component mounts
  }, []);

  return (
    <div>
      <h2 className="font-bold mb-3 text-lg text-primary">Categories</h2>
      <div>
        {categoryList.map((category, index) => (
          <Link
            href={`/search/${category.name}`}
            key={index}
            className={`flex gap-2 p-3 border rounded-lg mb-3
              md:mr-10 cursor-pointer
              hover:bg-purple-50 hover:shadow-md items-center
              hover:text-blue-600 hover:border-blue-600
              ${currentCategory === category.name ? "bg-blue-100 border-blue-600" : ""}`}
            onClick={() => setSelectedCategory(category.name)} // Update selectedCategory on click
          >
            {/* Correctly using the Image component from next/image */}
            <Image
              src={category.icon?.url || "/default-icon.png"} // Fallback for missing icons
              alt={category.name} // Alt text should describe the category
              width={30}
              height={30}
              className="rounded-full"
            />
            <h2>{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategorySlideBar;
