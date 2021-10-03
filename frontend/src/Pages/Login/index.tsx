import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getTokenData } from 'util/auth';

import { useContext, useState } from 'react';
import { ReactComponent as Logo } from "assets/images/logo-main.svg";
import "./styles.css";
import { requestBackendLogin } from 'util/requests';
import { saveAuthData } from 'util/storage';
import { AuthContext } from 'AuthContext';

type FormData = {
  username: string;
  password: string;
};

type LocationState = {
  from: string;
}
const Login = () => {

  const location = useLocation<LocationState>();

  const {from} = location.state || {from: { pathname: '/movies'} };

  const { setAuthContextData } = useContext(AuthContext);
  const [hasError, setHasError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const history = useHistory();

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((Response) => {
        setHasError(false);
        saveAuthData(Response.data);
        setAuthContextData({ authenticated: true, tokenData: getTokenData() });
        console.log(from);
        history.replace(from);
      })
      .catch((error) => {
        setHasError(true);
      });
  };
  return (
    <div className="login-main">
      <div className="base-card login-card">
        <h1>LOGIN</h1>
        {hasError && (
          <div className="alert alert-danger">Erro efetuando o login!</div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="mb-4">
            <input
              {...register("username", {
                required: "Campo Obrigatório!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
              type="text"
              className={`form-control login-input ${
                errors.username ? "is-invalid" : ""
              } `}
              placeholder="Email"
              name="username"
            />
            <div className="invalid-feedback d-block">
              {errors.username?.message}
            </div>
          </div>
          <div className="mb-2">
            <input
              {...register("password", {
                required: "Campo Obrigatório!",
              })}
              type="password"
              className="form-control login-input"
              placeholder="Password"
              name="password"
            />
            <div className="invalid-feedback d-block">
              {errors.password?.message}
            </div>
          </div>
          <div className="login-form-submit">
            <button className="btn">FAZER LOGIN</button>
          </div>
        </form>
      </div>
      <div className="login-img-main">
        <div>
          <h1>Avalie Filmes</h1>
          <p>
            Diga o que você achou do seu <br /> filme favorito
          </p>
        </div>
        <div>
          <Logo />
        </div>
      </div>
    </div>
  );
};
export default Login;
