import Login from './Login';
import './PageLogin.css';
import Header from './Header';

function PageLogin() {
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
    // Acá iría la llamada a la API de autenticación
  };

  return (
    <div className='page-login'>
      <Header />
      <h1>Bienvenido</h1>
      <div className='formulario'>
        <Login
          onLoginSubmit={handleLogin}
        />
      </div>
    </div>
  );
}

export default PageLogin;