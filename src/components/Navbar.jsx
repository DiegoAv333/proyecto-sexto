import styles from "../styles/Navbar.module.css";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) return null;

    return (
    <nav
        className={`${styles.sticky} bg-white border-b border-gray-200 shadow-sm`}
        aria-label="Barra de navegación"
    >
        <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
            <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-strong-blue rounded-md"
            aria-label="Ir al Dashboard"
            >
            <div className="w-8 h-8 bg-strong-blue rounded-lg grid place-items-center">
                <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="font-bold text-dark-gray text-xl">EduEnroll</span>
            </button>

          {/* Menú desktop */}
            <ul
            className="hidden md:flex space-x-6"
            role="menubar"
            aria-label="Secciones"
            >
            <li role="none">
                <NavLink
                to="/dashboard"
                role="menuitem"
                className={({ isActive }) =>
                    `px-1 ${
                    isActive
                        ? "text-strong-blue font-semibold"
                        : "text-dark-gray hover:text-strong-blue"
                    }`
                }
                >
                Dashboard
                </NavLink>
            </li>
            <li role="none">
                <NavLink
                to="/profile"
                role="menuitem"
                className={({ isActive }) =>
                    `px-1 ${
                    isActive
                        ? "text-strong-blue font-semibold"
                        : "text-dark-gray hover:text-strong-blue"
                    }`
                }
                >
                Perfil
                </NavLink>
            </li>
            <li role="none">
                <button
                role="menuitem"
                onClick={() => {
                    logout();
                    navigate("/");
                }}
                className="text-red-600 hover:text-red-700 focus-visible:ring-2 focus-visible:ring-red-600 rounded-md px-1"
                >
                Cerrar sesión
                </button>
            </li>
            </ul>
          {/* Menú móvil */}
            <details className="md:hidden">
            <summary
                className="cursor-pointer text-dark-gray"
                aria-label="Abrir menú"
            >
                <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                />
                </svg>
            </summary>
            <ul className="bg-white border rounded-md mt-2 p-2 space-y-2">
                <li>
                <NavLink
                    to="/dashboard"
                    className="block w-full text-left py-2"
                >
                    Dashboard
                </NavLink>
                </li>
                <li>
                <NavLink to="/profile" className="block w-full text-left py-2">
                    Perfil
                </NavLink>
                </li>
                <li>
                <button
                    onClick={() => {
                    logout();
                    navigate("/");
                    }}
                    className="block w-full text-left py-2 text-red-600"
                >
                    Cerrar sesión
                </button>
                </li>
            </ul>
            </details>
        </div>
        </div>
    </nav>
    );

}