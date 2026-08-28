import React from "react";
import { Link } from "react-router";

const RecentProductCard = ({ item }) => {
  const { _id,title,price_max,price_min,usage,image } = item;
  //console.log(typeof(_id));
  return (
    <div>
      <div className="card bg-base-60 py-2 shadow-sm">
        <figure className="p-3 h-60 rounded-xl">
          <img className=''
            src={image}
            alt="Shoes"
            className="rounded-xl"
          />
        </figure>
        <div className="px-4 mt-4">
          <h2 className="text-left font-semibold text-md">{title} [ {usage} Used ]</h2>
          <p className="text-primary mt-1">
            $ {price_min} - {price_max}
          </p>
          <div className="card-actions mb-4 mt-2">
            <Link to={`/Product/details/${_id}`} className="w-full "><button className="btn border-primary w-full"><span className="bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">View Details</span></button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentProductCard;
