import React from "react";
import '../style/NavigateHeader.css'; // Asegúrate de tener este archivo CSS
function NavigateHeader() {
    return (
        <div>
            <nav className="navigate-header">
                <h2>Mi Aplicación</h2>
                <ul className="nav-links">
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/about">Acerca de</a></li>
                    <li><a href="/contact">Contacto</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default NavigateHeader;