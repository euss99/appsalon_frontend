<script setup>
import { formatCurrency } from "../helpers";
import { useAppointmentsStore } from "../stores/appointments";

const appointmentsStore = useAppointmentsStore();

defineProps({
  service: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="p-5 space-y-5 rounded-md cursor-pointer bg-white"
    @click="appointmentsStore.onServiceSelected(service)"
  >
    <p class="text-2xl font-light">{{ service.name }}</p>
    <p class="text-3xl font-black text-blue-600">
      {{ formatCurrency(service.price) }}
    </p>
  </div>
</template>
