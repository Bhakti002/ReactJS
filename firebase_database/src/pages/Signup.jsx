// pages/Signup.jsx
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container fade-in">
      <h2>Create Account</h2>
      <form onSubmit={handleSignup}>
        <input 
          type="email"
          placeholder="Email" 
          required
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          required
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Signup;
