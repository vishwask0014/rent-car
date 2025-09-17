import React from "react";
import IconContainer from "../IconContainer";

function FunctionCard({
  image = "/static/img/Img.png",
  title = "Mercedes",
  price = 25,
  type = "Sedan",
  duration = "per day",
  features = [
    { name: "gearType", label: "Automatic" },
    { name: "fuel", label: "PB 95" },
    { name: "snowflake", label: "Air Conditioner" },
  ],
}) {
  return (
    <article className="bg-(--gray) rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Car Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-[240px] object-contain mb-4"
      />
      <div className="p-6">
        {/* Title + Price */}
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <span className="text-xl font-bold text-purple-600">${price}</span>
        </div>

        {/* Type + Duration */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-8">
          <span>{type}</span>
          <span className="text-gray-400">{duration}</span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-4 justify-between  mb-10">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-gray-700">
              <IconContainer name={feature.name} />
              <span className="text-sm text-slate-600">{feature.label}</span>
            </div>
          ))}
        </div>

        {/* Button */}
        <button className="btnPrimary w-full">View Details</button>
      </div>
    </article>
  );
}

export default FunctionCard;
