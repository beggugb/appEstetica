import { authHeader, api } from "../helpers";

export const crudService = {  
  getData,
  getDataUsuario,
  getLista,
  getItem,
  searchList,
  searchItems,
  createUnit,
  putUnit,
  uploadImagen,
  createList,
  putList,
  putItems,
  deleteList,
  sendItem,
  informes,
  buscarItem
};

function buscarItem(payload, pky) {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  return fetch(`${api}/${payload}/buscar/item/detalle/${pky}`, requestOptions).then(handleResponse);
}
function informes(payload, dato) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(dato),
  };

  return fetch(`${api}/informes/${payload}`, requestOptions).then(handleResponse);
}
function sendItem(payload, pky) {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  return fetch(`${api}/${payload}/send/item/${pky}`, requestOptions).then(handleResponse);
}

function searchItems(payload, dato) {  
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(dato),
  };

  return fetch(`${api}/${payload}/search/items`, requestOptions).then(handleResponse);
} 

function deleteList(payload, pky) {
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  return fetch(`${api}/${payload}/${pky}`, requestOptions).then(handleResponse);
}


function createList(payload, dato) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(dato),
  };
  return fetch(`${api}/${payload}/`, requestOptions).then(handleResponse);
}

function putList(payload, dato) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(dato),
  };
  return fetch(`${api}/${payload}/update/${dato.id}`, requestOptions).then(
    handleResponse
  );
}

function putUnit(payload, dato) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(dato),
  };
  return fetch(`${api}/${payload}/${dato.id}`, requestOptions).then(
    handleResponse
  );
}

function putItems(payload, dato, id) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(dato),
  };
  return fetch(`${api}/${payload}/${id}`, requestOptions).then(
    handleResponse
  );
}



function getItem(payload, pky) {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  return fetch(`${api}/${payload}/${pky}`, requestOptions).then(handleResponse);
}

function createUnit(payload, dato) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(dato),
  };
  return fetch(`${api}/${payload}/registro`, requestOptions).then(handleResponse);
}

function getDataUsuario(payload,page,num,usuario) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${api}/${payload}/data/${page}/${num}/${usuario}`, requestOptions).then(handleResponse);
}

function getData(payload,page,num) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${api}/${payload}/data/${page}/${num}`, requestOptions).then(handleResponse);
}
function getLista(payload) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${api}/${payload}/lista/items/`, requestOptions).then(handleResponse);
}
function searchList(payload, dato) {  
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(dato),
  };

  return fetch(`${api}/${payload}/search`, requestOptions).then(handleResponse);
} 

function uploadImagen(payload, dato, datoId) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader() },
    body: dato,
  };
  return fetch(
    `${api}/files/${payload}/item/${datoId}`,
    requestOptions
  ).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        // logout();
        //location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
