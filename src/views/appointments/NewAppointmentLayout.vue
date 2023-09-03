<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import HeaderNewAppointment from "@/components/HeaderNewAppointment.vue";
import { useAppointmentsStore } from "@/stores/appointments";

const appointmentStore = useAppointmentsStore();

onMounted(() => {
  appointmentStore.clearAppointment();

  /* 
    Apenas cargue el componente queremos que limpie el store de appointments, este componente es un layout pero,
    afectará a los componentes hijos, por lo que no es necesario que cada componente hijo se le aplique la función
    clearAppointment, ya que este componente padre lo hará por ellos.
  */
});
</script>

<template>
  <HeaderNewAppointment />
  <div class="space-y-5">
    <RouterView />
  </div>
</template>
