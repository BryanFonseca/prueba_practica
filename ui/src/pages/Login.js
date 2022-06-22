import { useFormik } from "formik";
import * as Yup from "yup";

import { useContext } from "react";
import AuthContext from "../context/auth-context";
import classes from "./Login.module.css";
import useHttp from "../hooks/use-http";

import { API_BASE_URL } from "../globals";
import { useHistory } from "react-router-dom";

const LoginFormik = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      user: "",
      password: "",
    },
    onSubmit: onLoginHandler,
    validationSchema: Yup.object({
      user: Yup.string()
        .min(10, "El número de cédula debe tener 10 dígitos.")
        .required("Campo obligatorio."),
      password: Yup.string().required("Campo obligatorio."),
    }),
  });

  const { dispatchLogin } = useContext(AuthContext);
  const { sendRequest, serverErrorMessage, isLoading } = useHttp();

  function onLoginHandler(values) {
    sendRequest({
      url: `${API_BASE_URL}/auth/login`,
      method: "POST",
      body: {
        user: values.user,
        password: values.password,
      },
    })
      .then((data) => {
        dispatchLogin({
          type: "LOGIN",
          payload: {
            isAdmin: data.isAdmin,
            nombres: data.nombres,
            usuarioId: data.id,
            token: data.token,
          },
        });
        const path = data.isAdmin ? "/admin/all" : "/docente/";
        history.push(path);
      })
      .catch((err) => {});
  }

  return (
    <form className={classes.loginForm} onSubmit={formik.handleSubmit}>
      <div className={classes.inputContainer}>
        <label htmlFor="user">Usuario</label>
        <input
          id="user"
          onBlur={formik.handleBlur}
          value={formik.values.user}
          onChange={formik.handleChange}
          type="text"
          name="user"
          label="Usuario"
        />
        {formik.errors.user && formik.touched.user ? (
          <div className={classes.validationError}>{formik.errors.user}</div>
        ) : null}
      </div>
      <div className={classes.inputContainer}>
        <label htmlFor="pass">Contraseña</label>
        <input
          id="pass"
          onBlur={formik.handleBlur}
          value={formik.values.password}
          onChange={formik.handleChange}
          type="password"
          name="password"
          label="Contraseña"
        />
        {formik.errors.password && formik.touched.password ? (
          <div className={classes.validationError}>
            {formik.errors.password}
          </div>
        ) : null}
      </div>

      <div className={classes.buttonContainer}>
        <button className={classes.button} type="submit">
          Iniciar sesión
        </button>
      </div>
      {isLoading && <p>Cargando...</p>}
      {serverErrorMessage && <p>{serverErrorMessage}</p>}
    </form>
  );
};

export default LoginFormik;
