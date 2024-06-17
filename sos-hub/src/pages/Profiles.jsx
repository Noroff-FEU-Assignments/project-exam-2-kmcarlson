import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../constants/ApiUrl";
import { useAuth } from "../components/AuthContext";

const Profiles = () => {
  const { accessToken } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(`${BASE_URL}/profiles`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProfiles(data);
        } else {
          console.error("Feil ved henting av profiler:", response.statusText);
        }
      } catch (error) {
        console.error("Feil ved henting av profiler:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [accessToken]);

  if (!accessToken) {
    return (
      <div className="text-center">
        <p>Du må logge inn for å se profiler.</p>
        <Link to="/login" className="text-blue-900 hover:underline">
          Logg inn
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profiles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((profile) => (
          <Link key={profile.name} to={`/profile/${profile.name}`}>
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
              <p className="text-lg font-semibold mb-2 text-cyan-700">
                Name: {profile.name}
              </p>
              <p className="text-gray-600">Email: {profile.email}</p>
              {profile.avatar && (
                <img
                  key={`avatar-${profile.id}`}
                  src={profile.avatar}
                  alt="Avatar"
                  className="w-full h-auto object-cover max-h-40 mt-2"
                />
              )}
              {profile.banner && (
                <img
                  key={`banner-${profile.id}`}
                  src={profile.banner}
                  alt="Banner"
                  className="w-full h-auto object-cover max-h-40 mt-2"
                />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Profiles;
