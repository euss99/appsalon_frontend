<script setup>
import { RouterView } from "vue-router";
import HeaderNewAppointment from "@/components/HeaderNewAppointment.vue";
</script>

<template>
  <HeaderNewAppointment />
  <div class="space-y-5">
    <RouterView />
  </div>
</template>
