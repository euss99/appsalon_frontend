<script setup>
import { ref } from "vue";
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import ServiceSelected from "@/components/ServiceSelected.vue";
import { formatCurrency } from "@/helpers";
import { useAppointmentsStore } from "@/stores/appointments";

const appointmentsStore = useAppointmentsStore();

const formatter = ref({
  date: "DD/MM/YYYY",
  month: "MMM",
});

const disableDate = (date) => {
  const today = new Date();

  return (
    date < today ||
    date.getMonth() > today.getMonth() + 1 ||
    [0, 6].includes(date.getDay())
  );
};
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

  <div class="space-y-8" v-if="!appointmentsStore.noServicesSelected">
    <h3 class="text-3xl font-extrabold text-white">Fecha y Hora</h3>

    <div class="lg: flex flex-col lg:flex-row gap-5">
      <div class="w-full lg:w-96 flex justify-center rounded-md">
        <VueTailwindDatePicker
          :disable-date="disableDate"
          i18n="es-mx"
          as-single
          no-input
          :formatter="formatter"
          v-model="appointmentsStore.date"
        />
      </div>

      <div
        class="w-full flex-1 grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 lg:m-0"
      >
        <button
          type="button"
          v-for="hour in appointmentsStore.hours"
          class="block rounded-md text-xl font-black p-3"
          :class="[
            appointmentsStore.time === hour
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-500',
          ]"
          @click="appointmentsStore.time = hour"
        >
          {{ hour }}
        </button>
      </div>
    </div>

    <div v-if="appointmentsStore.isValidReservation" class="flex justify-end">
      <button
        type="button"
        class="w-full md:w-auto bg-blue-500 p-3 rounded-md uppercase font-black text-white"
        @click="appointmentsStore.createAppointment"
      >
        Confirmar reservación
      </button>
    </div>
  </div>
</template>
