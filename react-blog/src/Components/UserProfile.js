import React from 'react'
import {useNavigate} from "react-router-dom";
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useState } from 'react';
import "./UserProfile.css";

export default function UserProfile() {

    const [name, setName]=useState([]);
    const [email, setEmail]=useState([]);


    useEffect(() => {
      
      const cookie=Cookies.get("token");
      
      console.log("we are here with a cookie", cookie);
        axios.get('http://localhost:4000/get-user-details', {
          withCredentials: true,
        
         headers: { "Authorization": `Bearer ${cookie}`,

         }
        })
        .then(response => {
          
          console.log(response.data.userData);
          setName(response.data.userData.name);
          setEmail(response.data.userData.email);
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
      
          // Handle error, show a user-friendly message, or redirect the user to a login page
          // Example:
          // if (error.response && error.response.status === 401) {
          //   // Redirect to login page or show a message
          // } else {
          //   // Show a generic error message
          // }
        });
      }, []);
  return (
    <>
    <div id="userProfile">
    {/* <h1>User Profile</h1> */}
    {/* <h6></h6> */}
    <div>
      <strong>Name:</strong> <span id="userName">{name}</span>
    </div>
    <div>
      <strong>Email:</strong> <span id="userEmail">{email}</span>
    </div>
  </div>
    
    </>
  )
}
