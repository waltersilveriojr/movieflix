import './assets/styles/custom.scss';
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Routes from './Routes';
import { AuthContext, AuthContextData } from 'AuthContext';
import { useState } from 'react';

function App() {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({    authenticated: false,
  });
  return (
    <div>
    <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
      <Routes />
    </AuthContext.Provider>
    </div>
  );
}

export default App;
