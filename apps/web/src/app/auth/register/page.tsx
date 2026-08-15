"use client";

import { House } from "lucide-react";
import RegisterForm from "../../../components/forms/RegisterForm";
import { Button } from "../../../components/ui";
import useNavigator from "../../../hooks/useNavigator";
import Link from "next/link";

const Register = () => {
  const { goTo } = useNavigator();

  const handleGoBack = () => {
    goTo("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Button className="absolute z-50 top-4 left-4" onClick={handleGoBack}>
        <House />
      </Button>
      <div className="w-full max-w-3xl mx-6 bg-opacity-90 md:py-0 py-8 ">
        <div className="text-center mb-8">
          <img src="/logo.svg" alt="Logo" className="mx-auto mb-4 size-16 object-contain" />
          <h1 className="text-3xl font-bold text-emerald-500 mb-2">Crear Cuenta</h1>
          <p className="text-sm text-gray-300">Completa los campos para registrarte.</p>
        </div>
        <RegisterForm />
        <p className="text-center mt-6 text-sm text-gray-300">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
