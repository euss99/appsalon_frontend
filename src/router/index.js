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
      meta: { requiresAdmin: true },
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
      meta: { requiresAuth: true },
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
              path: "",
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
              path: "",
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

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((url) => url.meta.requiresAuth);

  if (requiresAuth) {
    try {
      const { data } = await AuthAPI.userAuth();
      if (data.admin) {
        next({ name: "admin" });
      } else {
        next();
      }
    } catch (error) {
      next({ name: "login" });
    }
  } else {
    next();
  }
});

router.beforeEach(async (to, from, next) => {
  const requiresAdmin = to.matched.some((url) => url.meta.requiresAdmin);

  if (requiresAdmin) {
    try {
      await AuthAPI.adminAuth();
      next();
    } catch (error) {
      next({ name: "login" });
    }
  } else {
    next();
  }
});

export default router;
