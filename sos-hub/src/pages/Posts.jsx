import React, { useState, useEffect } from "react";
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
      <div className="text-center">
        <p>Du må logge inn for å se poster.</p>
        <Link to="/login" className="text-blue-500 hover:underline">
          Logg inn
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">Poster</h1>
      <div className="mb-4">
        <Link to="/create-post" className="text-blue-500 hover:underline">
          Opprett ny post
        </Link>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <li key={post.id} className="bg-white shadow-md rounded-md p-4">
            <Link
              to={`/posts/${post.id}`}
              className="text-lg font-semibold text-pink-500 hover:text-pink-700"
            >
              {post.title}
            </Link>

            <p className="text-gray-600">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
