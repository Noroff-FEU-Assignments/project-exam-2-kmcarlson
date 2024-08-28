import { useState, useEffect } from "react";
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
          setIsFollowing(data.followers.some(follower => follower.name === userData.name));
        } else {
          console.error("Error fetching profile:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [name, accessToken, userData]);

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
          console.error("Error fetching posts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
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
        const updatedProfileResponse = await fetch(`${BASE_URL}/profiles/${name}?_followers=true&_following=true`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (updatedProfileResponse.ok) {
          const updatedProfileData = await updatedProfileResponse.json();
          setProfileData(updatedProfileData);
        } else {
          console.error("Error fetching updated profile:", updatedProfileResponse.statusText);
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
        const updatedProfileResponse = await fetch(`${BASE_URL}/profiles/${name}?_followers=true&_following=true`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (updatedProfileResponse.ok) {
          const updatedProfileData = await updatedProfileResponse.json();
          setProfileData(updatedProfileData);
        } else {
          console.error("Error fetching updated profile:", updatedProfileResponse.statusText);
        }
      } else {
        console.error("Error unfollowing profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error unfollowing profile:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {alreadyFollowingError && (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-6">
          You are already following this profile.
        </div>
      )}
      {profileData && (
        <div>
          <div className="flex flex-col md:flex-row items-start justify-between bg-white shadow-lg rounded-lg p-6 mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4 text-pink-500">Profile Overview</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold">Name:</h4>
                  <p className="text-gray-800">{profileData.name}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Email:</h4>
                  <p className="text-gray-800">{profileData.email}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Banner:</h4>
                  {profileData.banner ? (
                    <img
                      src={profileData.banner}
                      alt="Banner"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-600">No banner available</p>
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Avatar:</h4>
                  {profileData.avatar ? (
                    <img
                      src={profileData.avatar}
                      alt="Avatar"
                      className="w-32 h-32 object-cover rounded-full"
                    />
                  ) : (
                    <p className="text-gray-600">No avatar available</p>
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Followers:</h4>
                  <ul className="list-disc pl-5">
                    {profileData.followers.map((follower, index) => (
                      <li key={index}>
                        <Link to={`/profile/${follower.name}`} className="text-pink-500 hover:underline">{follower.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Following:</h4>
                  <ul className="list-disc pl-5">
                    {profileData.following.map((following, index) => (
                      <li key={index}>
                        <Link to={`/profile/${following.name}`} className="text-pink-500 hover:underline">{following.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Number of Posts:</h4>
                  <p className="text-gray-800">{profileData._count.posts}</p>
                </div>
              </div>
            </div>
            <div className="md:ml-6 mt-4 md:mt-0 flex-shrink-0">
              {isFollowing ? (
                <button onClick={handleUnfollow} className="bg-pink-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                  Unfollow
                </button>
              ) : (
                <button onClick={handleFollow} className="bg-blue-900 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded">
                  Follow
                </button>
              )}
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-pink-500 mb-4">Posts by {profileData.name}</h2>
            <ul className="list-disc pl-5">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link to={`/posts/${post.id}`} className="text-pink-500 hover:underline">{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
