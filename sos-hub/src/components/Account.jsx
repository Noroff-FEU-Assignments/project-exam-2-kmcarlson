import React, { useState, useEffect } from "react";
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
        const response = await fetch(`${BASE_URL}/profiles/${userData.name}`, {
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
        const updatedPosts = userPosts.map(post => {
          if (post.id === postId) {
            return { ...post, ...updatedContent };
          }
          return post;
        });
        setUserPosts(updatedPosts);
        console.log("Post updated successfully");
        setSelectedPost(null); // Lukk modalen etter at oppdateringen er fullført
      } else {
        console.error("Error updating post:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h3 className="text-2xl font-bold mb-4">My Profile</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Profile:</h2>
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
          <h2 className="text-lg font-semibold">Number of followers:</h2>
          <p className="text-gray-800">{profileData._count.followers}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Number following:</h2>
          <p className="text-gray-800">{profileData._count.following}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-4">Posts by {profileData.name}</h3>
          <ul>
            {userPosts.map(post => (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
                <button onClick={() => setSelectedPost(post)}>Update</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8">
        {!showUpdateForm ? (
          <button
            onClick={() => setShowUpdateForm(true)}
            className="bg-pink-500 hover:bg-pink-700 text-black font-bold py-2 px-4 rounded"
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
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal mt-4"
            />
            <input
              type="text"
              placeholder="Banner URL"
              value={bannerUrl}
              onChange={(e) => setBannerUrl(e.target.value)}
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal mt-4"
            />
            <button
              onClick={updateMedia}
              className="bg-pink-500 hover:bg-pink-700 text-black font-bold py-2 px-4 rounded mt-4"
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
