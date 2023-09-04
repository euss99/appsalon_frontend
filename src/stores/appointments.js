import { ref, computed, onMounted, inject, watch } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

import AppointmentsAPI from "../api/AppointmentsAPI";
import { convertToISO, convertToDDMMYYYY } from "../helpers/dates";
import { useUserStore } from "../stores/user";

export const useAppointmentsStore = defineStore("appointments", () => {
  const services = ref([]);
  const date = ref("");
  const hours = ref([]);
  const time = ref("");
  const appointmentsByDate = ref([]);
  const appointmentId = ref("");

  const toast = inject("toast");
  const router = useRouter();
  const userStore = useUserStore();

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

      // Verificar si se quiere editar la fecha de una cita
      if (appointmentId.value) {
        // Si appointmentId tiene un valor, se está editando una cita.
        appointmentsByDate.value = data.filter(
          (appointment) => appointment._id !== appointmentId.value
        ); // Filtrar las citas que no sean la cita que se está editando

        const currentAppointment = data.filter(
          (appointment) => appointment._id === appointmentId.value
        )[0]; // Obtener la cita que se está editando
        time.value = currentAppointment.time; // Asignar la hora de la cita que se está editando
      } else {
        // Si appointmentId no tiene un valor, se está creando una cita.
        appointmentsByDate.value = data;
      }
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

  function setSelectedAppointment(appointment) {
    appointmentId.value = appointment._id;
    services.value = appointment.services;
    date.value = convertToDDMMYYYY(appointment.date);
  }

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

  async function saveAppointment() {
    const appointment = {
      services: services.value.map((service) => service._id),
      date: convertToISO(date.value), // Funcion que convierte la fecha a ISO
      time: time.value,
      totalAmount: totalAmount.value,
    };

    if (appointmentId.value) {
      try {
        const { data } = await AppointmentsAPI.updateAppointment(
          appointmentId.value,
          appointment
        );

        toast.open({
          message: data.msg,
          type: "success",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await AppointmentsAPI.createAppointment(appointment);

        toast.open({
          message: data.msg,
          type: "success",
        });
      } catch (error) {
        console.log(error);
      }
    }

    clearAppointment();
    userStore.getUserAppointments(); // Actualizar las citas del usuario
    router.push({ name: "my-appointments" });
  }

  async function deleteAppointment(id) {
    if (confirm("¿Deseas cancelar esta cita?")) {
      try {
        const { data } = await AppointmentsAPI.deleteAppointment(id);

        toast.open({
          message: data.msg,
          type: "success",
        });

        userStore.getUserAppointments();
      } catch (error) {
        toast.open({
          message: error.response.data.msg,
          type: "error",
        });
      }
    }
  }

  function clearAppointment() {
    appointmentId.value = "";
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
    setSelectedAppointment,
    onServiceSelected,
    deselectService,
    saveAppointment,
    deleteAppointment,
    clearAppointment,
  };
});
