import Swal from "sweetalert2";
import storage from './Storage/storage';
import axios from 'axios';

export const show_alerta = (msj, icon) => {
  Swal.fire({ title: msj, icon: icon, buttonsStyling: true });
};

export const sendRequest = async (method, params, url, redir = '', token = true) => {
  // Configuración del token, si se requiere
  if (token) {
    const authToken = storage.get('authToken');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;
  }

  let res;
  try {
    // Configuración de la solicitud según el tipo de datos
    const options = {
      method: method,
      url: url,
      data: params,
      headers: {}
    };

    if (params instanceof FormData) {
      console.log("Enviando FormData:", Array.from(params.entries())); // Verificar datos de FormData
    } else {
      options.headers['Content-Type'] = 'application/json';
      console.log("Enviando JSON:", params); // Verificar datos JSON
    }

    // Realiza la solicitud HTTP
    const response = await axios(options);
    res = response.data;

    if (method !== 'GET') {
      show_alerta(response.data.message, 'success');
    }

    if (redir !== '') {
      setTimeout(() => {
        window.location.href = redir;
      }, 2000);
    }
  } catch (errors) {
    let desc = '';
    console.error("Detalles del error:", errors); // Imprime el error completo en la consola para inspeccionar

    if (errors.response && errors.response.data && errors.response.data.errors) {
      desc = errors.response.data.errors.join(' ');
    } else if (errors.response && errors.response.data && errors.response.data.message) {
      desc = errors.response.data.message;
    } else {
      desc = 'An unexpected error occurred.';
    }
    show_alerta(desc, 'error');
    res = { status: false, message: desc };
  }
  return res;
};

export const confirmation = async (name, url, redir) => {
  const alert = Swal.mixin({ buttonsStyling: true });
  alert.fire({
    title: `Are you sure you want to delete ${name}?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: '<i class="fa-solid fa-check"></i> Yes, delete',
    cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      sendRequest('DELETE', {}, url, redir);
    }
  });
};

export default show_alerta;
