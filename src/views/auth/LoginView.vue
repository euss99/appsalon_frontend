<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";
import AuthAPI from "../../api/AuthAPI";

const toast = inject("toast");
const router = useRouter();

const handleSubmit = async (formData) => {
  try {
    const {
      data: { token },
    } = await AuthAPI.loginUser(formData);

    localStorage.setItem("AUTH_TOKEN", token);
    router.push({ name: "my-appointments" });
  } catch (error) {
    console.log(error);

    toast.open({
      message: error.response.data.msg,
      type: "error",
    });
  }
};
</script>

<template>
  <h1 class="text-5xl font-extrabold text-white text-center mt-10">
    Iniciar sesión
  </h1>
  <p class="text-xl text-white text-center mt-5">
    Si tienes una cuenta, inicia sesión
  </p>

  <FormKit
    id="loginForm"
    type="form"
    :actions="false"
    incomplete-message="No se pudo enviar, revisa los campos"
    @submit="handleSubmit"
  >
    <FormKit
      type="email"
      label="Email"
      name="email"
      placeholder="Email de registro"
      validation="required|email"
      :validation-messages="{
        required: 'El email es obligatorio',
        email: 'Email no valido',
      }"
    />

    <FormKit
      type="password"
      label="Password"
      name="password"
      placeholder="Password de usuario"
      validation="required"
      :validation-messages="{
        required: 'El password es obligatorio',
      }"
    />

    <FormKit type="submit" label="Iniciar sesión" />
  </FormKit>
</template>
