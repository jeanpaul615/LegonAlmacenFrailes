import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import legon_banner from "../assets/legon_banner.png";
import leon_legon from "../assets/leon_legon.png";
import { ApisAdmin } from "../containers/isAdmin";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  // eslint-disable-next-line
  const [isAdmin, setIsAdmin] = useState(false); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };

    try {
      const response = await axios.post("https://legonalmacenfrailes-1.onrender.com/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseapi = await ApisAdmin(username);
      console.log(responseapi);
      const { token, message } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("isAdmin", responseapi); // Almacena isAdmin en localStorage
        setIsAdmin(responseapi); // Almacena isAdmin en estado local

        setLoginSuccessful(true);
        navigate("/datatablestock");
      } else {
        setError(message || "Error desconocido");
        setLoginSuccessful(false);
      }
    } catch (error) {
      setError("Error al iniciar sesión. Inténtalo de nuevo.");
      setLoginSuccessful(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="lg:w-3/2 lg:pr-0.5">
        <div className="p-6 bg-yellow-500 rounded-lg shadow-md hidden md:flex flex-col items-center">
          <img src={legon_banner} className="h-20 w-48 mb-4" alt="legonbanner" />
          <img src={leon_legon} className="h-96 w-72" alt="leonbanner" />
        </div>
      </div>
      <div className="bg-slate-800 p-12 justify-center items-center max-w-md w-full space-y-8 lg:w-1/2 lg:pl-8 rounded-lg border">
        <div className="relative">
          <h2 className="absolute top-0 left-0 text-center text-3xl font-extrabold text-yellow-500">
            INICIA SESIÓN EN TU CUENTA
          </h2>
          <h2 className="relative pl-1 text-center text-3xl font-extrabold text-white">
            INICIA SESIÓN EN TU CUENTA
          </h2>
        </div>
        {loginSuccessful ? null : (
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">Usuario</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="mt-3 appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out shadow-sm focus:shadow-md"
                  placeholder="Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Contraseña</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-3 appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out shadow-sm focus:shadow-md"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white font-bold">
                  Recuérdame
                </label>
              </div>

              <div className="text-sm">
                <a href="/" className="font-medium text-yellow-600 hover:text-yellow-500">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 hover:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Iniciar sesión
              </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
