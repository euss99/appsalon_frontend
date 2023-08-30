<script setup>
import ServiceSelected from "@/components/ServiceSelected.vue";
import { formatCurrency } from "@/helpers";
import { useAppointmentsStore } from "@/stores/appointments";

const appointmentsStore = useAppointmentsStore();
</script>

<template>
  <h2 class="text-4xl font-extrabold text-white mt-10">
    Detalles cita y resumen
  </h2>
  <p class="text-white text-lg">
    A continuación verifica la información y confirma tu cita
  </p>

  <h3 class="text-2xl font-extrabold text-white">Servicios</h3>

  <p
    v-if="appointmentsStore.noServicesSelected"
    class="text-white text-2xl text-center"
  >
    No hay servicios seleccionados
  </p>
  <div v-else class="grid gap-5">
    <ServiceSelected
      v-for="service in appointmentsStore.services"
      :key="service._id"
      :service="service"
    />

    <p class="text-white text-right text-2xl">
      Total a pagar:
      <span class="font-black">{{
        formatCurrency(appointmentsStore.totalAmount)
      }}</span>
    </p>
  </div>
</template>
