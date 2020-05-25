import { basePath, apiVersion } from "./config";

export function getMenus() {
  const url = `${basePath}/${apiVersion}/get-menus`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.menus;
    })
    .catch((error) => {
      return error.message;
    });
}

export function updateMenuApi(token, idMenu, data) {
  const url = `${basePath}/${apiVersion}/update-menu/${idMenu}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.mensaje;
    })
    .catch((error) => {
      return error.message;
    });
}

export function activateMenu(token, idMenu, data) {
  const url = `${basePath}/${apiVersion}/activate-menu/${idMenu}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.mensaje;
    })
    .catch((error) => {
      return error.message;
    });
}

export function addMenuApi(token, menu) {
  const url = `${basePath}/${apiVersion}/add-menu`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(menu),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.mensaje;
    })
    .catch((error) => {
      return error.message;
    });
}

export function deleteMenuApi(token, idMenu) {
  const url = `${basePath}/${apiVersion}/delete-menu/${idMenu}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.mensaje;
    })
    .catch((error) => {
      return error.mensaje ? error.mensaje : error.message;
    });
}
