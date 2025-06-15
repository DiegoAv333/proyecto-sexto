import React from "react";
import "../style/Home.css";
import { Link } from 'react-router-dom';

function Home() {
    return(
        <div className="home">
        <div className="home-main-text">
            <h1>Bienvenido a <span>
                Inscribete YA
                </span>
                </h1>
            <p>Inscribirse a una materia nunca fue tan facil</p>
        </div>
        <div className="home-main-link">
                <Link to="/login" className="link-login">Inicia Sesion</Link>
        </div>
    </div>
    )
}
export default Home;