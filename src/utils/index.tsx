import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export const useLocalStorage = (keyName: string, defaultValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue: any) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export const PublicWrapper = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(AppContext);
  return Boolean(user) ? children : <Navigate to="/login" replace />;
};
