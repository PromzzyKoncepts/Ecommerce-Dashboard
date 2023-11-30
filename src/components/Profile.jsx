import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; 

const Profile = ({ user }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="profile-container">
      <div className="profile-info" onClick={toggleDropdown}>
        <p>{user.name}</p>
        <p>{user.email}</p>
      </div>

      {isDropdownOpen && (
        <div className="profile-dropdown">
          <NavLink to="/edit-profile">Edit Profile</NavLink>
          <NavLink to="/changepass">Change Password</NavLink>
          <NavLink to="/logout">Logout</NavLink>
        </div>
      )}
    </div>
  );
};

export default Profile;
