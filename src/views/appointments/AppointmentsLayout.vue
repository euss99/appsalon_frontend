<script setup>
import { RouterView } from "vue-router";
import HeaderAppointments from "@/components/HeaderAppointments.vue";
</script>

<template>
  <HeaderAppointments />
  <main>
    <RouterView />
  </main>
</template>
