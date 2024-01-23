import React from 'react'
import {useNavigate} from "react-router-dom";
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useState } from 'react';


export default function UserProfile() {

    const [userProfile, setUserProfile] = useState(null);


    useEffect(() => {
        console.log("we are here");
        axios.get('http://localhost:4000/get-user-details', {
          withCredentials: true,
        })
        .then(response => {
          setUserProfile(response.data);
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
    <h1>User Profile </h1>
    
    </>
  )
}
