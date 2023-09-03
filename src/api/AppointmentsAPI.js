import api from "../lib/axios";

export default {
  createAppointment(appointment) {
    return api.post("/appointments", appointment);
  },
  getByDate(date) {
    return api.get(`/appointments?date=${date}`);
  },
  getUserAppointments(userId) {
    return api.get(`/users/${userId}/appointments`);
  },
  getById(id) {
    return api.get(`/appointments/${id}`);
  },
  updateAppointment(id, data) {
    return api.put(`/appointments/${id}`, data);
  },
};
