import Image from 'next/image';
import React from 'react';

function BusinessDescription({ business }) {
  const MASTER_URL = process.env.NEXT_PUBLIC_MASTER_URL || '';

  return (
    business?.name && (
      <div>
        <h2 className="font-bold text-[25px]">Description</h2>
        <p className="mt-4 text-lg text-gray-600">{business.about}</p>

        <h2 className="font-bold text-[25px] mt-8">Gallery</h2>
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5"
        >
          {business?.images?.length > 0 ? (
            business.images.map((item, index) => (
              <Image
                src={item?.url?.startsWith('http') ? item.url : `${MASTER_URL}${item?.url}`}
                key={index}
                alt={`Business Image ${index + 1}`}
                width={700}
                height={200}
                className="rounded-lg object-cover"
              />
            ))
          ) : (
            <p>No images available.</p>
          )}
        </div>
      </div>
    )
  );
}

export default BusinessDescription;
