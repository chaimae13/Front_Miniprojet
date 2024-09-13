import React, { useState } from 'react';
import user from "/src/assets/user.png";
import { fetchUserProfileByUsername } from '../Services/ApiService';
import { User, UserRoles } from '../Models/User';

const Users: React.FC = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [avatarError, setAvatarError] = useState(false);
  const [username, setUsername] = useState(''); 
  const [loading, setLoading] = useState(false); 

  const handleSearch = async () => {
    if (!username) return;

    setLoading(true);
    try {
      const userProfileArray = await fetchUserProfileByUsername(username);
      if (userProfileArray && userProfileArray.length > 0) {
        setProfile(userProfileArray[0]); 
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setProfile(null);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      {/* Search Bar and Button */}
      <div className="p-6 bg-slate-50 rounded-lg shadow-md mb-6">
        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full max-w-md"
          />
          <button
            onClick={handleSearch}
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Search
          </button>
        </div>
      </div>

      {/* User Information Card */}
      {loading && <div className="flex justify-center items-center mt-4">Loading...</div>}
      {profile && (
        <div className="p-6 bg-slate-50 rounded-lg shadow-md">
          <div className="flex justify-start items-start">
            <div className="mr-8 w-1/4 flex flex-col items-center justify-between gap-3">
              <img
                src={avatarError ? user : profile.avatar}
                alt="Avatar"
                className="rounded-full w-4/5 object-cover"
                onError={() => setAvatarError(true)}
              />
              <p className="text-lg text-gray-800 capitalize"><strong>{profile.role === UserRoles.admin ? "Admin" : "User"}</strong></p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-800">{profile.username}</h2>
              <p className="text-xl text-gray-600 mt-1">{profile.jobPosition} at {profile.company}</p>

              <div className="mt-4 space-y-3">
                <p className="text-lg text-gray-800"><strong>Full Name: </strong>{profile.firstName} {profile.lastName}</p>
                <p className="text-lg text-gray-800"><strong>Email: </strong> {profile.email}</p>
                <p className="text-lg text-gray-800"><strong>Mobile: </strong> {profile.mobile}</p>
                <p className="text-lg text-gray-800"><strong>Location: </strong> {profile.city}, {profile.country}</p>
                <p className="text-lg text-gray-800"><strong>Birth Date: </strong> {new Date(profile.birthDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
