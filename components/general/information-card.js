// components/information-card.jsx
import React from "react";
import Image from "next/image";

const InformationCard = ({ image, title, description }) => (
  <div className="relative rounded-lg shadow-xl overflow-hidden">
    <Image
      src={image}
      alt={title}
      width={600}
      height={400}
      className="w-full h-auto"
    />
    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
      <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white">
        {title}
      </h3>
      <p className="text-sm md:text-base text-white leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

export default InformationCard;
