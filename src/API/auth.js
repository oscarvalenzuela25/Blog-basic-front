import { basePath, apiVersion } from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

export function getAccessToken() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (!accessToken || accessToken === "null" || accessToken === "undefined") {
    return null;
  }

  return willExpireToken(accessToken) ? null : accessToken;
}

export function getRefreshToken() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  if (
    !refreshToken ||
    refreshToken === "null" ||
    refreshToken === "undefined"
  ) {
    return null;
  }

  return willExpireToken(refreshToken) ? null : refreshToken;
}

export function refreshAccessToken(refreshToken) {
  const url = `${basePath}/${apiVersion}/refresh-access-token`;
  const bodyObj = {
    refreshToken,
  };
  const params = {
    method: "POST",
    body: JSON.stringify(bodyObj),
    headers: {
      "Content-type": "application/json",
    },
  };

  fetch(url, params)
    .then((response) => {
      if (response.status !== 200) {
        return null;
      }
      return response.json();
    })
    .then((result) => {
      if (!result) {
        logout();
      } else {
        const { accessToken, refreshToken } = result;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
      }
    });
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

function willExpireToken(token) {
  const seconds = 60;
  const metaToken = jwtDecode(token);
  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000;

  return now > exp;
}
