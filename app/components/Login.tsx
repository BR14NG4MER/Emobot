import React from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';

function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-100">
      <Image
      src={"/chatbot-logo.png"}
      alt='Logo'
      width={200}
      height={200}/>
       <h1 className="text-4xl font-bold mb-6">Bienvenido a Emobot</h1>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>
        
        <form className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <TextInput type="email" placeholder="Ingresa tu correo electrónico" />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <TextInput type="password" placeholder="Ingresa tu contraseña" />
          </div>

          {/* Botón para iniciar sesión */}
          <Button 
            className="w-full px-4 py-2 text-white bg-blue-500 rounded"
            href="/inicio"
          >
            Iniciar Sesión
          </Button>
        </form>

        {/* Enlace de recuperación de contraseña */}
        <div className="text-sm text-center">
          <a href="#" className="text-blue-500 hover:underline">¿Olvidaste tu contraseña?</a>
        </div>

        {/* Enlace para crear cuenta  */}
        <div className="text-sm text-center">
          <a href="#" className="text-blue-500 hover:underline">Crear Cuenta</a>
        </div>
      </div>
    </div>
  );
}

interface TextInputProps {
  type: string;
  placeholder: string;
}

function TextInput({ type, placeholder }: TextInputProps) {
  return (
    <input 
      type={type} 
      placeholder={placeholder} 
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

export default Login;
