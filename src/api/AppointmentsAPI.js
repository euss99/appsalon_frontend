import api from "../lib/axios";

const token = localStorage.getItem("AUTH_TOKEN");

export default {
  createAppointment(appointment) {
    return api.post("/appointments", appointment);
  },
  getByDate(date) {
    return api.get(`/appointments?date=${date}`);
  },
};
