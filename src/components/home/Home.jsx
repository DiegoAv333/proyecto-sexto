import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const CourseCard = ({ category, code, title, description, schedule }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300">
    <div className="h-3 bg-blue-600"></div>
    <div className="p-6">
      <div className="flex items-center justify-between">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
          {category}
        </span>
        <span className="text-sm text-gray-500">Código: {code}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
      <div className="mt-4 flex items-center text-sm text-gray-500">
        <svg
          className="h-5 w-5 mr-1 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>• {schedule}</span>
      </div>
      <div className="mt-6">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition duration-300">
          Ver detalles
        </button>
      </div>
    </div>
  </div>
);

function App() {
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="bg-gray-50">
      {/* NAVBAR */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span className="ml-2 text-xl font-bold text-gray-800">
                  inscribete
                  <span className="text-blue-600 font-extrabold">YA</span>
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <button
                  onClick={(e) => handleScroll(e, 'hero')}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Inicio
                </button>
                <button
                  onClick={(e) => handleScroll(e, 'sobreNosotros')}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Sobre Nosotros
                </button>

                <button
                  onClick={(e) => handleScroll(e, 'masInfo')}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Más Info
                </button>
              </div>
              <div className="ml-6">
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Iniciar sesión
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-pattern py-16 md:py-24" id="hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                Bienvenido a <span className="gradient-text">inscribete YA</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Tu plataforma académica para inscripciones rápidas y eficientes.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4">
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-base font-medium shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Inscribirme ahora
                </Link>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2">
              {}
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE INSCRIBETE YA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              ¿Qué es inscribete
              <span className="text-blue-600">YA</span>?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Inscribete YA es una plataforma web diseñada para simplificar y agilizar el proceso de inscripción académica. Permite a estudiantes explorar el catálogo de materias, ver información detallada de cada asignatura y completar inscripciones de forma segura y rápida.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          </div>
        </div>
      </section>

{/* SOBRE NOSOTROS */}
<section className="py-16 bg-gray-50" id="sobreNosotros">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-800">Sobre Nosotros</h2>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
        Somos un equipo de estudiantes y desarrolladores apasionados por mejorar la gestión académica.
        Nuestro objetivo es ofrecer una plataforma moderna, eficiente y accesible para todos.
      </p>
    </div>

    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
      {[
        { nombre: "Camilo Arce", desc: "Desarrollador Frontend y coordinador del proyecto.", emoji: "💻" },
        { nombre: "Antonella Sanchez", desc: "Diseñadora UX/UI responsable de la experiencia visual.", emoji: "🎨" },
        { nombre: "Diego Aviléz", desc: "Encargado de la base de datos y lógica del servidor.", emoji: "🗄️" },
        { nombre: "Constanza Falleti", desc: "Gestión de contenidos y documentación técnica.", emoji: "📝" },
        { nombre: "Máximo Retamal", desc: "QA Tester y encargado de control de calidad.", emoji: "🔍" },
        { nombre: "Lucía Muñoz", desc: "Soporte técnico y despliegue del proyecto.", emoji: "🛠️" },
        { nombre: "Joaquín Aviléz", desc: "Desarrollador Backend y mantenimiento del sistema.", emoji: "⚙️" },
      ].map((persona, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 w-60 text-center p-6"
        >
          <div className="h-20 w-20 mx-auto flex items-center justify-center rounded-full bg-blue-50 text-4xl mb-4">
            {persona.emoji}
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{persona.nombre}</h3>
          <p className="mt-2 text-gray-600 text-sm">{persona.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>



      {/* CALL TO ACTION */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">¿Listo para inscribirte?</h2>
          <p className="mt-4 text-lg text-blue-100">
            No pierdas tiempo y asegura tu lugar.
          </p>
          <div className="mt-8 flex justify-center">
           
            <Link
            to="/register"><button
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-md text-lg font-medium shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              Comenzar ahora
            </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white py-12" id="masInfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Columna logo + descripción */}
            {/* Enlaces rápidos */}
            {/* Soporte */}
            {/* Legal */}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>&copy; 2025 inscribeteYA. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
