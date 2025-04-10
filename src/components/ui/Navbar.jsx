import { useState } from "react";
import { Button, DropDown } from "../ui";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { LogoImage } from "../../assets";

export const Navbar = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { isAuthenticated, logoutUser } = useAuth();

  const handleSelect = (option) => {
    if (option === "Cerrar session") {
      logoutUser();
    }
    setSelectedOption(option);
  };

  return (
    <header className="bg-black">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a className="block text-emerald-500" href="#">
          <span className="sr-only">Home</span>
          <img className="h-12 stroke-2" src={LogoImage} alt="Logo" />
        </a>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link
                  className="text-gray-300 transition hover:text-gray-300/75"
                  to="/"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-300 transition hover:text-gray-300/75"
                  to="/about"
                >
                  Acerca de nosotros
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-300 transition hover:text-gray-300/75"
                  to="/objectives"
                >
                  Objetivos
                </Link>
              </li>
              <li>
                <a
                  className="text-gray-300 transition hover:text-gray-300/75"
                  href="#"
                >
                  Servicios
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              {isAuthenticated ? (
                <>
                  <DropDown
                    options={["Perfil", "Cerrar session"]}
                    onSelect={handleSelect}
                    avatar="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  />
                </>
              ) : (
                <>
                  <Button variant="solid" as="link" to="/auth/login">
                    Iniciar sesión
                  </Button>
                  <Button variant="outline">Crear cuenta</Button>
                </>
              )}
            </div>

            <button className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
