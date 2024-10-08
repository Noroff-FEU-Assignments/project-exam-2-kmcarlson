import { useState, useEffect } from "react";
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
      <div className="container mx-auto p-4 min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-lg mb-4">You need to log in to view profiles.</h2>
        <Link to="/login" >
          <button className="bg-blue-900 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded p-10">
            Log in
          </button>
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-center text-pink-500">Profiles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <Link key={profile.name} to={`/profile/${profile.name}`} className="group">
            <div className="bg-white rounded-lg p-6 flex flex-col items-center space-y-4 hover:shadow-xl transition-shadow duration-300" style={{ minHeight: '350px', maxWidth: '350px' }}>
              <div className="flex flex-col items-center w-full mb-4">
                <p className="text-xl font-semibold text-pink-500">{profile.name}</p>
                <p className="text-gray-600">{profile.email}</p>
              </div>
              {profile.banner ? (
                <img
                  src={profile.banner}
                  alt="Banner"
                  className="w-full h-36 object-cover rounded-t-lg mb-2"
                />
              ) : (
                <p className="text-gray-600 mb-2">No Banner Available</p>
              )}
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt="Avatar"
                  className="w-32 h-32 object-cover rounded-full mb-2"
                />
              ) : (
                <p className="text-gray-600">No Avatar Available</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Profiles;
