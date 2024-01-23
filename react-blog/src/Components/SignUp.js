import React, { useState } from 'react';
import "./SignUp.css"
import axios from "axios"; //axios is used to make http requests 
import Swal from 'sweetalert2';  // swal is used to give alert and confirmation to the user 



const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

//   in above example, the state variable(formData) is an object 
// the object has properties name, email, password and confirm password

  const [errors, setErrors] = useState({
    email: '',
    passwordMatch: '',
  });

// errors is also an state object in this situation 


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // ... operator is an spread syntax 
    console.log(formData, [e.target.name], e.target.value )
  };
//   as the handle change name means it will update the value of formData
// it will work for all the attributes 

  const validateEmail = (email) => {
    // A basic email validation pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
    // the test function will give a true or falsse value 


  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // this method is used to prevent browser unusual behaviour 
    // that is reloading the page or navigating away during submition 
    // it allow custom handling 

    // Validate email
    if (!validateEmail(formData.email)) {
      setErrors({ ...errors, email: 'Please enter a valid email address' });
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, passwordMatch: 'Passwords do not match' });
      return;
    }

    // Clear previous error messages
    setErrors({ email: '', passwordMatch: '' });


    
    console.log('Form submitted:', formData);

    axios.post("http://localhost:4000/signup", formData)
  .then(response => {
    console.log("Data", response.data);
    console.log(response.status);
    if(response.status==201)
    {

      Swal.fire({
        title: 'Thank your signing up',
        text: 'Your data has been created ',
        icon: 'success',
        // confirmButtonText: 'Okay',
      });
    }
  })
  .catch(error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("Error Response Data:", error.response.data);
      console.log("Error Response Status:", error.response.status);
      if(error.response.status==409)
      {
        Swal.fire({
          title: 'User Already Exists',
          text: 'The provided username is already in use. Please choose a different one.',
          icon: 'error',
          confirmButtonText: 'Okay',
        });
      }
      console.log("Error Response Headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log("No response received. Request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error Message:", error.message);
    }
    console.log("Error Config:", error.config);
  });
  };

  return (
    <div className='sign-div'>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          {/* the required keyword will make sure that the fields are not empty  */}
        </label>
        <br />

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <span className="error">{errors.email}</span>
        </label>
        <br />

        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <br />

        <label>
          Confirm Password:
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          <span className="error">{errors.passwordMatch}</span>
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>

      <div>Already have an account! 
        <a href="/login">Click here</a>
      </div>
    </div>
  );
};

export default SignUp;
