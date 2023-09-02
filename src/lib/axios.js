import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API,
});

api.interceptors.request.use((config) => {
  // config es la configuración de la petición
  const token = localStorage.getItem("AUTH_TOKEN");

  // Si existe el token, lo agrega a la cabecera de la petición
  if (token) {
    // Agregamos el token a la cabecera de la petición
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config; // Siempre debemos retornar la configuración
  // De esta forma va a formar parte de cada petición que hagamos
});

export default api;
