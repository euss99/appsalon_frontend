<script setup>
import { useUserStore } from "../../stores/user";
import UserAppointment from "../../components/UserAppointment.vue";

const userStore = useUserStore();
</script>

<template>
  <h1 class="text-4xl font-extrabold text-white mt-10">Mis citas</h1>
  <p class="text-xl text-white mt-5">
    A continuación podras administrar tus proximas citas
  </p>

  <p v-if="userStore.loading" class="text-white text-2xl text-center mt-5">
    Cargando...
  </p>
  <div v-else>
    <p
      v-if="userStore.noAppointmentsUser"
      class="text-white text-2xl text-center mt-5"
    >
      No tienes proximas citas
    </p>

    <div v-else class="grid grid-cols-1 gap-5 mt-10">
      <UserAppointment
        v-for="appointment in userStore.userAppointments"
        :key="appointment._id"
        :appointment="appointment"
      />
    </div>
  </div>
</template>
