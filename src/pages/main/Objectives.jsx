import React from "react";
import { motion } from "framer-motion";

const Objectives = () => {
  return (
    <div className="h-full bg-white text-gray-900 flex items-center justify-center">
      <motion.div
        className="max-w-5xl w-full bg-white p-12 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] border border-gray-300 h-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold text-gray-900 mb-10 text-center">
          Objetivos del Proyecto
        </h1>
        <h2 className="text-3xl font-bold text-emerald-500 mb-6">
          Objetivo General
        </h2>
        <p className="text-gray-700 mb-8 text-lg leading-relaxed text-justify">
          Desarrollar una plataforma web gratuita y accesible para centros
          educativos de nivel diversificado, que ofrezca recursos educativos y
          un espacio interactivo para resolver dudas sobre la materia de
          comunicación y lenguaje.
        </p>
        <h2 className="text-3xl font-bold text-emerald-500 mb-6">
          Objetivos Específicos
        </h2>
        <ul className="list-disc list-inside space-y-4 text-gray-700 text-lg text-justify">
          <motion.li whileHover={{ scale: 1.05 }} className="pl-2">
            Evaluar el impacto de la comunidad de preguntas y respuestas en el
            rendimiento académico y la confianza de los estudiantes.
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }} className="pl-2">
            Brindar acceso a recursos educativos para el nivel académico
            diversificado, garantizando su disponibilidad y una navegación fácil
            y eficiente.
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }} className="pl-2">
            Utilizar MongoDB y Atlas para almacenar de manera segura los datos
            de los usuarios y recursos educativos, asegurando que la información
            esté organizada y sea fácilmente accesible.
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }} className="pl-2">
            Emplear ExpressJS para desarrollar el servidor que conectará la
            interfaz de usuario con los datos, permitiendo una experiencia de
            navegación fluida y eficiente.
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }} className="pl-2">
            Usar React para crear una página interactiva y fácil de usar, donde
            los estudiantes puedan acceder a los recursos educativos y
            participar en el espacio de Preguntas y Respuestas.
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }} className="pl-2">
            Implementar Vercel para desplegar la plataforma en línea,
            garantizando que los estudiantes puedan acceder a ella de manera
            rápida y sin complicaciones.
          </motion.li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Objectives;
