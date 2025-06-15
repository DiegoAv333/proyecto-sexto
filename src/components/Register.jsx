import React, { useState } from 'react';
import '../style/Register.css';
function Register({ onRegisterSubmit, onGoToLogin }) {
  // Estado interno para los inputs de este formulario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    onRegisterSubmit({ username, password, email });
    //limpia campos después de un intento de registro
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setEmail('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='register-form'>
      <h2>Registrarse</h2>
        <div>
          <label htmlFor="regUsername">Username:</label>
          <input
            type="text"
            id="regUsername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="regEmail">Email:</label>
          <input
            type="email"
            id="regEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="regPassword">Password:</label>
          <input
            type="password"
            id="regPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="regConfirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="regConfirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear Cuenta</button>
      <p className='login-option'>¿Ya tienes una cuenta? <a href="#" onClick={onGoToLogin}>Inicia Sesión</a></p>
      </form>
    </div>
  );
}

export default Register;