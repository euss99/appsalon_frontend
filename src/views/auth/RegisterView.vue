<script setup>
import { inject } from "vue";
import { reset } from "@formkit/vue";
import AuthAPI from "@/api/AuthAPI";

const toast = inject("toast");

const handleSubmit = async (data) => {
  const { password_confirm, ...formData } = data;

  try {
    const result = await AuthAPI.registerUser(formData);

    toast.open({
      message: result.data.msg,
      type: "success",
    });

    reset("registerForm");
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
    Crea una cuenta
  </h1>
  <p class="text-xl text-white text-center mt-5">Crea una cuenta en AppSalon</p>

  <FormKit
    id="registerForm"
    type="form"
    :actions="false"
    incomplete-message="No se pudo enviar, revisa los campos"
    @submit="handleSubmit"
  >
    <FormKit
      type="text"
      label="Nombre"
      name="name"
      placeholder="Tu nombre"
      validation="required|length:3"
      :validation-messages="{
        required: 'El nombre es obligatorio',
        length: 'El nombre es muy corto',
      }"
    />

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

    <FormKit type="submit" label="Crear cuenta" />
  </FormKit>
</template>
