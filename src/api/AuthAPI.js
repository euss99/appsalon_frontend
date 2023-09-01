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
};
