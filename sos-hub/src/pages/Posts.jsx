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
      <div className="text-center m-8">
        <h2 className="text-lg mb-4">You need to log in to view posts.</h2>
        <Link to="/login">
          <button className="bg-blue-900 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded p-10">
            Log in
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-pink-500">Posts</h1>
      <div className="text-center mb-8">
        <Link to="/create-post">
          <button className="bg-blue-900 hover:bg-pink-500 text-white font-bold py-2 px-6 rounded">
            Create new post
          </button>
        </Link>
      </div>
      <ul className="flex flex-wrap justify-around gap-6">
        {posts.map((post) => (
          <li key={post.id} className="bg-white shadow-lg rounded-2xl p-6 flex-1 min-w-[300px] max-w-[30%]">
            <Link
              to={`/posts/${post.id}`}
              className="block w-full h-full"
            >
              {post.media && (
                <img
                  src={post.media}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-2xl mb-4"
                />
              )}
              <h2 className="text-2xl font-semibold text-pink-500 hover:text-blue-900 mb-4">
                {post.title}
              </h2>
              <p className="text-gray-700 text-base mb-4">
                {post.body.length > 150 ? `${post.body.substring(0, 150)}...` : post.body}
              </p>
              <p className="text-blue-900 hover:underline font-medium">
                Read more
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
