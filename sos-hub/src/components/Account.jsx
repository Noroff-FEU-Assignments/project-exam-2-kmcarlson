import React, { useState, useEffect } from "react";
import { BASE_URL } from "../constants/ApiUrl";
import { useAuth } from "./AuthContext";

const Account = () => {
  const { accessToken, userData } = useAuth(); 
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${BASE_URL}/profiles/${userData.name}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          console.error("Feil ved henting av profildata:", response.statusText);
        }
      } catch (error) {
        console.error("Feil ved henting av profildata:", error);
      }

      console.log(profileData);
    };

    if (accessToken) {
      fetchProfile();
    }
  }, [accessToken, userData.name]);

  if (!profileData) {
    return <div>
      <h3>halla min profil</h3>
      Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
    <h3 className="text-2xl font-bold mb-4">Min profil</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Profil:</h2>
        <p className="text-gray-800">{profileData.name}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Email:</h2>
        <p className="text-gray-800">{profileData.email}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Banner:</h2>
        {profileData.banner ? (
          <img src={profileData.banner} alt="Banner" className="w-full h-auto object-cover max-h-40" />
        ) : (
          <p className="text-gray-800">Ingen banner tilgjengelig</p>
        )}
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Avatar:</h2>
        {profileData.avatar ? (
          <img src={profileData.avatar} alt="Avatar" className="w-full h-auto object-cover max-h-40" />
        ) : (
          <p className="text-gray-800">Ingen avatar tilgjengelig</p>
        )}
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Antall innlegg:</h2>
        <p className="text-gray-800">{profileData._count.posts}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Antall følgere:</h2>
        <p className="text-gray-800">{profileData._count.followers}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Antall som følges:</h2>
        <p className="text-gray-800">{profileData._count.following}</p>
      </div>
    </div>
  </div>
  );
};

export default Account;
