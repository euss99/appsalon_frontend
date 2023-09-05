import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import AuthAPI from "../api/AuthAPI";
import AppointmentsAPI from "../api/AppointmentsAPI";

export const useUserStore = defineStore("user", () => {
  const user = ref({});
  const userAppointments = ref([]);
  const loading = ref(true);

  const router = useRouter();

  onMounted(async () => {
    try {
      const { data } = await AuthAPI.userAuth();
      user.value = data;

      await getUserAppointments();
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  });

  const getUserName = computed(() =>
    user.value?.name ? user.value?.name : ""
  );

  const noAppointmentsUser = computed(
    () => userAppointments.value.length === 0
  );

  function logout() {
    localStorage.removeItem("AUTH_TOKEN");
    user.value = {};
    router.push({ name: "login" });
  }

  async function getUserAppointments() {
    const { data } = await AppointmentsAPI.getUserAppointments(user.value._id);
    userAppointments.value = data;
  }

  return {
    user,
    userAppointments,
    loading,
    getUserName,
    noAppointmentsUser,
    logout,
    getUserAppointments,
  };
});
