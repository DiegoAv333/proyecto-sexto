import anim from "../../styles/animations.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className={anim.fadeIn} aria-labelledby="home-title">
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8 grid place-items-center mx-a4uto mb-4">
            <svg class="h-8 w-8 text-blue-600 " fill="currentColor" viewBox="0 0 24 24" >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <h1
              id="home-title"
              className="text-4xl font-bold text-dark-gray mb-2"
            >
              Inscribite YA
            </h1>
            <p className="text-gray-600 text-lg">
              Sistema de Inscripciones Estudiantiles
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-semibold text-dark-gray mb-4">
              ¡Bienvenido!
            </h2>
            <p className="text-gray-600 mb-6">
              Gestioná tus inscripciones de manera fácil y rápida
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-strong-blue text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => navigate("/register")}
                className="w-full border-2 border-strong-blue text-strong-blue py-3 px-6 rounded-xl font-medium hover:bg-strong-blue hover:text-white"
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
