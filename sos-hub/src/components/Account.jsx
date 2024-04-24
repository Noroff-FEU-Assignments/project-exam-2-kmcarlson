import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../constants/ApiUrl";
import { useAuth } from "./AuthContext";

const Profile = () => {
  const { accessToken } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${BASE_URL}/profiles/${name}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
   
        });
        console.log('min',response)
       
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          console.error("Feil ved henting av profildata:", response.statusText);
        }
      } catch (error) {
        console.error("Feil ved henting av profildata:", error);
      }
    };

    if (accessToken) {
      fetchProfile();
    }
  }, [accessToken, name]);

  if (!profileData) {
    return <div>
      <h3>halla min profil</h3>
      
      Loading...</div>;
  }

  return (
    <div>
      <h3>halla min profil</h3>
      <h2>Profil: {profileData.name}</h2>
    </div>
  );
};

export default Profile;
