import { createContext, useState, useReducer } from "react";

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

export const AuthContextProvider = (props) => {
  const [userInfo, dispatchUserAction] = useReducer(
    userInfoReducer,
    initialUserInfoState
  );

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        dispatchUserAction,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
