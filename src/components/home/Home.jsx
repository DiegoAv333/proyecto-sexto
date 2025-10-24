// src/pages/Home.jsx
import React from 'react';
import './Xd.css';

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
