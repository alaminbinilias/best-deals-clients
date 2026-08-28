import { use, useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, Navigate, useLoaderData, useNavigate } from "react-router";
import AuthContext from "../AuthContext/Context/Context";
import Swal from "sweetalert2";

const ProductsDetailPage = () => {
  const product = useLoaderData();
  const [makeBids, setMakeBids] = useState([]);
  const { user } = use(AuthContext);
  //console.log(user);
  const navigate = useNavigate();
  console.log(product);
  const bidopenref = useRef(null);

  const modals = () => {
    bidopenref.current.showModal();
  };

  const BidSubmitForm = (event) => {
    event.preventDefault();
    const buyerName = event.target.buyerName.value;
    const buyerEmail = event.target.buyer_mail.value;
    const bidPrice = event.target.bid_price.value;
    const PhoneNumber = event.target.phone.value;

    if(bidPrice==''){
      alert("Please insert your bid value");
      return;
    }
    const BidsSection = {
      productId: product._id,
      buyerName,
      buyerEmail,
      bidPrice,
      PhoneNumber,
      status: product.status,
    };

    //console.log({ buyerName, buyerEmail, bidPrice, PhoneNumber,p_id });
    fetch("http://localhost:4000/bids", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(BidsSection)
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          Swal.fire({
            title: "Your Bids Suceesfully Completed",
            icon: "success",
            draggable: true,
          });

          BidsSection._id = result.insertedId;
          const newBids = [...makeBids, BidsSection];
          newBids.sort((a,b)=>{return b.bidPrice-a.bidPrice});
          setMakeBids(newBids);
          console.log(makeBids);
          bidopenref.current.close();
        }
      });
  };

  useEffect(() => {
    fetch(`http://localhost:4000/products/bids/${product._id}`)
      .then((res) => res.json())
      .then((result) => setMakeBids(result));
  }, [product._id]);
  return (
    <div className="h-full bg-[#f5f5f5]">
      <div className="w-11/12 mx-auto pt-4 flex flex-col-reverse  lg:grid grid-cols-2 gap-8 space-y-2">
        <div className="left-side pb-4">
          <div>
            <img
              className="lg:h-110 w-full object-cover"
              src={product.image}
            ></img>
          </div>
          <div className="mt-3 rounded-md bg-white px-4 py-3 ">
            <h2 className="font-semibold text-xl">Product Description</h2>
            <div className="flex justify-between mt-3">
              <p>
                <span className="text-primary font-mono">Condition:</span> new
              </p>
              <p>
                <span className="text-primary font-mono">Usage Time:</span> 3
                Month
              </p>
            </div>
            <hr></hr>
            <p className="mt-2">{product.description}</p>
          </div>
        </div>
        <div className="right-side mt-3">
          <p
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 hover:underline hover:cursor-pointer "
          >
            <span>
              <FaArrowLeft />
            </span>{" "}
            Back To Product
          </p>
          <h2 className="mt-2 font-extrabold text-2xl">{product.title}</h2>

          <div className="price bg-white px-4 py-3 rounded-md mt-5">
            <p className="text-green-600 font-semibold text-[1rem]">
              ${product.price_max} - {product.price_min} Tk
            </p>
            <p>Price Start From</p>
          </div>
          <div className="mt-5 space-y-1 bg-white rounded-md px-4 py-3">
            <p className="text-xl font-semibold">Product Details</p>
            <p className="mt-2">Product id: {product._id}</p>
            <p>Posted: {product.created_at}</p>
          </div>

          <div className="seller_info space-y-1 bg-white mt-5 rounded-md px-4 py-3">
            <p className="text-xl font-semibold">Seller Information</p>
            <p className="font-medium">
              <span className="font-semibold">Name: </span>{" "}
              {product.seller_name}
            </p>
            <p>
              <span className="font-semibold">Location: </span>{" "}
              {product.location}
            </p>
            <p>
              <span className="font-semibold">Contact: </span>{" "}
              {product.seller_contact}
            </p>
            <p>
              <span className="font-semibold">Status: </span>{" "}
              <span className="bg-amber-500 px-3 pb-1 rounded-2xl">
                {product.status}
              </span>
            </p>
          </div>
          <button
            onClick={modals}
            className="btn w-full mt-3 text-white bg-brand-gradient"
          >
            {" "}
            I Want Buy This Product{" "}
          </button>

          {/* Modals_section */}

          <dialog
            ref={bidopenref}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg text-center">
                Give Seller Your Offer Price
              </h3>

              <form onSubmit={BidSubmitForm}>
                <fieldset className="fieldset mt-2">
                  <div className="flex gap-2">
                    <div className="left_side space-y-0.5">
                      <label className="label text-black font-semibold">
                        Buyer Name
                      </label>
                      <input
                        type="text"
                        className="input"
                        placeholder="Your Name"
                        id="buyerName"
                        defaultValue={user.displayName}
                        readOnly
                      />
                    </div>
                    <div className="right_section space-y-0.5">
                      <label className="label text-black font-semibold">
                        Buyer Email
                      </label>
                      <input
                        type="email"
                        className="input"
                        placeholder=" Your Email"
                        id="buyer_mail"
                        defaultValue={user.email}
                        readOnly
                      />
                    </div>
                  </div>
                  <label className="label space-y-0.5 text-black font-semibold">
                    Place your Price
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    id="bid_price"
                    placeholder="0.0"
                  />
                  <label className="label space-y-0.5 text-black font-semibold">
                    Contact Info
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    id="phone"
                    placeholder="Please Enter Your Phone Number"
                  />

                  <div className="flex gap-1 justify-end pt-3">
                    <button
                      onClick={() => bidopenref.current.close()}
                      className="btn border-primary text-primary "
                    >
                      Cancel
                    </button>
                    <input
                      className="btn bg-brand-gradient text-white"
                      type="submit"
                      value="Submit Bid"
                    />
                  </div>
                </fieldset>
              </form>
            </div>
          </dialog>
        </div>
      </div>
      <div>
        <p className="text-2xl font-semibold px-3 lg:px-0 text-gray-500 w-full lg:w-11/12 mx-auto mt-5">
          Bids For This Products:{" "}
          <span className="text-primary">{makeBids.length}</span>
        </p>
        <div className="bid_row pb-10 w-full px-3 lg:px-0 lg:w-11/12 mx-auto mt-4">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>SL No</th>
                  <th className="hidden lg:block">Product</th>
                  <th className="">Bidder Name</th>
                  <th>Bid Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              {makeBids.map((currentData, index) => (
                <tbody key={index} className="bg-white">
                  <tr>
                    <td>{index + 1}</td>
                    <td className="hidden lg:block">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={product.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{product.title}</div>
                          <div className="text-sm opacity-50">
                            {product.price_min} Tk
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="">
                      {currentData.buyerName}
                    </td>
                    <td>{currentData.bidPrice} Tk</td>
                    <td>
                      <div className="badge badge-warning">{currentData.status}</div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetailPage;
