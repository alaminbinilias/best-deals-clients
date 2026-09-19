import { use, useEffect, useState } from "react";
import AuthContext from "../AuthContext/Context/Context";
import Swal from "sweetalert2";

const BidsSection = () => {
  const { user } = use(AuthContext);
  //console.log(user.accessToken);
  console.log(user);
  const [myBids, setMybids] = useState([]);
  ///get bids for specific email
  useEffect(()=>{
    if(user.providerData[0].email){
   fetch(`http://localhost:4000/bids/mybids?email=${user.providerData[0].email}`,{
    headers:{
      authorization:`Bearer ${user.accessToken}`
    }
   }).then(res=>res.json()).then(result=>setMybids(result));
    }
  },[user.providerData[0].email]);

  const HadleDelete = (id) => {
    console.log("clicked");
    //console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this bid",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:4000/mybids/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.deletedCount != 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });

              const filterData = myBids.filter((bid) => bid._id != id);
              setMybids(filterData);
            }
          });
      }
    });
  };

  return (
    <div>
      <h3 className="font-semibold text-2xl text-center mt-6">
        My Bids: <span className="text-primary">{myBids.length}</span>
      </h3>

      <div>
        <div className="overflow-x-auto px-2 lg:px-0 w-full lg:w-11/12 mx-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL NO</th>
                <th>Name</th>
                <th className="hidden lg:block">Email</th>
                <th>Bid Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {myBids.map((bid, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{bid.buyerName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden lg:block">{bid.buyerEmail}</td>
                  <td>
                    {bid.status === "pending" ? (
                      <div className="badge badge-warning">{bid.status}</div>
                    ) : (
                      <div className="badge badge-success">{bid.status}</div>
                    )}
                  </td>
                  <td>{bid.bidPrice}</td>
                  <th>
                    <button
                      onClick={() => HadleDelete(bid._id)}
                      className="btn btn-ghost btn-xs border-red-500 text-red-500"
                    >
                      Remove Bid
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BidsSection;
