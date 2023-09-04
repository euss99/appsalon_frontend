<script setup>
import { inject } from "vue";
import { reset } from "@formkit/vue";
import { useRouter } from "vue-router";
import AuthAPI from "@/api/AuthAPI";

const router = useRouter();
const toast = inject("toast");

const handleSubmit = async (data) => {
  const { email } = data;
  try {
    const { data } = await AuthAPI.forgotPassword({ email });
    toast.open({
      message: data.msg,
      type: "success",
    });
    reset("forgotPasswordForm");
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: "error",
    });
  }
};
</script>

<template>
  <h1 class="text-4xl font-extrabold text-white mt-10 text-center">
    Olvidé mi password
  </h1>
  <p class="text-xl text-white mt-5 text-center">
    Recupera el acceso a tu cuenta
  </p>

  <FormKit
    id="forgotPasswordForm"
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

    <FormKit type="submit" label="Enviar instrucciones" />
  </FormKit>
</template>
