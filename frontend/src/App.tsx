import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/custom.scss';
import "bootstrap/dist/css/bootstrap.css";
import Routes from './Routes';
import { AuthContext, AuthContextData } from 'AuthContext';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import "./App.css";

function App() {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({    authenticated: false,
  });
  return (
    <div>
    <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
      <Routes />
      <ToastContainer />
    </AuthContext.Provider>
    </div>
  );
}

export default App;
