<script setup>
import { useUserStore } from "@/stores/user";
import AdminAppointment from "@/components/AdminAppointment.vue";

const userStore = useUserStore();
</script>

<template>
  <p class="text-white text-lg mt-5">
    A continación podrás administrar tus proximas citas
  </p>
  <p v-if="userStore.loading" class="text-white text-2xl text-center mt-5">
    Cargando...
  </p>
  <div v-else>
    <p
      v-if="userStore.noAppointmentsUser"
      class="text-white text-2xl text-center mt-5"
    >
      No tienes próximas citas
    </p>
    <div v-else class="space-y-3">
      <AdminAppointment
        v-for="appointment in userStore.userAppointments"
        :key="appointment._id"
        :appointment="appointment"
      />
    </div>
  </div>
</template>
