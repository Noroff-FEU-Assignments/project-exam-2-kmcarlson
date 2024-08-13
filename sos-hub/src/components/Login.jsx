import { useState } from "react";
import { BASE_URL } from "../constants/ApiUrl";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { saveAccessToken } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const userData = {
          name: data.name,
          email: data.email,
        };
        saveAccessToken(data.accessToken, userData);
        console.log(data);

        navigate(`/account`);
      } else {
        const errorMessage = await response.text();
        console.error("Innlogging mislyktes:", errorMessage);
        setError("Feil brukernavn eller passord.");
      }
    } catch (error) {
      console.error("Feil:", error);
      setError("Noe gikk galt. Vennligst prøv igjen.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full p-8 rounded-lg shadow-lg">
        <pre>
          {" "}
          br: dangfart1000 email: dangfart1000@stud.noroff.no pw:test1234
        </pre>
        <h2 className="text-2xl font-bold mb-4">Logg inn</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-blue-900"
          >
            Logg inn
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
