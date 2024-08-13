import React, { useState } from "react";
import { BASE_URL } from "../constants/ApiUrl";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [banner, setBanner] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Valider e-postadressen
    if (!email.endsWith("stud.noroff.no")) {
      setError("only email 'stud.noroff.no'.");
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
        console.log("Registrering ok!");
      } else {
        console.error("Registrering no good!.");
      }
    } catch (error) {
      console.error("Feil ved håndtering av registrering:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-md px-4 py-8">
      <pre>
        {" "}
        br: dangfart1000 email: dangfart1000@stud.noroff.no pw:test1234
      </pre>
      <h2 className="text-2xl font-bold mb-4">Registrer deg</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block font-bold">
            Brukernavn:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-bold">
            E-postadresse:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-bold">
            Passord:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="avatar" className="block font-bold">
            Avatar URL (valgfritt):
          </label>
          <input
            type="text"
            id="avatar"
            value={avatar}
            onChange={(event) => setAvatar(event.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="banner" className="block font-bold">
            Banner URL (valgfritt):
          </label>
          <input
            type="text"
            id="banner"
            value={banner}
            onChange={(event) => setBanner(event.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-blue-500"
        >
          Registrer
        </button>
      </form>
    </div>
  );
};

export default Register;
