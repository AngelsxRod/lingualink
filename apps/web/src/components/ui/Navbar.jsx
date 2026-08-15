import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, DropDown } from "../ui";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { LogoImage } from "../../assets";

export const Navbar = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated, logoutUser } = useAuth();

  const handleSelect = (option) => {
    if (option === "Cerrar session") {
      logoutUser();
    }
    setSelectedOption(option);
    setIsSidebarOpen(false); // Cierra el sidebar al seleccionar
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      {/* Navbar Desktop */}
      <header className="sticky w-full z-50 top-0 left-0 bg-black shadow-md">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-emerald-500">
            <img className="h-10" src={LogoImage} alt="Logo" />
          </Link>

          <nav className="hidden md:flex gap-6 text-sm">
            <Link className="text-gray-300 hover:text-white" to="/">
              Inicio
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <DropDown
                options={["Perfil", "Cerrar session"]}
                onSelect={handleSelect}
                avatar="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
              />
            ) : (
              <>
                <Button variant="solid" as="link" to="/auth/login">
                  Iniciar sesión
                </Button>
                <Button variant="outline" as="link" to="/auth/register">
                  Crear cuenta
                </Button>
              </>
            )}
          </div>

          {/* Botón Hamburguesa */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Sidebar Fullscreen animado */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            key="sidebar"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between"
          >
            {/* Encabezado del sidebar */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <img className="h-10" src={LogoImage} alt="Logo" />
              <button
                onClick={toggleSidebar}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navegación */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-6 text-lg font-medium">
              <Link
                onClick={toggleSidebar}
                to="/"
                className="hover:text-emerald-400"
              >
                Inicio
              </Link>
              <Link
                onClick={toggleSidebar}
                to="/about"
                className="hover:text-emerald-400"
              >
                Acerca de nosotros
              </Link>
              <Link
                onClick={toggleSidebar}
                to="/objectives"
                className="hover:text-emerald-400"
              >
                Objetivos
              </Link>
              <a
                onClick={toggleSidebar}
                href="#"
                className="hover:text-emerald-400"
              >
                Servicios
              </a>
              {isAuthenticated ? (
                <DropDown
                  options={["Perfil", "Cerrar session"]}
                  onSelect={handleSelect}
                  avatar="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                />
              ) : (
                <div className="flex flex-col gap-3">
                  <Button
                    variant="solid"
                    as="link"
                    to="/auth/login"
                    onClick={toggleSidebar}
                  >
                    Iniciar sesión
                  </Button>
                  <Button
                    variant="outline"
                    as="link"
                    to="/auth/register"
                    onClick={toggleSidebar}
                  >
                    Crear cuenta
                  </Button>
                </div>
              )}
            </nav>

            {/* Botones de sesión */}
            <div className="p-6 border-t border-gray-700"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
