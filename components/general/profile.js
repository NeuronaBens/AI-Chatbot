"use client";
import ConfigDialog from "./config-dialog";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";

const UserProfile = () => {
  const { data: session, status } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const options = useRef(null);

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (options.current && !options.current?.contains(event.target)) {
        setShowMenu(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [options]);

  const handleLogout = () => {
    setShowLogoutConfirmation(true);
  };

  const confirmLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  return (
    <div>
      {status === "loading" ? (
        <div className="relative m-4 w-36"></div>
      ) : (
        <div ref={options} className="relative m-4 w-36">
          <button
            className="flex items-center gap-4"
            onClick={() => setShowMenu(!showMenu)}
          >
            <img
              className="w-10 h-10 rounded-full w-1/5"
              src={session.user.image}
              alt=""
            />
            <div className="font-medium dark:text-white w-4/5">
              <div>{session.user.name}</div>
            </div>
          </button>
          {showMenu && (
            <div className="absolute bottom-10 left-0 z-10 w-36 px-2 py-4 bg-[#DFDFDF] rounded-md shadow-lg">
              <button
                className="block text-sm text-gray-700 py-2 hover:bg-gray-100"
                onClick={() => setShowDialog(true)}
              >
                Configuración
              </button>
              {showDialog && (
                <ConfigDialog
                  title={"Configuración"}
                  onClose={() => setShowDialog(false)}
                  showDialog={true}
                />
              )}
              <button onClick={handleLogout}>
                <p className="text-gray-400 flex py-2">
                  Cerrar Sesion
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 ml-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                </p>
              </button>
            </div>
          )}
        </div>
      )}
      {showLogoutConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h3 className="text-lg font-medium mb-4 text-black">
              ¿Estás seguro de que quieres cerrar sesión?
            </h3>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded mr-2"
                onClick={cancelLogout}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
                onClick={confirmLogout}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
