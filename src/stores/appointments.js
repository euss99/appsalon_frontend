import { ref, computed, onMounted, inject, watch } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

import AppointmentsAPI from "../api/AppointmentsAPI";
import { convertToISO } from "../helpers/dates";
import { da } from "date-fns/locale";

export const useAppointmentsStore = defineStore("appointments", () => {
  const services = ref([]);
  const date = ref("");
  const hours = ref([]);
  const time = ref("");
  const appointmentsByDate = ref([]);

  const toast = inject("toast");
  const router = useRouter();

  onMounted(() => {
    const startHour = 10;
    const endHour = 19;

    for (let hour = startHour; hour <= endHour; hour++) {
      hours.value.push(hour + ":00");
    }
  });

  watch(date, async () => {
    time.value = ""; // Cada vez que cambie la fecha, se borra la hora
    if (date.value === "") return;
    // Cada vez que cambie la fecha, se ejecuta esta función
    try {
      const { data } = await AppointmentsAPI.getByDate(date.value);
      appointmentsByDate.value = data;
    } catch (error) {
      console.log(error);
    }
  });

  const isServiceSelected = computed(() => {
    return (id) => services.value.some((service) => service._id === id);
  });

  const noServicesSelected = computed(() => {
    return services.value.length === 0;
  });

  const totalAmount = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0);
  });

  const isValidReservation = computed(() => {
    return services.value.length && date.value.length && time.value.length;
  });

  const isDateSelected = computed(() => {
    return date.value ? true : false;
  });

  const disableTime = computed(() => {
    return (hour) => {
      // Si la hora está en el array de horas y hay una cita en esa hora, se deshabilita
      return appointmentsByDate.value.find(
        (appointment) => appointment.time === hour
      );
    };
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

  async function createAppointment() {
    const appointment = {
      services: services.value.map((service) => service._id),
      date: convertToISO(date.value), // Funcion que convierte la fecha a ISO
      time: time.value,
      totalAmount: totalAmount.value,
    };

    try {
      const { data } = await AppointmentsAPI.createAppointment(appointment);

      toast.open({
        message: data.msg,
        type: "success",
      });

      router.push({ name: "my-appointments" });
      clearAppointment();
    } catch (error) {
      console.log(error);
    }
  }

  function clearAppointment() {
    services.value = [];
    date.value = "";
    time.value = "";
  }

  return {
    services,
    date,
    hours,
    time,
    isServiceSelected,
    totalAmount,
    noServicesSelected,
    isValidReservation,
    isDateSelected,
    disableTime,
    onServiceSelected,
    deselectService,
    createAppointment,
  };
});
