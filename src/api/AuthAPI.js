import api from "../lib/axios";

export default {
  registerUser(data) {
    return api.post("/auth/register", data);
  },
  verifyUser(token) {
    return api.get(`/auth/verify/${token}`);
  },
  loginUser(data) {
    return api.post("/auth/login", data);
  },
  userAuth() {
    return api.get("/auth/user");
  },
  adminAuth() {
    return api.get("/auth/admin");
  },
  forgotPassword(data) {
    return api.post("/auth/forgot-password", data);
  },
  verifyPasswordResetToken(token) {
    return api.get(`/auth/forgot-password/${token}`);
  },
  updatePassword(token, data) {
    return api.patch(`/auth/forgot-password/${token}`, data);
  },
};

/*
  El segundo parámetro de un get es un objeto de configuración, donde podemos especificar
  los headers, los parámetros, etc.
  El segundo parámetro de un post es el body, donde se envía la información que se quiere
  enviar al servidor, y el tercer parámetro es el objeto de configuración.
*/
