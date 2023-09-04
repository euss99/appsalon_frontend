<script setup>
import { onMounted, inject, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AuthAPI from "../../api/AuthAPI";

const toast = inject("toast");
const route = useRoute();
const router = useRouter();
const { token } = route.params;
const validToken = ref(false);

onMounted(async () => {
  try {
    await AuthAPI.verifyPasswordResetToken(token);
    validToken.value = true;
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: "error",
    });
  }
});

const handleSubmit = async (data) => {
  const { password } = data;

  try {
    const { data } = await AuthAPI.updatePassword(token, { password });
    toast.open({
      message: data.msg,
      type: "success",
    });

    setTimeout(() => {
      router.push({ name: "login" });
    }, 2000);
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: "error",
    });
  }
};
</script>

<template>
  <div v-if="validToken">
    <h1 class="text-4xl font-extrabold text-white mt-10 text-center">
      Nuevo password
    </h1>
    <p class="text-xl text-white mt-5 text-center">Coloca tu nuevo password</p>

    <FormKit
      id="forgotPasswordForm"
      type="form"
      :actions="false"
      incomplete-message="No se pudo enviar, revisa los campos"
      @submit="handleSubmit"
    >
      <FormKit
        type="password"
        label="Password"
        name="password"
        placeholder="Password de usuario - Min 8 caracteres"
        validation="required|length:8"
        :validation-messages="{
          required: 'El password es obligatorio',
          length: 'El password debe contener al menos 8 caracteres',
        }"
      />

      <FormKit
        type="password"
        label="Repetir password"
        name="password_confirm"
        placeholder="Repite el password"
        validation="required|confirm"
        :validation-messages="{
          required: 'El password es obligatorio',
          confirm: 'Los passwords no son iguales',
        }"
      />

      <FormKit type="submit" label="Guardar password" />
    </FormKit>
  </div>
  <p v-else class="text-center text-2xl font-black text-white">
    Token no válido
  </p>
</template>
