<script setup>
import { RouterLink } from "vue-router";
import { convertToString } from "@/helpers/dates";
import { formatCurrency } from "@/helpers/index";
import { useAppointmentsStore } from "../stores/appointments";

const appointmentsStore = useAppointmentsStore();

defineProps({
  appointment: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="bg-white p-5 space-y-3 rounded-lg">
    <p class="text-gray-500 font-black">
      Fecha:
      <span class="font-light mr-4">{{
        convertToString(appointment.date)
      }}</span>
      Hora: <span class="font-light">{{ appointment.time }} Horas.</span>
    </p>

    <p class="text-lg font-black">Servicios solicitados en la cita:</p>
    <div v-for="service in appointment.services">
      <p>{{ service.name }}</p>
      <p class="text-xl font-black text-blue-500">
        {{ formatCurrency(service.price) }}
      </p>
    </div>

    <p class="text-2xl font-black text-right">
      Total a pagar:
      <span class="text-blue-600">{{
        formatCurrency(appointment.totalAmount)
      }}</span>
    </p>

    <div class="flex gap-3 items-center">
      <RouterLink
        :to="{ name: 'edit-appointment', params: { id: appointment._id } }"
        class="bg-slate-600 rounded-md p-3 text-white text-sm uppercase font-black flex-1 md:flex-none"
      >
        Editar cita
      </RouterLink>

      <button
        class="bg-red-600 rounded-md p-3 text-white text-sm uppercase font-black flex-1 md:flex-none"
        @click="appointmentsStore.deleteAppointment(appointment._id)"
      >
        Cancelar cita
      </button>
    </div>
  </div>
</template>
