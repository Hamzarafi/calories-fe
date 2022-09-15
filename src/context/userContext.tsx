import { useLazyQuery, useQuery } from "@apollo/client";
import { createContext, useEffect, useState } from "react";
import decode from "jwt-decode";

import { UserCall, UserType } from "../models/objects/User";

export interface AuthContextInterface {
  auth: any;
  setAuthAndSave: any;
}
const userKey = "USER_LOCAL_KEY";
export const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState<UserType>();

  useEffect(() => {
    const userLocalStorage =
      window && window.localStorage && window.localStorage.getItem(userKey);
    if (userLocalStorage) {
      const data = JSON.parse(userLocalStorage);
      if (data) {
        const decodedToken: any = decode(data.token);

        if (!decodedToken.exp || Date.now() >= decodedToken.exp * 1000) {
          setAuth(undefined);
        } else {
          setAuth(data);
        }
      }
    }
  }, []);

  const setAuthAndSave = (input: UserType) => {
    if (window && window.localStorage) {
      window.localStorage.setItem(userKey, JSON.stringify(input));
    }
    setAuth(input);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuthAndSave }}>
      {children}
    </AuthContext.Provider>
  );
};
