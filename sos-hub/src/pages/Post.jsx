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

  const handleReactionSubmit = async () => {
    if (!reaction) {
      console.error("Reaction is required");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}/react/${encodeURIComponent(reaction)}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        fetchPost();
        setReaction("");
        console.log("Reaction added successfully");
      } else {
        console.error("Error adding reaction:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      {post.media && <img src={post.media} alt="Post media" />}
      {post._count.comments > 0 && (
        <p>Comments: {post._count.comments}</p>
      )}
      {post._count.reactions > 0 && (
        <p>Reactions: {post._count.reactions}</p>
      )}

      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit" className="bg-pink-500 hover:bg-blue-900 py-2 px-4 text-white font-bold rounded">Comment</button>
      </form>

      <div>
        <button onClick={() => { setReaction("👍"); handleReactionSubmit(); }} className="bg-pink-500 hover:bg-blue-900 py-2 px-4 rounded">👍</button>
        <button onClick={() => { setReaction("❤️"); handleReactionSubmit(); }} className="bg-pink-500 hover:bg-blue-900 py-2 px-4 rounded">❤️</button>
        <button onClick={() => { setReaction("😂"); handleReactionSubmit(); }} className="bg-pink-500 hover:bg-blue-900 py-2 px-4 rounded">😂</button>
      </div>
    </div>
  );
};

export default Post;
