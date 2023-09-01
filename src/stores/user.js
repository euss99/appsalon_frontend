import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import AuthAPI from "../api/AuthAPI";

export const useUserStore = defineStore("user", () => {
  const user = ref({});

  const router = useRouter();

  onMounted(async () => {
    try {
      const { data } = await AuthAPI.userAuth();
      user.value = data.user;
    } catch (error) {
      console.log(error);
    }
  });

  const getUserName = computed(() =>
    user.value?.name ? user.value?.name : ""
  );

  function logout() {
    localStorage.removeItem("AUTH_TOKEN");
    user.value = {};
    router.push({ name: "login" });
  }

  return { user, getUserName, logout };
});
