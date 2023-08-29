import api from "../lib/axios";

export default {
  allServices() {
    return api.get("/services");
  },
};
