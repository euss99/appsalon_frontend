import { createRouter, createWebHistory } from "vue-router";
import AppointmentsLayout from "../views/appointments/AppointmentsLayout.vue";
import AdminLayoutVue from "../views/admin/AdminLayout.vue";
import AuthAPI from "../api/AuthAPI";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: "my-appointments" },
    },
    {
      path: "/admin",
      name: "admin",
      meta: { requiresAdmin: true }, // GUARD de navegación, solo se puede acceder si es admin
      component: () => AdminLayoutVue,
      children: [
        {
          path: "",
          name: "admin-appointments",
          component: () => import("../views/admin/AppointmentsView.vue"),
        },
      ],
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
        {
          path: "olvide-password",
          name: "forgot-password",
          component: () => import("../views/auth/ForgotPasswordView.vue"),
        },
        {
          path: "olvide-password/:token",
          name: "new-password",
          component: () => import("../views/auth/NewPasswordView.vue"),
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

// GUARD de navegación que verifica si el usuario está logueado
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((url) => url.meta.requiresAuth); // Verifica si la ruta a la que se quiere acceder tiene el meta requiresAuth, retorna true o false.

  if (requiresAuth) {
    // Si la ruta a la que se quiere acceder requiere autenticación
    try {
      const { data } = await AuthAPI.userAuth(); // Se verifica si el usuario está logueado
      if (data.admin) {
        next({ name: "admin" }); // Si el usuario es admin, se redirecciona a la ruta /admin
      } else {
        next(); // Continúa con la navegación
      }
    } catch (error) {
      next({ name: "login" }); // Si no está logueado, se redirecciona al login
    }
  } else {
    // Si la ruta a la que se quiere acceder no requiere autenticación
    next(); // Continúa con la navegación
  }
});

// GUARD de navegación que verifica si el usuario es admin
router.beforeEach(async (to, from, next) => {
  const requiresAdmin = to.matched.some((url) => url.meta.requiresAdmin); // Verifica si la ruta a la que se quiere acceder tiene el meta requiresAdmin, retorna true o false.

  if (requiresAdmin) {
    try {
      await AuthAPI.adminAuth(); // Se verifica si el usuario es admin
      next(); // Si es admin, se continúa con la navegación
    } catch (error) {
      next({ name: "login" }); // Si no es admin, se redirecciona al login
    }
  } else {
    next(); // Si la ruta a la que se quiere acceder no requiere ser admin, se continúa con la navegación
  }
});

export default router;
