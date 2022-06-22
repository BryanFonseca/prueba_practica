import { createContext, useState, useReducer, useEffect } from "react";

// fill up for autocompletion help
const AuthContext = createContext({});

const userInfoReducer = (state, action) => {
  if (action.type === "LOGIN") {
    return {
      usuarioId: action.payload.usuarioId,
      nombres: action.payload.nombres,
      token: action.payload.token,
      isAdmin: action.payload.isAdmin,
    };
  }
  return {
    ...state,
  };
};

const initialUserInfoState = {
  usuarioId: null,
  nombre: null,
  apellido: null,
  token: null,
};

let isInitial = true;
export const AuthContextProvider = (props) => {
  const [userInfo, dispatchUserAction] = useReducer(
    userInfoReducer,
    initialUserInfoState
  );

  useEffect(() => {
    // comprobar local storage
    const authData = JSON.parse(localStorage.getItem("authData"));

    if (!authData) return;
    dispatchUserAction({
      type: "LOGIN",
      payload: {
        ...authData,
      },
    });
  }, []);

  const dispatchLogin = (action) => {
    dispatchUserAction(action);
  };

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    localStorage.setItem("authData", JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        dispatchUserAction,
        dispatchLogin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
