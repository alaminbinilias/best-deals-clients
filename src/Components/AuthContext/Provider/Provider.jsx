import React, { useEffect, useState } from "react";
import AuthCotext from "../Context/Context";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../../Firebase/firebase.init";

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [Loading,setLoading]=useState(true);

  useEffect(() => {
    const unmount = onAuthStateChanged(auth, (user) => {
      //console.log(user);
      if(user){
        //console.log("Success");
        const loggedUserInfo={email:user.providerData[0].email,
          Name:user.displayName,
          VerifiedEmail:user.emailVerified,
          photo: user.photoURL
        };
        fetch("http://localhost:4000/gettokens",{
          method:"POST",
          headers:{
            'content-type':"application/json"
          },
          body:JSON.stringify(loggedUserInfo),
        }).then(res=>res.json()).then(result=>{
          console.log("After own token create",result);
          localStorage.setItem("Token", result.Token); 
        })
      }
      setUser(user);
      setLoading(false);
    });
    return () => unmount();
  }, []);

  ///Googlesign up

  const GoogleProvider=new GoogleAuthProvider();
  GoogleProvider.addScope("email");

  const HandleGoogleSignIn=()=>{
    return signInWithPopup(auth,GoogleProvider);
  }

  ///emailSignUp
  const handleemailSignUp = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  //updateProfile
  const HandleProfileUpdate = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  ///Signin user
  const HandleSingninUser = (email, pass) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  //reset password
  const HandleResetPass = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  ///Sign Out
  const HandleSignOut = () => {
    return signOut(auth);
  };

  const authinfo = {
    HandleGoogleSignIn,
    handleemailSignUp,
    HandleProfileUpdate,
    HandleSingninUser,
    HandleResetPass,
    user,
    setUser,
    HandleSignOut,
    Loading,
    setLoading
  };

  return <AuthCotext value={authinfo}>{children}</AuthCotext>;
};

export default Provider;
