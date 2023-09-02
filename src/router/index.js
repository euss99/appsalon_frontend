import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AppointmentsLayout from "../views/appointments/AppointmentsLayout.vue";
import AuthAPI from "../api/AuthAPI";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/reservaciones",
      component: AppointmentsLayout,
      meta: { requiresAuth: true }, // GUARD de navegación, solo se puede acceder si está logueado
      children: [
        {
          path: "",
          name: "my-appointments",
          component: () =>
            import("../views/appointments/MyAppointmentsView.vue"),
        },
        {
          path: "nueva",
          component: () =>
            import("../views/appointments/NewAppointmentLayout.vue"),
          children: [
            {
              path: "", // Queremos que aparezca cuando sea /nueva
              name: "new-appointment",
              component: () => import("../views/appointments/ServicesView.vue"),
            },
            {
              path: "detalles",
              name: "details-appointment",
              component: () =>
                import("../views/appointments/DetailsAppointmentView.vue"),
            },
          ],
        },
        {
          path: ":id/editar",
          component: () =>
            import("../views/appointments/EditAppointmentLayout.vue"),
          children: [
            {
              path: "", // Queremos que aparezca cuando sea /nueva
              name: "edit-appointment",
              component: () => import("../views/appointments/ServicesView.vue"),
            },
            {
              path: "detalles",
              name: "edit-details-appointment",
              component: () =>
                import("../views/appointments/DetailsAppointmentView.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../views/auth/AuthLayout.vue"),
      children: [
        {
          path: "registro",
          name: "register",
          component: () => import("../views/auth/RegisterView.vue"),
        },
        {
          path: "confirmar-cuenta/:token",
          name: "confirm-account",
          component: () => import("../views/auth/ConfirmAccountView.vue"),
        },
        {
          path: "login",
          name: "login",
          component: () => import("../views/auth/LoginView.vue"),
        },
      ],
    },
  ],
});

/* 
  El beforeEach se ejecuta antes de mandar a llamar a la ruta y mostrar la información,
  ya que antes de mostrar la información queremos validar si el usuario está logueado o no.
  to: ruta a la que se quiere acceder
  from: ruta desde la que se quiere acceder
  next: función que se ejecuta para continuar con la navegación
*/
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((url) => url.meta.requiresAuth); // Verifica si la ruta a la que se quiere acceder tiene el meta requiresAuth, retorna true o false.

  if (requiresAuth) {
    // Si la ruta a la que se quiere acceder requiere autenticación
    try {
      await AuthAPI.userAuth(); // Se verifica si el usuario está logueado
      next(); // Continúa con la navegación
    } catch (error) {
      next({ name: "login" }); // Si no está logueado, se redirecciona al login
    }
  } else {
    // Si la ruta a la que se quiere acceder no requiere autenticación
    next(); // Continúa con la navegación
  }
});

export default router;
