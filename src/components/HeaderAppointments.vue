<script setup>
import { RouterLink } from "vue-router";

defineProps({
  username: {
    type: String,
    required: true,
  },
});

defineEmits(["logout-user"]);
</script>

<template>
  <header class="flex justify-between">
    <h1 class="text-2xl lg:text-5xl font-black text-white">App Salón</h1>

    <div class="flex flex-col space-y-5">
      <div class="flex gap-3 items-center">
        <p class="text-white text-right">Hola: {{ username }}</p>

        <button
          type="button"
          class="bg-red-600 hover:bg-red-700 p-3 text-white uppercase text-xs font-extrabold rounded-md"
          @click="$emit('logout-user')"
        >
          Cerrar sesión
        </button>
      </div>

      <nav class="flex gap-2 items-center justify-end">
        <RouterLink
          type="button"
          class="p-3 text-gray-200 uppercase text-xs font-extrabold rounded-md"
          :to="{ name: 'my-appointments' }"
        >
          Mis citas
        </RouterLink>

        <RouterLink
          :to="{ name: 'new-appointment' }"
          class="p-3 text-gray-200 uppercase text-xs font-extrabold rounded-md bg-blue-700"
        >
          Nueva cita
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
