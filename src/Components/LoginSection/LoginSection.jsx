import React, { useContext, useState } from "react";
import { Link } from "react-router";
import AuthContext from "../AuthContext/Context/Context";
import { getAuth, GoogleAuthProvider, ProviderId, signInWithPopup } from "firebase/auth";
import auth from "../Firebase/firebase.init";

const LoginSection = () => {
  const { HandleSingninUser,HandleGoogleSignIn, HandleResetPass,setLoading,User,setUser } =
    useContext(AuthContext);
  const [Email, setEmail] = useState(null);

  //console.log(User);

  const HandleSignIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    setEmail(email);
    const pass = event.target.pass.value;
    HandleSingninUser(email, pass)
      .then((result) => {
        console.log(result.user);
        alert("Sign In Successfully");
        event.target.reset();
        setLoading(false);
      })
      .catch((err) => console.log(err.code));
  };

  const HandleResetPassword = () => {
    HandleResetPass(Email)
      .then(() => alert("Please check your email"))
      .catch((err) => console.log(err.code));
  };

  const provider= new GoogleAuthProvider();

  const HandleSigninWithGoogle=(event)=>{
    event.preventDefault();
    //console.log("Clicked");
    HandleGoogleSignIn().then(result=>{
      result.user.email=result.user.providerData[0].email;
      console.log(result.user);
    }).catch(err=>alert(err.code));
  }

  return (
    <div className="flex justify-center pt-20">
      <form onSubmit={HandleSignIn}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-100 border p-4">
          <p className="text-center font-semibold text-2xl">Login Now</p>
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <span className="text-primary hover:underline">
              <Link to="/register">Register Now</Link>
            </span>
          </p>
          <div className="mt-5">
            <label className="label text-[1rem] text-black">Email</label>
            <input
              type="email"
              className="input w-full mt-2"
              placeholder="abc@gmail.com"
              id="email"
              required
            />

            <label className="label text-[1rem] text-black mt-2">
              Password
            </label>
            <div>
                <input
              type="password"
              className="input w-full mt-2 relative"
              placeholder="**************"
              id="pass"
              required
            />
            </div>
            <p
              onClick={HandleResetPassword}
              className="mt-2 text-[1rem] text-gray-500 cursor-pointer hover:underline"
            >
              Forgot password?
            </p>
            <button className="btn btn-neutral mt-4 w-full bg-primary border-primary text-white">
              Sign In
            </button>
            <div className="divider">OR</div>

            <button
              onClick={HandleSigninWithGoogle}
              className="btn bg-white text-black border-[#e5e5e5] w-full mb-2"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginSection;
