import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../constants/ApiUrl";
import { useAuth } from "../components/AuthContext";

const Post = () => {
  const { accessToken, userData } = useAuth();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [reaction, setReaction] = useState("");

  const fetchPost = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}?_author=true&_reactions=true&_comments=true`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
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

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}/comment/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        fetchPost();
        console.log("Comment deleted");
      } else {
        console.error("Error deleting comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (!post) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-pink-500">{post.title}</h1>
        <p className="text-gray-800 mb-4">{post.body}</p>
        {post.media && (
          <img
            src={post.media}
            alt="Post media"
            className="w-full h-auto object-cover rounded-lg mb-4"
          />
        )}
        <div className="flex justify-between mb-4 text-gray-600">

          {post.reactions && post.reactions.length > 0 && (
            <div className="flex space-x-2">
              {post.reactions.map((reaction) => (
                <div key={reaction.symbol} className="flex items-center space-x-1">
                  <span>{reaction.symbol}</span>
                  <span>{reaction.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {post.comments && post.comments.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Comments</h2>
            <ul>
              {post.comments.map((comment) => (
                <li key={comment.id} className="bg-gray-100 rounded-lg p-4 mb-2">
                  <div className="flex justify-between items-center">
                    <p className="font-italics">{comment.author.name}</p>

                    {userData.name === comment.author.name && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <p className="text-gray-800">{comment.body}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

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
            className="bg-pink-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-2 w-full"
          >
            Comment
          </button>
        </form>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleReactionChangeAndSubmit("👍")}
            className="bg-pink-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          >
            👍
          </button>
          <button
            onClick={() => handleReactionChangeAndSubmit("❤️")}
            className="bg-pink-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          >
            ❤️
          </button>
          <button
            onClick={() => handleReactionChangeAndSubmit("😂")}
            className="bg-pink-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          >
            😂
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
