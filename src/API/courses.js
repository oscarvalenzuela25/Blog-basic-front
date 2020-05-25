import { basePath, apiVersion } from "./config";

export const getCoursesApi = () => {
  const url = `${basePath}/${apiVersion}/get-courses`;

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

export const getCourseDataUdemyApi = (id) => {
  const baseUrl = `https://www.udemy.com/api-2.0/courses/${id}/?fields[course]=`;
  const courseParams = `title,headline,url,price,image_480x270`;
  const url = baseUrl + courseParams;

  //Comentario propio
  //Si usas el fetch y entregar en el response un arreglo o un objeto compuesto de mas elementos y en el segundo response retornas el objeto compuesto, este te retornara un objeto con una promesa
  //Pero si en el result solamente retornas el valor de response.json, este saldra sin promise
  //Para poder retornar un objeto compuesto con los valores del response.json hay que ocupar el async await, el async (response) y el await response.json();
  /*Ejemplo
  return fetch(url)
  .then((response) => {
    return {data: response.json()};
  })
  .then((result) => {
    //Este nos entrega una promesa
    return result;
    //Este nos entrega el objeto
    return result.data
  })
  .catch((error) => {
    return error;
  });
  */

  return fetch(url)
    .then(async (response) => {
      //El response entrega mas informacion sobre la peticion, para poder entregar el objeto compuesto
      //Se uso el async await
      return { code: response.status, data: await response.json() };
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
};

export const addCourseApi = (token, courseInfo) => {
  const url = `${basePath}/${apiVersion}/add-course`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(courseInfo),
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

export const updateCourseApi = (token, id, courseInfoNew) => {
  const url = `${basePath}/${apiVersion}/update-course/${id}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(courseInfoNew),
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

export const deleteCourseApi = (token, id) => {
  const url = `${basePath}/${apiVersion}/delete-course/${id}`;
  console.log(url);
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
      return result;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
