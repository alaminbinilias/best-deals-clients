import React, { useContext } from "react";
import { Link } from "react-router";
import AuthContext from "../AuthContext/Context/Context";

const RegisterSection = () => {
  const { createUserWithgoogle, handleemailSignUp, HandleProfileUpdate } =
    useContext(AuthContext);

  const HandleSubmitform = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const photo = event.target.photo.value;
    const pass = event.target.pass.value;
    //console.log({name,email,photo,pass});
    const newUser={name,email,photo,pass};
    handleemailSignUp(email, pass)
      .then((result) => {
        console.log(result.user);
        HandleProfileUpdate(name,photo).then(()=>console.log("Profile Updated")).catch(err=>console.log(err.code));
        //event.target.reset();

        ///send info in server;

        fetch('http://localhost:4000/users',{
          method:'POST',
          headers:{
            "content-type":'application/json',
          },
          body:JSON.stringify(newUser),
        }).then(res=>res.json()).then(result=>console.log(result));


      })
      .catch((err) => console.log(err.code));
  };

  return (
    <div className="flex justify-center pt-10">
      <form onSubmit={HandleSubmitform}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-100 border p-4">
          <p className="text-center font-semibold text-2xl">Register Now!</p>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <span className="text-primary hover:underline">
              <Link to="/login">Login Now</Link>
            </span>
          </p>
          <div className="mt-5">
            <label className="label text-[1rem] text-black">Name</label>
            <input
              type="text"
              className="input w-full mt-2"
              placeholder="abc"
              id="name"
              required
            />

            <label className="label text-[1rem] text-black mt-2">Email</label>
            <input
              type="email"
              className="input w-full mt-2"
              placeholder="abc@gmail.com"
              id="email"
              required
            />

            <label className="label text-[1rem] text-black mt-2">
              Photo-URL
            </label>
            <input
              type="text"
              className="input w-full mt-2"
              placeholder="please enter a image link"
              id="photo"
            />

            <label className="label text-[1rem] text-black mt-2">
              Password
            </label>
            <input
              type="password"
              className="input w-full mt-2"
              placeholder="**************"
              id="pass"
              required
            />
            <button className="btn btn-neutral mt-5 mb-3 w-full bg-primary border-primary text-white">
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default RegisterSection;
