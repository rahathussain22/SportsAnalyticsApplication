import React, { useState } from 'react'
import '../assets/styles/Signup.css'
import { showSuccess, showError } from '../utils/Toast';

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const body = await res.json();

      if (res.ok) {
        showSuccess(body.message || "Registered successfully");
      } else {
        showError(body.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      showError("Server error. Try again later.");
    }
  };
  return (
    <div className='Signup'>
      <div className="SignupCard">
        <h1><span>E</span>nter <span>Y</span>our <span>D</span>etail</h1>
        <form action="" method="post" onSubmit={submit}>
          <input type="text" name="" id="" placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required />
          {/* <input type="text" name="" id="" placeholder='Name' /> */}
          <input type="text" name="" id="" placeholder='Password' onChange={(e) => setPassword(e.target.value)}
            required />
          <button type="submit">SignUp</button>
          <button><a href="login">Login</a></button>
        </form>
      </div>
    </div>
  )
}

export default Signup