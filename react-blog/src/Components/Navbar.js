import React from 'react'
import './Navbar.css';
import { useState } from 'react';




export default function Navbar() {
    

  return (
    <nav className="navbar">
    <div className="logo">Parth Soni Blog Website </div>
   
    <ul className={`nav-links` }>
      <li><a href="/">Home</a></li>
      <li><a href="/SignUp">SignUp</a></li>
      <li><a href="/allBlog">See the blogs</a></li>
      <li><a href="/contLinkct">Contact</a></li>
    </ul>
  </nav>
  )
}
