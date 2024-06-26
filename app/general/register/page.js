"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const isValidEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!isValidEmail(email)) {
      alert("Por favor, ingresa una dirección de correo válida.");
      return;
    }

    // Validate password length
    if (password.length < 8) {
      alert("La contraseña debe contener al menos 8 caracteres.");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          image,
          invitationCode,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        router.push("/general/login");
      } else {
        const data = await res.json();
        if (data.error === "Email already exists") {
          alert(
            "El correo electrónico ya está siendo utilizado por otra cuenta."
          );
        } else if (data.error === "Invalid invitation code") {
          alert("Código de invitación inválido.");
        } else {
          console.error("Error en el registro:", data.error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = (e) => {
    setAcceptTerms(e.target.checked);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crea una Cuenta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                {" "}
                Nombre{" "}
              </label>
              <input
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                {" "}
                Dirección de Correo Electrónico{" "}
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                {" "}
                Contraseña{" "}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                {" "}
                Confirmar Contraseña{" "}
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm password"
              />
            </div>
            <div>
              <label htmlFor="image" className="sr-only">
                {" "}
                Url de Image{" "}
              </label>
              <input
                id="image"
                name="image"
                type="url"
                autoComplete="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Image URL"
              />
            </div>
            <div>
              <label htmlFor="invitationCode" className="sr-only">
                {" "}
                Código de Invitación{" "}
              </label>
              <input
                id="invitationCode"
                name="invitationCode"
                type="text"
                autoComplete="invitationCode"
                required
                value={invitationCode}
                onChange={(e) => setInvitationCode(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Invitation Code"
              />
            </div>
          </div>
          <div>
            <label htmlFor="acceptTerms" className="inline-flex items-center">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600"
                checked={acceptTerms}
                onChange={handleCheckboxChange}
                required
              />
              <span className="ml-2 text-sm text-gray-600">
                Acepto los{" "}
                <a
                  href="/general/legal/terminos-y-condiciones"
                  target="_blank"
                  className="underline text-violet-700"
                >
                  Términos y condiciones
                </a>{" "}
                y la{" "}
                <a
                  href="/general/legal/politica-de-privacidad"
                  target="_blank"
                  className="underline text-violet-700"
                >
                  Politica de Privacidad
                </a>{" "}
                de Calmy.
              </span>
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:opacity-50"
              disabled={!acceptTerms} // Disabled based on checkbox state
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-5a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm0-3a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Registrarme
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
