"use client";

import GlobalApi from "@/app/_services/GlobalApi"; 
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import BusinessInfo from "../_components/BusinessInfo";
import SuggestedBusinessList from "../_components/SuggestedBusinessList"; // Correct path
import BusinessDescription from "../_components/BusinessDescripton";
import { useParams } from "next/navigation";

function BusinessDetail() {
  const { data, status } = useSession();
  const [business, setBusiness] = useState(null);
  const [error, setError] = useState(null);
  const { businessId } = useParams();

  const fetchBusinessDetails = async (id) => {
    try {
      if (!GlobalApi || typeof GlobalApi.getBusinessById !== "function") {
        console.error("GlobalApi or getBusinessById is not defined");
        setError("Failed to load API");
        return;
      }

      const response = await GlobalApi.getBusinessById(id);
      if (response) {
        setBusiness(response);
      } else {
        console.error("No business data found");
        setError("Business not found");
      }
    } catch (error) {
      console.error("API Error:", error.message);
      setError("An error occurred while fetching the business data");
    }
  };

  useEffect(() => {
    if (businessId) {
      fetchBusinessDetails(businessId);
    }
  }, [businessId]);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      signIn("descope");
    }
  }, [status]);

  if (status === "authenticated" && business) {
    return (
      <div className="py-8 md:py-20 px-10 md:px-36">
        <BusinessInfo business={business} />
        <div className="grid grid-cols-3 mt-16">
          <div className="col-span-3 md:col-span-2 order-last md:order-first">
            <BusinessDescription business={business} />
          </div>
          <div>
            <SuggestedBusinessList business={business} />
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <div>Please sign in to access this page.</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div>Loading...</div>;
}

export default BusinessDetail;
