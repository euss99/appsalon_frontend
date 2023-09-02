<script setup>
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <nav class="my-5 flex gap-3">
    <RouterLink
      :to="{ name: 'edit-appointment' }"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white rounded-md"
      :class="[
        route.name === 'edit-appointment'
          ? 'bg-blue-500 text-white'
          : 'bg-white text-blue-500',
      ]"
    >
      Servicios
    </RouterLink>

    <RouterLink
      :to="{ name: 'edit-details-appointment' }"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white rounded-md"
      :class="[
        route.name === 'edit-details-appointment'
          ? 'bg-blue-500 text-white'
          : 'bg-white text-blue-500',
      ]"
    >
      Cita y Resumen
    </RouterLink>
  </nav>
</template>
