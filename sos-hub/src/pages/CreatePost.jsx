import  { useState } from "react";
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
    setPost({ ...post, [name]: value });
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
       
        throw new Error("Noe gikk galt ved opprettelse av post");
      }
    } catch (error) {
      console.error("Feil ved opprettelse av post:", error);
    }
  };
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">Opprett ny post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Tittel
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
        <div className="mb-4">
          <label htmlFor="body" className="block text-gray-700 font-bold mb-2">
            Beskrivelse
          </label>
          <textarea
            id="body"
            name="body"
            value={post.body}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full h-32"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-700 font-bold mb-2">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={post.tags}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
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
        <button type="submit" className="bg-pink-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Opprett post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
