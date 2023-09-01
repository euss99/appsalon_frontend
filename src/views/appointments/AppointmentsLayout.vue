<script setup>
import { RouterView } from "vue-router";
import HeaderAppointments from "@/components/HeaderAppointments.vue";
import { useUserStore } from "../../stores/user";

const userStore = useUserStore();
</script>

<template>
  <HeaderAppointments
    :username="userStore.getUserName"
    @logout-user="userStore.logout"
  />
  <main>
    <RouterView />
  </main>
</template>
