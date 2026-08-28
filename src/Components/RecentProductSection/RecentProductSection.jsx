import React, { use } from "react";
import RecentProductCard from "./RecentProductCard/RecentProductCard";

const RecentProductSection = ({ latestProducts }) => {
  //console.log(latestProducts);
  const products = use(latestProducts);
  console.log(products);
  return (
    <div>
      <div>
        <h3 className="mt-12 font-semibold text-4xl text-center">
          Recent{" "}
          <span className="bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
            Products
          </span>
        </h3>
      </div>
      


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-11/12 mx-auto mt-10">
        {
            products.map(item=><RecentProductCard key={item._id} item={item}></RecentProductCard>)
        }
      </div>
      <div className="w-full mx-auto mt-8 flex justify-center">
        <div><button className="btn mb-4 px-5 bg-brand-gradient text-white font-light">Show All</button></div>
      </div>
    </div>
  );
};

export default RecentProductSection;
