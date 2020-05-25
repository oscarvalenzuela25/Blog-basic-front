import { basePath, apiVersion } from "./config";

export const getPostsApi = (limit, page) => {
  const url = `${basePath}/${apiVersion}/get-posts?limit=${limit}&page=${page}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
};

export const deletePostApi = (token, idPost) => {
  const url = `${basePath}/${apiVersion}/delete-post/${idPost}`;

  const params = {
    method: "DELETE",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const addPostApi = (token, post) => {
  const url = `${basePath}/${apiVersion}/add-post`;

  const params = {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
};

export const updatePostApi = (token, idPost, post) => {
  const url = `${basePath}/${apiVersion}/update-post/${idPost}`;

  const params = {
    method: "PUT",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
};

export const getPostApi = (urlPost) => {
  const url = `${basePath}/${apiVersion}/get-post/${urlPost}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
