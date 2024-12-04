"use client"; // Asegura que este componente se renderiza en el cliente

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Cambia la importación a 'next/navigation'

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirige a la página de login al cargar la página
    router.push('/inicio');
  }, [router]);

  return <div>Redirigiendo a la página de inicio...</div>;
};

export default HomePage;
