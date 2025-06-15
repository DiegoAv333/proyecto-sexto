import React, { useState } from 'react';
import Login from './Login';
import '../style/PageLogin.css'; 
import Register from './Register';
import Header from './HeaderP';
import FooterP from './FooterP';

function PageLogin() {
  const [isRegistering, setIsRegistering] = useState(false); // false = login, true = register

  const handleLogin = (user, pass) => {
    if (!user || !pass) {
      alert('Por favor, completa ambos campos.');
      return;
    }
    if (user === 'admin' && pass === 'admin') {
      alert('Bienvenido, administrador!');
    }
    else {
      alert('Usuario o contraseña incorrectos.');
    }
    // Aquí iría la llamada a la API de autenticación
  };

  const handleRegister = (userData) => {
    console.log('Intentando registrar nuevo usuario:', userData);
    alert(`Registrando nuevo usuario: ${userData.username}`);
    // Aquí iría la llamada a la API de registro
    setIsRegistering(false); // Volver al login después del registro exitoso
  };

  const goToLogin = () => {
    setIsRegistering(false);
  };

  const goToRegister = () => {
    setIsRegistering(true);
  };

  return (
    <div className='page-login'>
      <h1>Bienvenido</h1>
      <div className='formulario'>
        {isRegistering ? (
          <Register
          onRegisterSubmit={handleRegister}
          onGoToLogin={goToLogin}
          />
        ) : (
          <Login
          onLoginSubmit={handleLogin}
          onGoToRegister={goToRegister}
          />
        )}
      </div>
    </div>
  );
}

export default PageLogin;