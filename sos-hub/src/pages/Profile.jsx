import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../constants/ApiUrl";

const Profile = () => {
  const { name } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${BASE_URL}/profiles/${name}`);
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          console.error("Feil ved henting av profil:", response.statusText);
        }
      } catch (error) {
        console.error("Feil ved henting av profil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [name]);

  if (loading) {
    return <div>Hallo - Loading...</div>;
  }

  return (
    <div>
      {profileData && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Profile: {profileData.name}</h2>
          <p>Email: {profileData.email}</p>
          {profileData.avatar && <img src={profileData.avatar} alt="Avatar" />}
          {profileData.banner && <img src={profileData.banner} alt="Banner" />}
        
        </div>
      )}
    </div>
  );
};

export default Profile;
