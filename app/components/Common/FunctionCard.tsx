import React from "react";
import IconContainer from "../IconContainer";
import Link from "next/link";

type Feature = { name: string; label: string };
type FunctionCardProps = {
  image?: string;
  title?: string;
  price?: number;
  type?: string;
  duration?: string;
  id?: string | number;
  features?: Feature[];
};

function FunctionCard({
  image = "/static/img/Img.png",
  title = "Mercedes",
  price = 25,
  type = "Sedan",
  duration = "per hour",
  id = 1 as string | number,
  features = [] as Feature[],
}: FunctionCardProps) {
  return (
    <article className="bg-(--gray) rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden">
      {/* Car Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-[200px] object-cover bg-white"
      />
      <div className="p-6 flex-1 flex flex-col">
        {/* Title + Price */}
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{title}</h3>
          <span className="text-xl font-bold text-(--secondary)">₹{price}</span>
        </div>

        {/* Type + Duration */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span>{type}</span>
          <span className="text-gray-400">{duration}</span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-4 justify-between mb-6">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-gray-700">
              <IconContainer name={feature.name as any} />
              <span className="text-sm text-slate-600">{feature.label}</span>
            </div>
          ))}
        </div>

        {/* Button */}
        <Link href={`/${id}`} className="btnPrimary w-full text-center block mt-auto">View Details</Link>
      </div>
    </article>
  );
}

export default FunctionCard;
