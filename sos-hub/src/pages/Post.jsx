import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../constants/ApiUrl";
import { useAuth } from "../components/AuthContext";

const Post = () => {
  const { accessToken } = useAuth();
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Noe gikk galt ved henting av post");
        }

        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Feil ved henting av post:", error);
      }
    };

    fetchPost();
  }, [accessToken, id]);

  if (!post) {
    return <div>Laster...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  );
};

export default Post;
