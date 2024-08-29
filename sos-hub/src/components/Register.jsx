import { useState } from "react";
import { BASE_URL } from "../constants/ApiUrl";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [banner, setBanner] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.endsWith("stud.noroff.no")) {
      setError("Only emails with the domain 'stud.noroff.no' are allowed.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email,
          password,
          avatar,
          banner,
        }),
      });

      if (response.ok) {
        console.log("Registration successful!");
        navigate("/login");
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData.errors && errorData.errors.length > 0
            ? errorData.errors[0].message
            : "Registration failed. Please try again.";
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error handling registration:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-50">

      <div className="  max-w-md w-full p-8 rounded-lg  bg-white" >

        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block font-bold mb-2 text-gray-700">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-pink-300"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-bold mb-2 text-gray-700">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-pink-300"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-bold mb-2 text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-pink-300"
            />
          </div>
          <div>
            <label htmlFor="avatar" className="block font-bold mb-2 text-gray-700">
              Avatar URL (optional):
            </label>
            <input
              type="text"
              id="avatar"
              value={avatar}
              onChange={(event) => setAvatar(event.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-pink-300"
            />
          </div>
          <div>
            <label htmlFor="banner" className="block font-bold mb-2 text-gray-700">
              Banner URL (optional):
            </label>
            <input
              type="text"
              id="banner"
              value={banner}
              onChange={(event) => setBanner(event.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-pink-300"
            />
          </div>
          {error && <p className="text-red-500 font-semibold">{error}</p>}
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
