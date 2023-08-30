import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAppointmentsStore = defineStore("appointments", () => {
  const services = ref([]);

  const isServiceSelected = computed(() => {
    return (id) => services.value.some((service) => service._id === id);
  });

  const noServicesSelected = computed(() => {
    return services.value.length === 0;
  });

  const totalAmount = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0);
  });

  function onServiceSelected(service) {
    const isDuplicateService = services.value.some(
      (selectedService) => selectedService._id === service._id
    );

    if (isDuplicateService) {
      deselectService(service._id);
    } else {
      if (services.value.length === 2) {
        alert("Máximo 2 servicios por cita");
        return;
      }
      services.value.push(service);
    }
  }

  function deselectService(id) {
    services.value = services.value.filter(
      (selectedService) => selectedService._id !== id
    );
  }

  return {
    services,
    isServiceSelected,
    totalAmount,
    noServicesSelected,
    onServiceSelected,
    deselectService,
  };
});
