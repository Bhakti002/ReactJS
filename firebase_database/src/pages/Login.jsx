// pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword , signInWithPopup , onAuthStateChanged} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ If user is already logged in, go to dashboard
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard");
      }
    });
    return unsubscribe;
  }, [navigate]);

  // ✅ Email & Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // 🔥 OPEN DASHBOARD
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard"); // 🔥 OPEN DASHBOARD
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container slide-up">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <button className="google" onClick={handleGoogleLogin}>
        Login with Google
      </button>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

export default Login;
