import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../constants/ApiUrl";
import { useAuth } from "../components/AuthContext";

const Post = () => {
  const { accessToken } = useAuth();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [reaction, setReaction] = useState("");

  const fetchPost = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong fetching the post");
      }

      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [accessToken, id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}/comment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: commentText }),
      });

      if (response.ok) {
        fetchPost();
        setCommentText("");
      } else {
        console.error("Error adding comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleReactionChangeAndSubmit = (newReaction) => {
    setReaction(newReaction);
    handleReactionSubmit(newReaction);
  };

  const handleReactionSubmit = async (newReaction) => {
    if (!newReaction) {
      console.error("Reaction is required");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}/react/${encodeURIComponent(newReaction)}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        fetchPost();
        setReaction("");
        console.log("Reaction added");
      } else {
        console.error("Error adding reaction:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };

  if (!post) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">{post.title}</h1>
        <p className="text-gray-800 mb-4">{post.body}</p>
        {post.media && (
          <img
            src={post.media}
            alt="Post media"
            className="w-full h-auto object-cover rounded-lg mb-4"
          />
        )}
        <div className="flex justify-between mb-4 text-gray-600">
          {post._count.comments > 0 && (
            <p>Comments: {post._count.comments}</p>
          )}
          {post._count.reactions > 0 && (
            <p>Reactions: {post._count.reactions}</p>
          )}
        </div>

        <form onSubmit={handleCommentSubmit} className="mb-6">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full"
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2 w-full"
          >
            Comment
          </button>
        </form>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleReactionChangeAndSubmit("👍")}
            className="bg-pink-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            👍
          </button>
          <button
            onClick={() => handleReactionChangeAndSubmit("❤️")}
            className="bg-pink-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            ❤️
          </button>
          <button
            onClick={() => handleReactionChangeAndSubmit("😂")}
            className="bg-pink-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            😂
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
