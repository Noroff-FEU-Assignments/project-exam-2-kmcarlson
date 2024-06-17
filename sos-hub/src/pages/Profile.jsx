import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../constants/ApiUrl";
import { useAuth } from "../components/AuthContext";

const Profile = () => {
  const { name } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [alreadyFollowingError, setAlreadyFollowingError] = useState(false);
  const { accessToken, userData } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${BASE_URL}/profiles/${name}?_followers=true&_following=true`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
          console.log("data", data);

          if (data.followers.find((follower) => follower.name === userData.name)) {
            setIsFollowing(true);
          } else {
            setIsFollowing(false);
          }

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
  }, [name, accessToken]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/profiles/${name}/posts`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Feil ved henting av poster:", response.statusText);
        }
      } catch (error) {
        console.error("Feil ved henting av poster:", error);
      }
    };

    if (profileData) {
      fetchPosts();
    }
  }, [name, accessToken, profileData]);

  const handleFollow = async () => {
    try {
      const response = await fetch(`${BASE_URL}/profiles/${name}/follow`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setIsFollowing(true);
        console.log("Followed successfully");

        const updatedProfileResponse = await fetch(`${BASE_URL}/profiles/${name}?_followers=true&_following=true`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (updatedProfileResponse.ok) {
          const updatedProfileData = await updatedProfileResponse.json();
          setProfileData(updatedProfileData);
        } else {
          console.error("Feil ved henting av oppdatert profil:", updatedProfileResponse.statusText);
        }
      } else {
        const responseData = await response.json();
        if (responseData.errors && responseData.errors[0].message === "You are already following this profile") {
          setAlreadyFollowingError(true);
        } else {
          console.error("Error following profile:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error following profile:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await fetch(`${BASE_URL}/profiles/${name}/unfollow`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setIsFollowing(false);
        console.log("Unfollowed successfully");

        const updatedProfileResponse = await fetch(`${BASE_URL}/profiles/${name}?_followers=true&_following=true`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (updatedProfileResponse.ok) {
          const updatedProfileData = await updatedProfileResponse.json();
          setProfileData(updatedProfileData);
        } else {
          console.error("Feil ved henting av oppdatert profil:", updatedProfileResponse.statusText);
        }
      } else {
        console.error("Error unfollowing profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error unfollowing profile:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {alreadyFollowingError && (
        <p>You are already following this profile</p>
      )}
      {profileData && (
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
                <img
                  src={profileData.banner}
                  alt="Banner"
                  className="w-full h-auto object-cover max-h-40"
                />
              ) : (
                <p className="text-gray-800">No banner available</p>
              )}
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Avatar:</h2>
              {profileData.avatar ? (
                <img
                  src={profileData.avatar}
                  alt="Avatar"
                  className="w-full h-auto object-cover max-h-40"
                />
              ) : (
                <p className="text-gray-800">No avatar available</p>
              )}
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Number of posts:</h2>
              <p className="text-gray-800">{profileData._count.posts}</p>
            </div>
            <div className="mb-4">
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Followers:</h2>
                <ul>
                  {profileData.followers.map((follower, index) => (
                    <li key={index}>
                      <Link to={`/profile/${follower.name}`}>{follower.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Following:</h2>
                <ul>
                  {profileData.following.map((following, index) => (
                    <li key={index}>
                      <Link to={`/profile/${following.name}`}>{following.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>


            </div>
          </div>
          <h3 className="text-2xl font-bold mb-4">Posts by {profileData.name}</h3>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
          {isFollowing ? (
            <button onClick={handleUnfollow} className="bg-pink-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">Unfollow</button>
          ) : (
            <button onClick={handleFollow} className="bg-pink-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">Follow</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
