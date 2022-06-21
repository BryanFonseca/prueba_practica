import { createContext } from "react";

// fill up for autocompletion help
const AppContext = createContext({});

export const AppContextProvider = (props) => {
  return (
    <AppContext.Provider
      value={{
        userInfo: {
          name: "TestName",
          lastName: "TestLastName",
        },
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
