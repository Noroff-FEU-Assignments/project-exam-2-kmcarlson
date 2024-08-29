import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/ApiUrl";
import { useAuth } from "../components/AuthContext";

const CreatePost = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    body: "",
    tags: [],
    media: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "tags") {

      setPost((prevPost) => ({
        ...prevPost,
        [name]: value.split(",").map(tag => tag.trim())
      }));
    } else {
      setPost((prevPost) => ({
        ...prevPost,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        navigate("/posts");
      } else {
        throw new Error("Something went wrong while creating the post.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-12">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-6">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="body" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            id="body"
            name="body"
            value={post.body}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full h-32"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="tags" className="block text-gray-700 font-bold mb-2">
            Tags (separated by commas)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={post.tags.join(", ")}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="media" className="block text-gray-700 font-bold mb-2">
            Media URL
          </label>
          <input
            type="text"
            id="media"
            name="media"
            value={post.media}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <button type="submit" className="bg-pink-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
