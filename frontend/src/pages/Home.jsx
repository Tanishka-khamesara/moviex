import React, { useState } from "react";
import moviesData from "../data/moviesData";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
// import "./App.css";

const App = () => {
  const [userData, setUserData] = useState(null);
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`https://moviex-ms30.onrender.com/api/auth/me`, {
          credentials: "include",
         
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://moviex-ms30.onrender.com/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      setUserData(null);
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    }
  };

  // State for search input and filtered movies
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(moviesData);

  // Function to handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = moviesData.filter(
      (movie) =>
        movie.title.toLowerCase().includes(query) ||
        movie.year.toString().includes(query)
    );
    setFilteredMovies(filtered);
  };

  return (
    <div className="App">
      <h1>Movie Database</h1>
      {/* <button>Logout</button> */}
      <div>
      {userData && (
          <Link  className="sidebar-profile">
          
            <div className="sidebar-user-info">
              <p className="sidebar-username">{userData?.fullname}</p>
              <p className="sidebar-handle">{userData?.email}</p>
            </div>
            <button className="sidebar-logout-icon" onClick={handleLogout} >Logout</button>
          </Link>
        )}
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by movie name or year..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={movie.image} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;