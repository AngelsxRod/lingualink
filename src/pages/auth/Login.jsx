import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/forms";
import { Button } from "../../components/ui";
import { SquareArrowLeft } from "lucide-react";
const Login = () => {
  const navigate = useNavigate(); // Esto te permitirá navegar

  const handleGoBack = () => {
    navigate(-1); // Esto llevará al usuario a la página anterior
  };

  return (
    <div className="h-screen md:flex">
      {/* Botón de regresar */}
      <Button className="absolute z-50 top-4 left-4" onClick={handleGoBack}>
        <SquareArrowLeft />
      </Button>

      <div
        className="relative md:flex w-1/2 justify-around items-center hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center p-4">
          <h1 className="text-white font-bold text-4xl font-sans">
            LinguaLink
          </h1>
          <p className="text-white mt-1">
            La plataforma ideal para estudiantes que buscan aprender juntos
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:w-1/2 justify-center items-center bg-white h-full">
        <div className="bg-white max-w-md w-full p-8">
          <h1 className="text-gray-800 font-bold text-3xl mb-1">
            Inicia sesión
          </h1>
          <p className="text-sm font-normal text-gray-400 mb-7">
            Bienvenido de nuevo, estudiante
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
