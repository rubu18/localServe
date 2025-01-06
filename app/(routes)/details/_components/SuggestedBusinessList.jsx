import GlobalApi from "@/app/_services/GlobalApi";
import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import BookingSection from "@/app/_components/BookingSection";

function SuggestedBusinessList({ business }) {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    if (business?.category?.name) {
      fetchBusinessList();
    }
  }, [business]);

  const fetchBusinessList = async () => {
    try {
      console.log("Fetching businesses for category:", business?.category?.name);

      const resp = await GlobalApi.getAllBusinessList();
      setBusinessList(resp || []);
    } catch (error) {
      console.error("Error fetching business list:", error.message);
    }
  };

  return (
    <div className="md:pl-10">
      <div className="mb-6">
        
        <BookingSection>
        <Button className="flex gap-2 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600">
          <NotebookPen />
          Book Appointment
        </Button>
        </BookingSection>
      </div>
      <div>
        <h2 className="font-bold text-lg mt-3 mb-3">Similar Businesses</h2>
        <div>
          {businessList.map((item, index) => {
            // Construct Image URL
            const imageUrl = item?.images?.url
              ? item.images.url.startsWith("http")
                ? item.images.url
                : `https://ap-south-1.cdn.hygraph.com/content/cm2g9m4p802qx06v2vd8345j0/master${item.images.url.replace(/^\//, "")}`
              : "/placeholder.jpg";

            return (
              <Link
                key={index}
                href={`/details/${item.id}`}
                className="flex gap-2 mb-4 hover:border rounded-lg p-2 cursor-pointer hover:shadow-md border-primary"
              >
                <Image
                  src={imageUrl}
                  alt={item.name || "Business Image"}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover h-[100px]"
                  onError={(e) => {
                    console.error("Image failed to load:", e.currentTarget.src);
                    e.currentTarget.src = "/placeholder.jpg"; // Fallback to placeholder
                  }}
                />
                <div>
                  <h2 className="font-bold">{item.name}</h2>
                  <h2 className="text-primary">{item.contactPerson}</h2>
                  <h2 className="text-gray-400">{item.address}</h2>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SuggestedBusinessList;
