import { createContext, ReactNode, useMemo } from "react";
import { IAppContext } from "../interfacesTypes";
import { useLocalStorage } from "../utils";

const defaultContext = {
  user: null,
  setUser: () => {},
};
export const AppContext = createContext<IAppContext>(defaultContext);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, _setUser] = useLocalStorage("user", null);
  const value = useMemo(
    () => ({
      user,
      setUser: _setUser,
    }),
    [user]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
