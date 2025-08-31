import form from "../styles/Form.module.css";
import anim from "../styles/animations.module.css";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
export default function Login() {
  const { login } = useAuth();
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");

    const data = new FormData(e.currentTarget);
    const email = data.get("email")?.toString().trim();
    const password = data.get("password")?.toString();

    if (!email || !password) {
      setErr("Por favor completá todos los campos");
      return;
    }

    try {
      login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setErr(error.message || "No se pudo iniciar sesión");
    }
  };

  return (
    <section className={`${anim.fadeIn} px-4`} aria-labelledby="login-title">
      <div className="min-h-[80vh] grid place-items-center">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-strong-blue rounded-xl grid place-items-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <h1 id="login-title" className="text-3xl font-bold text-dark-gray">Iniciar sesión</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={onSubmit} noValidate aria-describedby={err ? "login-error" : undefined}>
              <div className="space-y-4">
                <div className={form.field}>
                  <label htmlFor="login-email" className={form.label}>Email</label>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={form.input}
                    placeholder="tu@email.com"
                  />
                </div>

                <div className={form.field}>
                  <label htmlFor="login-password" className={form.label}>Contraseña</label>
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={form.input}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div
                role="alert"
                id="login-error"
                aria-live="assertive"
                className={`${form.error} ${err ? "" : "hidden"}`}
              >
                {err}
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-strong-blue text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700"
              >
                Ingresar
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                ¿No tenés cuenta?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-strong-blue hover:underline font-medium"
                >
                  Registrate
                </button>
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-2 text-gray-500 hover:text-dark-gray"
              >
                ← Volver al inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
=======
function Login({ onLoginSubmit, onRegisterSubmit }) {
  const [isRegistering, setIsRegistering] = useState(false);

  // estados compartidos
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // sólo para registro
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setEmail('');
    setConfirmPassword('');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isRegistering) {
      // Validaciones simples de ejemplo
      if (!email.trim()) {
        setError('Por favor, ingresá tu email.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden.');
        return;
      }

      if (onRegisterSubmit) {
        onRegisterSubmit({ username, email, password });
      } else {
        // Fallback si no pasaste onRegisterSubmit desde el padre
        console.log('Registro:', { username, email, password });
      }
      resetForm();
      setIsRegistering(false); // opcional: volver al login
      return;
    }

    // flujo de login
    if (onLoginSubmit) {
      onLoginSubmit(username, password);
    } else {
      console.log('Login:', { username, password });
    }
    resetForm();
  };

  const toggleMode = () => {
    setIsRegistering(prev => !prev);
    setError('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>{isRegistering ? 'Crear cuenta' : 'Iniciar Sesión'}</h2>

        {/* username */}
        <div>
          <label htmlFor="loginUsername">Username:</label>
          <input
            type="text"
            id="loginUsername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* email solo en registro */}
        {isRegistering && (
          <div>
            <label htmlFor="registerEmail">Email:</label>
            <input
              type="email"
              id="registerEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}

        {/* password */}
        <div>
          <label htmlFor="loginPassword">Password:</label>
          <input
            type="password"
            id="loginPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* confirmar password solo en registro */}
        {isRegistering && (
          <div>
            <label htmlFor="confirmPassword">Confirmar Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit">{isRegistering ? 'Crear cuenta' : 'Ingresar'}</button>

        {error && <div className="error">{error}</div>}

        <p className="register-option">
          {isRegistering ? '¿Ya tenés una cuenta?' : '¿No tenés una cuenta?'}{' '}
          <button type="button" className="linklike" onClick={toggleMode}>
            {isRegistering ? 'Iniciar sesión' : 'Regístrate aquí'}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
>>>>>>> feat/login-fix-anto
