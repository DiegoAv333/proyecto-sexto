import React from 'react';
import './home.css'; // Corregido

// Componente para las tarjetas de materias
const CourseCard = ({ category, code, title, description, schedule }) => (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300">
        <div className="h-3 bg-blue-600"></div>
        <div className="p-6">
            <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">{category}</span>
                <span className="text-sm text-gray-500">Código: {code}</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">{title}</h3>
            <p className="mt-2 text-gray-600">{description}</p>
            <div className="mt-4 flex items-center text-sm text-gray-500">
                <svg className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
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
  return (
    <div className="bg-gray-50">
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
                <a
                  href="#"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Inicio
                </a>
                <a
                  href="#materias"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Materias
                </a>
                <a
                  href="#masInfo"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Mas Info
                </a>
              </div>
              <div className="ml-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out transform hover:scale-105">
                  Iniciar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;
