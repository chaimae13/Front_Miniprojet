import React, { useEffect, useState } from 'react';
import user from "/src/assets/user.png";
import { fetchUserProfile, isAdmin } from '../Services/ApiService';
import { User, UserRoles } from '../Models/User';



const Dashboard: React.FC = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const userProfile = await fetchUserProfile();
      setProfile(userProfile);
    };
    loadProfile();
  }, []);

  if (!profile) {
    return <div className='flex justify-center items-center'>Loading...</div>;
  }
  const roleString = profile.role === UserRoles.admin ? "Admin" : "User";
  const formattedBirthDate = new Date(profile.birthDate).toLocaleDateString();

  return (
    <div className="max-w-4xl mx-auto mt-24 p-6 bg-slate-50 rounded-lg shadow-md">
      <div className="flex justify-start items-start">
        <div className="mr-8 w-1/4 flex flex-col items-center justify-between gap-3">
          <img
            src={avatarError ? user : profile.avatar}
            alt="Avatar"
            className="rounded-full w-4/5 object-cover"
            onError={() => setAvatarError(true)}
          />
            <p className="text-lg text-gray-800 capitalize"><strong>{roleString}</strong> </p>

        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            {profile.username}
          </h2>
          <p className="text-xl text-gray-600 mt-1">
            {profile.jobPosition} at {profile.company}
          </p>

          <div className="mt-4 space-y-3">
            <p className="text-lg text-gray-800"><strong>Full Name: </strong>{profile.firstName} {profile.lastName}</p>
            <p className="text-lg text-gray-800"><strong>Email: </strong> {profile.email}</p>
            <p className="text-lg text-gray-800"><strong>Mobile: </strong> {profile.mobile}</p>
            <p className="text-lg text-gray-800"><strong>Location: </strong> {profile.city}, {profile.country}</p>
            <p className="text-lg text-gray-800"><strong>Birth Date: </strong> {formattedBirthDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
