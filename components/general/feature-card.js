// components/feature-card.jsx
import React from "react";

const FeatureCard = ({ title, description }) => (
  <div className="bg-white rounded-lg shadow-lg p-8">
    <h3 className="text-2xl font-semibold mb-4 text-[#261039]">{title}</h3>
    <p className="text-[#373180]">{description}</p>
  </div>
);

export default FeatureCard;
