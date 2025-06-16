import React, { useState } from 'react';
import './Login.css';

function Login({onLoginSubmit}) {
  // Estado interno para los inputs de este formulario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSubmit(username, password);
    // limpia los campos después de enviar el login
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='login-form'>
      <h2>Iniciar Sesión</h2>
        <div>
          <label htmlFor="loginUsername">Username:</label>
          <input
            type="text"
            id="loginUsername"
            value={username} // <-- El valor proviene del estado interno
            onChange={(e) => setUsername(e.target.value)} // <-- Actualiza el estado interno
            required
          />
        </div>
        <div>
          <label htmlFor="loginPassword">Password:</label>
          <input
            type="password"
            id="loginPassword"
            value={password} // <-- El valor proviene del estado interno
            onChange={(e) => setPassword(e.target.value)} // <-- Actualiza el estado interno
            required
          />
        </div>
        <button type="submit">Ingresar</button>
        <p className='register-option'>¿No tienes una cuenta? <a href="#">Regístrate aquí</a></p>
      </form>
    </div>
  );
}

export default Login;