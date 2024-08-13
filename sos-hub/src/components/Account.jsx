import { useState, useEffect } from "react";
import { BASE_URL } from "../constants/ApiUrl";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import UpdatePostModal from "./UpdatePostModal";

const Account = () => {
  const { accessToken, userData } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateComplete, setUpdateComplete] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${BASE_URL}/profiles/${userData.name}?_followers=true&_following=true`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          console.error("Error fetching profile data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (accessToken) {
      fetchProfile();
    }
  }, [accessToken, userData.name]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/profiles/${userData.name}/posts`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserPosts(data);
        } else {
          console.error("Error fetching user posts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    if (accessToken) {
      fetchUserPosts();
    }
  }, [accessToken, userData.name]);

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setUserPosts(userPosts.filter(post => post.id !== postId));
      } else {
        console.error("Error deleting post:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdate = async (postId, updatedContent) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedContent),
      });

      if (response.ok) {
        const updatedPosts = userPosts.map(post => post.id === postId ? { ...post, ...updatedContent } : post);
        setUserPosts(updatedPosts);
        console.log("Post updated successfully");
        setSelectedPost(null);
      } else {
        console.error("Error updating post:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const updateMedia = async () => {
    try {
      setIsUpdating(true);
      const response = await fetch(`${BASE_URL}/profiles/${userData.name}/media`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: avatarUrl,
          banner: bannerUrl
        }),
      });

      if (response.ok) {
        setUpdateComplete(true);
        setProfileData({
          ...profileData,
          avatar: avatarUrl,
          banner: bannerUrl
        });
        setAvatarUrl("");
        setBannerUrl("");
        console.log("Avatar and Banner updated successfully");
      } else {
        console.error("Error updating Avatar and Banner:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating Avatar and Banner:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!profileData) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h3 className="text-2xl font-bold mb-6">My Profile</h3>
      <div className="flex flex-col md:flex-row items-start justify-between bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <h4 className="text-lg font-semibold">Profile:</h4>
              <p className="text-gray-800">{profileData.name}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold">Email:</h4>
              <p className="text-gray-800">{profileData.email}</p>
            </div>
            <div className="mb-4">
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
            <div className="mb-4">
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
            <div className="mb-4">
              <h4 className="text-lg font-semibold">Followers:</h4>
              {/* <p className="text-gray-800">{profileData._count.followers}</p> */}
              <ul className="list-disc pl-5 mt-2">
                {profileData.followers.map((follower, index) => (
                  <li key={index}>
                    <Link to={`/profile/${follower.name}`} className="text-cyan-700 hover:underline">{follower.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold">Following:</h4>
              {/* <p className="text-gray-800">{profileData._count.following}</p> */}
              <ul className="list-disc pl-5 mt-2">
                {profileData.following.map((following, index) => (
                  <li key={index}>
                    <Link to={`/profile/${following.name}`} className="text-cyan-700 hover:underline">{following.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold">Number of Posts:</h4>
              <p className="text-gray-800">{profileData._count.posts}</p>
            </div>
          </div>
        </div>
        <div className="md:ml-6 mt-6 md:mt-0 flex-shrink-0">
          {!showUpdateForm ? (
            <button
              onClick={() => setShowUpdateForm(true)}
              className="bg-pink-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
            >
              Update Avatar/Banner
            </button>
          ) : (
            <>
              <input
                type="text"
                placeholder="Avatar URL"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg py-2 px-4 block w-full mt-4"
              />
              <input
                type="text"
                placeholder="Banner URL"
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg py-2 px-4 block w-full mt-4"
              />
              <button
                onClick={updateMedia}
                className="bg-pink-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-4 w-full"
              >
                Update Avatar/Banner
              </button>
            </>
          )}
          {isUpdating && (
            <p className="text-green-500 mt-4">Updating...</p>
          )}
          {updateComplete && (
            <p className="text-green-500 mt-4">Update complete!</p>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-4">Posts by {profileData.name}</h3>
        <ul className="space-y-4">
          {userPosts.map(post => (
            <li key={post.id} className="bg-white p-4 shadow rounded-lg">
              <Link to={`/posts/${post.id}`} className="text-lg font-semibold text-cyan-700 hover:underline">{post.title}</Link>
              <div className="mt-2 flex space-x-2">
                <button onClick={() => handleDelete(post.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
                <button onClick={() => setSelectedPost(post)}
                  className="bg-blue-900 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedPost && (
        <UpdatePostModal
          postId={selectedPost.id}
          existingPost={selectedPost}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Account;
