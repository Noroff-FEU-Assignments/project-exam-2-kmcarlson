import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../constants/ApiUrl";
import { useAuth } from "../components/AuthContext";

const Posts = () => {
  const { accessToken } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Noe gikk galt ved henting av poster");
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Feil ved henting av poster:", error);
      }
    };

    fetchPosts();
  }, [accessToken]);

  if (!accessToken) {
    return (
      <div className="text-center mt-8">
      <p className="text-lg mb-4">You need to log in to view posts.</p>
      <Link to="/login" className="text-blue-900 hover:underline text-lg font-bold">
        Log in
      </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Posts</h1>
      <div className="text-center mb-8">
        <Link to="/create-post">
          <button className="bg-blue-900 hover:bg-pink-500 text-white font-bold py-2 px-6 rounded">
            Create new post
          </button>
        </Link>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <li key={post.id} className="bg-white shadow-lg rounded-lg p-6">
            <Link
              to={`/posts/${post.id}`}
              className="text-2xl font-semibold text-pink-500 hover:text-blue-900 block mb-4"
            >
              {post.title}
            </Link>
            <p className="text-gray-700 text-base mb-4">
              {post.body.length > 150 ? `${post.body.substring(0, 150)}...` : post.body}
            </p>
            <Link to={`/posts/${post.id}`} className="text-blue-900 hover:underline font-medium">
              Read more
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
