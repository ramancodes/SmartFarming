import React, { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import AuthForm from "./LoginSignUp";
import UserProfile from "./UserProfile";

const Profile = () => {
  const {token, getUserProfile} = useContext(AppContext);

  useEffect(()=>{
    getUserProfile()
  },[])

  return (
    <div>
      {!token && <AuthForm />}
      {token && <UserProfile />}
    </div>
  );
};

export default Profile;
