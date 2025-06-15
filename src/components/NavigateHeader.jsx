import React from "react";
import '../style/NavigateHeader.css';
import { Link } from 'react-router-dom';
function NavigateHeader() {
    return (
        <div>
            <nav className="navigate-header">
                <h2><Link to="/">Mi Aplicación</Link></h2>
                <ul className="nav-links">
                    <li className="inicio-link"><Link to="/">Inicio</Link></li>
                    <li className="login-link"><Link to="/login">Iniciar Sesion</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default NavigateHeader;