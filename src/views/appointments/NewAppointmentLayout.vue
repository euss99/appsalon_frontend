<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import HeaderNewAppointment from "@/components/HeaderNewAppointment.vue";
import { useAppointmentsStore } from "@/stores/appointments";

const appointmentStore = useAppointmentsStore();

onMounted(() => {
  appointmentStore.clearAppointment();
});
</script>

<template>
  <HeaderNewAppointment />
  <div class="space-y-5">
    <RouterView />
  </div>
</template>
