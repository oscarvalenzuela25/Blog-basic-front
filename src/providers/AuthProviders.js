import React, { useState, useEffect, createContext } from "react";
import {
  getAccessToken,
  getRefreshToken,
  logout,
  refreshAccessToken,
} from "../API/auth";
import jwtDecode from "jwt-decode";

/* Este authProvider sirve especialmente cuando alguien entre a la url directa sin recargar la pagina, 
las aplicaciones en react son SPA por ende no necesitan recargar, anteriormente hiciste un sistema en el cual 
todas las vistas tuvieran una comprobacion del usuario si estaba con su token valido, el componente que comprobaba eso era un 
header que estaba estatico y presente en todas las vistas, cuando cambiaba la url, cambiaba el state y refresheaba a los componentes y 
este verificaba que estubiera el token activo*/

export const AuthContext = createContext();

export default function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    checkUserLogin(setUser);
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

function checkUserLogin(setUser) {
  const accessToken = getAccessToken();
  if (!accessToken) {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      logout();
      setUser({
        user: null,
        isLoading: false,
      });
    } else {
      refreshAccessToken(refreshToken);
    }
  } else {
    setUser({
      isLoading: false,
      user: jwtDecode(accessToken),
    });
  }
}
