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
