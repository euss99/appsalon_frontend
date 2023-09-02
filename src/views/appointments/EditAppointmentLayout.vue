<script setup>
import { onMounted } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import HeaderEditAppointment from "@/components/HeaderEditAppointment.vue";
import AppointmentsAPI from "../../api/AppointmentsAPI";
import { useAppointmentsStore } from "../../stores/appointments";

const route = useRoute();
const router = useRouter();
const appointmentsStore = useAppointmentsStore();
const { id } = route.params;

onMounted(async () => {
  try {
    const { data } = await AppointmentsAPI.getById(id);

    appointmentsStore.setSelectedAppointment(data);
  } catch (error) {
    console.log(error);
    router.push({ name: "my-appointments" });
  }
});
</script>

<template>
  <HeaderEditAppointment />
  <div class="space-y-5">
    <RouterView />
  </div>
</template>
