"use client";

import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { Button } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import DescriptionUpdate from "./config-dialog-components/description-update";

export default function ConfigDialog({ title, onClose, showDialog }) {
  const dialogRef = useRef(null);
  const [showProfile, setShowProfile] = useState(true);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showGeneral, setShowGeneral] = useState(false);
  const [theme, setTheme] = useState("");
  const { data: session, status, update } = useSession();
  const [name, setName] = useState(session.user.name);
  const [email, setEmail] = useState(session.user.email);
  const [data, setData] = useState(true);
  const [history, setHistory] = useState(false);
  const [imageUrl, setImageUrl] = useState(session.user.image);
  //const [password, setPassword] = useState("");
  const [updatingSession, setUpdatingSession] = useState(false);
  const [updatingHistory, setUpdatingHistory] = useState(false);

  const fetchSettings = async () => {
    const res = await fetch(
      `/api/database/students/${session.user.id}/settings`
    );
    const settings = await res.json();
    setTheme(settings.theme);
    setData(settings.data_collection);
  };

  useEffect(() => {
    if (showDialog === true) {
      dialogRef.current?.showModal();
      if (session.user.role == "Student") {
        fetchSettings();
      }
    } else {
      dialogRef.current?.close();
    }
    if (history) {
      location.reload();
    }
  }, [showDialog, history]);

  const closeDialog = () => {
    dialogRef.current?.close();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    session.user.image = imageUrl;
    session.user.name = name;

    try {
      update({ name, email, image: imageUrl });
      const res = await fetch(`/api/database/users/${session.user.id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: name,
          email: email,
          image: imageUrl,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`API call failed with status: ${res.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (option, value = null) => {
    try {
      if (option == "data") {
        const res = await fetch(
          `/api/database/students/${session.user.id}/settings`,
          {
            method: "PUT",
            body: JSON.stringify({
              data_collection: !data,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`API call failed with status: ${res.status}`);
        }

        setData(!data);
      } else if (option == "theme") {
        const res = await fetch(
          `/api/database/students/${session.user.id}/settings`,
          {
            method: "PUT",
            body: JSON.stringify({
              theme: value,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setTheme(value);
        location.reload();

        if (!res.ok) {
          throw new Error(`API call failed with status: ${res.status}`);
        }
      } else if (option == "delete account") {
        const confirmDelete = confirm(
          "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer. No podrás crear otra cuenta con este correo electrónico."
        );
        if (confirmDelete) {
          const currentTimestamp = new Date().toISOString();
          const res = await fetch(`/api/database/users/${session.user.id}`, {
            method: "PUT",
            body: JSON.stringify({
              deleted_at: currentTimestamp,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!res.ok) {
            throw new Error(`API call failed with status: ${res.status}`);
          } else {
            signOut({ callbackUrl: "/" });
          }
        }
      } else if (option == "delete history") {
        setUpdatingHistory(true);
        const res = await fetch(
          `/api/database/students/${session.user.id}/messages/session`,
          {
            method: "PUT",
            body: JSON.stringify({
              deleted: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        location.reload();

        if (!res.ok) {
          throw new Error(`API call failed with status: ${res.status}`);
        }
        setHistory(true);
        setUpdatingHistory(false);
      } else if (option == "new session") {
        setUpdatingSession(true);
        const res = await fetch(
          `/api/database/students/${session.user.id}/messages/start-new-session`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        location.reload();

        if (!res.ok) {
          throw new Error(`API call failed with status: ${res.status}`);
        }
        setUpdatingSession(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  ////////////////////////////////////////////////////////////////////////////////

  const dialog =
    showDialog === true ? (
      <dialog
        ref={dialogRef}
        className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10 backdrop:bg-gray-800/50"
      >
        <div className="w-[600px] h-[450px] max-w-full flex flex-col ">
          <div className="flex flex-row justify-between mb-4 pt-2 px-5">
            <h1 className="group relative w-full flex justify-center py-2 px-4 text-lg font-medium">
              {title}
            </h1>
            <button
              onClick={closeDialog}
              className="mb-2 py-1 px-2 cursor-pointer border-none w-8 h-8 text-3xl"
            >
              ×
            </button>
          </div>
          {status === "loading" ? (
            <div></div>
          ) : (
            <div>
              {session.user.role == "Student" && (
                <div className="config-structure grid grid-cols-4 gap-6 mx-4">
                  <div className="side-bar flex flex-col col-span-1">
                    <a
                      href="#"
                      className={
                        showProfile
                          ? "bg-black rounded-lg my-2 p-2 text-white"
                          : "p-2 my-2"
                      }
                      onClick={() => {
                        setShowProfile(true);
                        setShowPrivacy(false);
                        setShowGeneral(false);
                      }}
                    >
                      Perfil
                    </a>
                    <a
                      href="#"
                      className={
                        showPrivacy
                          ? "bg-black rounded-lg my-2 p-2 text-white"
                          : "p-2 my-2"
                      }
                      onClick={() => {
                        setShowProfile(false);
                        setShowPrivacy(true);
                        setShowGeneral(false);
                      }}
                    >
                      Privacidad
                    </a>
                    <a
                      href="#"
                      className={
                        showGeneral
                          ? "bg-black rounded-lg my-2 p-2 text-white"
                          : "p-2 my-2"
                      }
                      onClick={() => {
                        setShowProfile(false);
                        setShowPrivacy(false);
                        setShowGeneral(true);
                      }}
                    >
                      General
                    </a>
                  </div>
                  <div className="content col-span-3 ">
                    {showProfile && (
                      <div>
                        <form
                          className="space-y-2 text-base"
                          onSubmit={handleSubmit}
                        >
                          <img
                            className="mx-auto h-1/2 w-1/3 rounded-full"
                            src={imageUrl}
                            alt=""
                          />
                          <div className="rounded-md shadow-sm space-y-4 flex flex-row">
                            <label htmlFor="image" className="w-1/5 pt-3">
                              {" "}
                              Image URL:{" "}
                            </label>
                            <input
                              id="image"
                              name="image"
                              type="url"
                              required
                              value={imageUrl}
                              onChange={(e) => setImageUrl(e.target.value)}
                              className="w-4/5 p-1 border border-gray-300 placeholder-gray-500 placeholder:text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                              placeholder="Image URL"
                            />
                          </div>

                          <div className="rounded-md shadow-sm space-y-4 flex flex-row">
                            <label htmlFor="name" className="w-1/5 pt-3">
                              {" "}
                              Nombre:{" "}
                            </label>
                            <input
                              id="name"
                              name="name"
                              autoComplete="name"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-4/5 p-1 border border-gray-300 placeholder-gray-500 placeholder:text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                              placeholder="Name"
                            />
                          </div>
                          <div className="rounded-md shadow-sm space-y-4 flex flex-row">
                            <label htmlFor="email" className="w-1/5 pt-3">
                              {" "}
                              Correo:{" "}
                            </label>
                            <input
                              id="email"
                              name="email"
                              autoComplete="email"
                              required
                              value={email}
                              readOnly
                              className="w-4/5 p-1 border border-gray-300 placeholder-gray-500 placeholder:text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                              placeholder="Email"
                            />
                          </div>
                          <div className="flex justify-center items-center py-4">
                            <Button
                              type="submit"
                              className="group relative w-1/3 flex justify-center py-2 px-4 text-sm font-medium text-white"
                            >
                              Actualizar
                            </Button>
                          </div>
                        </form>
                        <div>
                          <DescriptionUpdate />
                        </div>
                      </div>
                    )}
                    {showPrivacy && (
                      <div className="grid gap-4">
                        <div className="space-y-4 flex flex-row justify-between">
                          <label htmlFor="data" className=" pt-3">
                            {" "}
                            Recopilación de Datos{" "}
                          </label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              id="data"
                              type="checkbox"
                              className="sr-only peer"
                              onChange={() => handleUpdate("data")}
                              checked={data}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 dark:peer-focus:ring-[#7471D9] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#7471D9]"></div>
                          </label>
                        </div>
                        <div className="space-y-4 flex flex-row justify-between">
                          <div className=" pt-3"> Borrar cuenta </div>
                          <Button
                            className="group relative w-1/5 flex justify-center py-2 px-4 text-sm font-medium text-white"
                            onClick={() => handleUpdate("delete account")}
                            colorScheme="red"
                          >
                            Borrar
                          </Button>
                        </div>
                      </div>
                    )}
                    {showGeneral && (
                      <div className="grid gap-4">
                        <div className="space-y-4 flex flex-row justify-between">
                          <label htmlFor="theme" className=" pt-3">
                            {" "}
                            Tema{" "}
                          </label>
                          <select
                            id="theme"
                            name="theme"
                            value={theme}
                            onChange={(e) =>
                              handleUpdate("theme", e.target.value)
                            }
                            className=" w-2/6 p-1 border border-gray-300 placeholder-gray-500 placeholder:text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10  "
                          >
                            <option value="Claro"> Claro </option>
                            <option value="Oscuro"> Oscuro </option>
                          </select>
                        </div>
                        <div className="space-y-4 flex flex-row justify-between">
                          <div className="pt-3">
                            Borrar historial de conversación
                          </div>
                          <Button
                            className="group relative w-1/5 flex justify-center py-2 px-4 text-sm font-medium text-white"
                            onClick={() => handleUpdate("delete history")}
                            colorScheme="red"
                            disabled={updatingHistory}
                          >
                            {updatingHistory ? "Procesando..." : "Borrar"}
                          </Button>
                        </div>
                        <div className="space-y-4 flex flex-row justify-between">
                          <div className="pt-3">Reiniciar Conversación</div>
                          <Button
                            className="group relative w-1/5 flex justify-center py-2 px-4 text-sm font-medium text-white"
                            onClick={() => handleUpdate("new session")}
                            colorScheme="red"
                            disabled={updatingSession}
                          >
                            {updatingSession ? "Procesando..." : "Reiniciar"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {session.user.role == "Admin" && (
                <div className="config-structure grid grid-cols-4 gap-6 mx-4">
                  <div className="side-bar flex flex-col col-span-1">
                    <a href="#" className="bg-black rounded-lg my-2 p-2">
                      Perfil
                    </a>
                  </div>
                  <div className="content col-span-3 ">
                    <form
                      className="space-y-2 text-base"
                      onSubmit={handleSubmit}
                    >
                      <img
                        className="mx-auto h-1/2 w-1/3 rounded-full"
                        src={session.user.image}
                        alt=""
                      />
                      <div className="rounded-md shadow-sm space-y-4 flex flex-row">
                        <label htmlFor="name" className="w-1/5 pt-3">
                          {" "}
                          Nombre:{" "}
                        </label>
                        <input
                          id="name"
                          name="name"
                          autoComplete="name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-4/5 p-1 border border-gray-300 placeholder-gray-500 placeholder:text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 "
                          placeholder="Name"
                        />
                      </div>
                      <div className="rounded-md shadow-sm space-y-4 flex flex-row">
                        <label htmlFor="email" className="w-1/5 pt-3">
                          {" "}
                          Correo:{" "}
                        </label>
                        <input
                          id="email"
                          name="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-4/5 p-1 border border-gray-300 placeholder-gray-500 placeholder:text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 "
                          placeholder="Email"
                        />
                      </div>
                      <div className="flex justify-center items-center py-4">
                        <Button
                          type="submit"
                          className="group relative w-1/3 flex justify-center py-2 px-4 text-sm font-medium text-white "
                          colorScheme="facebook"
                        >
                          Actualizar
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </dialog>
    ) : null;

  return dialog;
}
