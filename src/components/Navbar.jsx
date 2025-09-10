import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import { auth } from "../firebase/config"; // Import auth for logout

export default function Navbar() {
  const { currentUser, userRole } = useAuth(); // Get user and role from context
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/"); // Redirect to home page after logout
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav className="bg-gray-900 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <span className="text-white">StudyAbroad</span>
        <span className="text-yellow-500">Hub</span>
      </h1>
      <div className="space-x-4 flex items-center">
        <Link to="/" className="text-gray-300 hover:text-yellow-500">
          Home
        </Link>
        <Link to="/listings" className="text-gray-300 hover:text-yellow-500">
          Listings
        </Link>
        <Link to="/tools" className="text-gray-300 hover:text-yellow-500">
          Tools
        </Link>
        <Link to="/counseling" className="text-gray-300 hover:text-yellow-500">
          Counseling
        </Link>

        {/* Show Dashboard link ONLY if user is an admin */}
        {currentUser && userRole === "admin" && (
          <Link to="/dashboard" className="text-gray-300 hover:text-yellow-500">
            Dashboard
          </Link>
        )}

        {/* Conditional rendering based on login status */}
        {currentUser ? (
          <>
            {/* NEW: Avatar Icon */}
            <div className="h-8 w-8 rounded-full bg-yellow-1000 flex items-center justify-center">
              <span className="text-sm font-bold text-gray-900">
                {currentUser.email.charAt(0).toUpperCase()}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-yellow-500 font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/auth"
            className="px-4 py-2 bg-yellow-1000 text-gray-900 font-bold rounded-lg hover:bg-yellow-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
