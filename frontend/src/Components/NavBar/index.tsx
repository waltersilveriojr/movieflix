import { AuthContext } from "AuthContext";
import { useEffect, useContext } from "react";
import { getTokenData, isAuthenticated } from "util/auth";

import "./styles.css";
import { removeAuthData } from "util/storage";
import history from "util/history";

const NavBar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleSairClick = (event: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace("/");
  };

  return (
    <div className="navbar navbar-main">
      <div className="navbar-title">
        <h1>MovieFlix</h1>
      </div>
      <div className="navbar-btn">
        {authContextData.authenticated && (
          <h1 onClick={handleSairClick}>
            SAIR
          </h1>
        )}
      </div>
    </div>
  );
};

export default NavBar;
