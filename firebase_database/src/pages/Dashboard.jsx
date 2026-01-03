// pages/Dashboard.jsx
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import StudentPortal from "../components/StudentPortal";

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="dashboard zoom-in">
      <h1>📚 SkillTrack Dashboard</h1>
      <p>Welcome, {auth.currentUser?.email}</p>

      <StudentPortal />

      <button onClick={logout} style={{ marginTop: "20px" }}>Logout</button>
    </div>
  );
};

export default Dashboard;
