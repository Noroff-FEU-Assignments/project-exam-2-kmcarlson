import React, { useState, useEffect } from "react";
import { BASE_URL } from "../constants/ApiUrl";
import { useAuth } from "./AuthContext";

const Account = () => {
 const { accessToken, userData } = useAuth();
 const [profileData, setProfileData] = useState(null);
 const [avatarUrl, setAvatarUrl] = useState('');
 const [bannerUrl, setBannerUrl] = useState('');
 const [showUpdateForm, setShowUpdateForm] = useState(false);
 const [isUpdating, setIsUpdating] = useState(false);
 const [updateComplete, setUpdateComplete] = useState(false);

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
    };

    if (accessToken) {
      fetchProfile();
    }
 }, [accessToken, userData.name]);

 const updateMedia = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`${BASE_URL}/profiles/${userData.name}/media`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: avatarUrl,
          banner: bannerUrl
        })
      });

      if (response.ok) {
        setUpdateComplete(true);
        fetchProfile();
      } else {
        console.error("Feil ved oppdatering av media:", response.statusText);
      }
    } catch (error) {
      console.error("Feil ved oppdatering av media:", error);
    } finally {
      setIsUpdating(false);
      // window.location.reload();
    }
 };

 if (!profileData) {
    return <div>Loading...</div>;
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
      <div className="mt-8">
        {!showUpdateForm ? (
          <button onClick={() => setShowUpdateForm(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Oppdater din avatar/banner
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Avatar URL"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal mt-4"
            />
            <input
              type="text"
              placeholder="Banner URL"
              value={bannerUrl}
              onChange={(e) => setBannerUrl(e.target.value)}
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal mt-4"
            />
            <button onClick={updateMedia} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Oppdater din avatar/banner
            </button>
          </>
        )}
        {isUpdating && <p className="text-green-500 mt-4">Oppdatering pågår...</p>}
        {updateComplete && <p className="text-green-500 mt-4">Oppdatering fullført!</p>}
      </div>
    </div>
 );
};

export default Account;
