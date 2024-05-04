import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { api } from "../utils/apiHelper";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const getCookie = (name) => {
    const value = Cookies.get(name);
    return value ? JSON.parse(value) : null;
  };

  const [authUser, setAuthUser] = useState(getCookie("authenticatedUser"));
  const [credentials, setCredentials] = useState(getCookie("credentials"));

  const signIn = async (credentials) => {
    const res = await api("/users", "GET", null, credentials);
    if (res.status === 200) {
      const data = await res.json();
      setAuthUser(data);
      setCredentials(credentials);
      Cookies.set("authenticatedUser", JSON.stringify(data), { expires: 1 });
      Cookies.set("credentials", JSON.stringify(credentials), { expires: 1 });
      return data;
    } else if (res.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  };

  const signOut = () => {
    setAuthUser(null);
    setCredentials(null);
    Cookies.remove("authenticatedUser");
    Cookies.remove("credentials");
  };

  return (
    <UserContext.Provider
      value={{
        authUser,
        credentials,
        actions: {
          signIn,
          signOut,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
