import React from "react";
import Image from "next/image";

const InformationCard = ({ image, title, description }) => {
  return (
    <div className="rounded-lg shadow-lg overflow-hidden relative">
      <Image
        src={image}
        alt={title}
        width={600}
        height={400}
        className="w-full h-auto"
      />
      <div className="absolute inset-0 flex items-end">
        <div className="py-1 px-2 md:p-6 rounded-lg text-white md:w-full bg-gradient-to-t from-black to-transparent">
          <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-2">
            {title}
          </h3>
          <p className="text-sm md:text-base">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default InformationCard;
