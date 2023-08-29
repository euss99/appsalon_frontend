import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppointmentsStore = defineStore("appointments", () => {
  const appointments = ref([]);

  function onServiceSelected(service) {
    console.log(service);
  }

  return { onServiceSelected };
});
