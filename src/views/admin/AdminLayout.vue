<script setup>
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>

<template>
  <div class="flex justify-between">
    <div class="space-y-3">
      <h1 class="text-2xl lg:text-5xl font-black text-white">App Salón</h1>
      <h2 class="text-xl lg:text-2xl font-black text-white">
        Panel de administración
      </h2>
    </div>

    <div class="flex flex-col space-y-5">
      <div class="flex gap-5 items-center">
        <p class="text-white text-right">Hola: {{ userStore.getUserName }}</p>
        <button
          type="button"
          class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-extrabold rounded-md"
          @click="userStore.logout"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  </div>
  <main class="space-y-6">
    <RouterView />
  </main>
</template>
