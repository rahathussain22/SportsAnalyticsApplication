import React, { useState } from 'react'
import '../assets/styles/Login.css'
import { showSuccess, showError } from '../utils/Toast'; 


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        showSuccess("Login successful!")
        console.log("Login Response:", data);

        // if backend sends token:
        if (data.accessToken) {
          localStorage.setItem("token", data.accessToken);
        }

      } 
      else {
        showError("Login Error");
      }
    } catch (error) {
      console.error("Login error:", error);
      showError("Invalid Credentials")

    }
  };

  return (
    <div className='Login'>
      <div className="LoginCard">
        <h1><span>E</span>nter <span>Y</span>our <span>L</span>ogin <span>C</span>redentials</h1>
        <form action="" method="post" onSubmit={handleSubmit}>
          <input type="text" name="" id="" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          <input type="text" name="" id="" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
          <button type='submit'>Login</button>
          <button><a href="signup">SignUp</a></button>
        </form>
      </div>
    </div>
  )
}

export default Login