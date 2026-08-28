import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const HeroBannerSection = () => {
  return (
    <div>
      <div className="text-center w-full h-100 bg-violet-200 font-sans">
        <div className="text-center justify-center px-3 lg:px-0">
          <h2 className="pt-15 w-full lg:w-150 justify-center mx-auto text-4xl md:text-5xl lg:text-6xl font-semibold lg:leading-18">
            Deal your{" "}
            <span className="bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
              Products
            </span>{" "}
            in a{" "}
            <span className="bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
              Smart
            </span>{" "}
            way !
          </h2>
          <p className="mt-3 text-gray-500">
            SmartDeals helps you sell, resell, and shop from trusted local
            sellers — all in one place!
          </p>
          <div className="flex justify-center">
            <input
              className="bg-white py-1 px-4 rounded-l-2xl mt-4 w-100"
              type="text"
              placeholder="search For Products, Categoriees..."
            />
            <div className="flex items-center cursor-pointer mt-4 p-4 h-3 rounded-r-2xl bg-green-500">
              <button className="">
                <FaSearch></FaSearch>
              </button>
            </div>
          </div>

          <div className="mt-6">
            <button className="btn p-2 bg-brand-gradient border-primary text-white">
              Watch All Products
            </button>
            <button className="btn p-2 ml-2  border-violet-600 bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
              Post an Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBannerSection;
