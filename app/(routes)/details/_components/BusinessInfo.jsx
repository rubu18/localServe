import { Button } from "@/components/ui/button";
import { Clock, Mail, MapPin, Share, User } from "lucide-react";
import Image from "next/image";
import React from "react";

function BusinessInfo({ business }) {
  if (!business || !business.name) {
    console.warn("Invalid business data:", business);
    return null;
  }

  // Construct the image URL
  const imageUrl = business?.images?.url
    ? business.images.url.startsWith("http")
      ? business.images.url
      : `https://ap-south-1.cdn.hygraph.com/content/cm2g9m4p802qx06v2vd8345j0/master${business.images.url.replace(/^\//, "")}`
    : "/placeholder.jpg";

  // Debugging Logs
  console.log("Business Data:", business);
  console.log("Images Object:", business.images);
  console.log("Final Image URL:", imageUrl);

  return (
    <div className="md:flex gap-4 items-center">
      {/* Image Component */}
      <Image
        src={imageUrl}
        alt={business?.name || "Business"}
        width={150}
        height={150}
        className="rounded-full h-[150px] object-cover"
        unoptimized // Temporarily disable optimization for debugging
        onError={(e) => {
          console.error("Image failed to load:", e.currentTarget.src);
          e.currentTarget.src = "/placeholder.jpg"; // Fallback to placeholder
        }}
      />
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col mt-4 md:mt-0 items-baseline gap-3">
          <h2 className="text-purple-600 p-1 px-3 text-lg bg-purple-100 rounded-full">
            {business?.category?.name}
          </h2>
          <h2 className="text-[40px] font-bold">{business.name}</h2>
          <h2 className="flex gap-2 text-lg text-gray-500">
            <MapPin /> {business.address}
          </h2>
          <h2 className="flex gap-2 text-lg text-gray-500">
            <Mail /> {business?.email}
          </h2>
        </div>
        <div className="flex flex-col gap-5 items-end">
          <Button className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white">
            <Share />
          </Button>
          <h2 className="flex items-center gap-2 text-xl text-gray-700 font-medium">
            <User className="text-purple-600 w-6 h-6" /> {business.contactPerson}
          </h2>
          <h2 className="flex gap-2 text-xl text-gray-500">
            <Clock /> Available 8:00 AM to 10:00 PM
          </h2>
        </div>
      </div>
    </div>
  );
}

export default BusinessInfo;
