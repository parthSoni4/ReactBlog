import React from 'react';
import { useState } from 'react';
import "./CreateBlog.css";

export default function CreateBlog() {
    const [blogData, setBlogData] = useState({
        title: '',
        description: '',
      });

      const [errors, setErrors] = useState({
        title: '',
        description: '',
      });
      
  
      const handleChange = (e) => {
        setBlogData({
          ...blogData,
          [e.target.name]: e.target.value,
        });

        setErrors({
            title: '',
            description: '',
          });
        };

        const validateForm = () => {
            let isValid = true;
        
            // Title validation
            if (!blogData.title.trim()) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                title: 'Title cannot be empty',
              }));
              isValid = false;
            }
            if (blogData.description.trim().split(/\s+/).length < 200) {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  description: 'Blog should be at least 200 words',
                }));
                isValid = false;
              }
          
              return isValid;
            };


            const handleSubmit = (e) => {
                e.preventDefault();
            
                // Validate the form before submission
                if (validateForm()) {
                  // Add your logic for submitting the blog data here
                  console.log('Blog Submitted:', blogData);
            
                  // Reset the form after submission
                  setBlogData({
                    title: '',
                    description: '',
                  });
                }
              };
      
    return (
        <div className="blog-form-container">
        <h2>Create a Blog</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              required
            />
            <span className="error">{errors.title}</span>
          </label>
          <label>
            Description:
            </label>
            <textarea
              name="description"
              value={blogData.description}
              onChange={handleChange}
              required
            />
            <span className="error">{errors.description}</span>
          
          <button type="submit">Submit</button>
        </form>
      </div>
  )
}
