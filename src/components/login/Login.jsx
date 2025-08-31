import React, { useState } from 'react';
import './Login.css';

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
