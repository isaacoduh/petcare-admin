import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "../components/AppLayout.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Categories from "../views/Categories/Categories.vue";
import Products from "../views/Products/Products.vue";
import ProductForm from "../views/Products/ProductForm.vue";
import Orders from "../views/Orders/Orders.vue";
import OrderView from "../views/Orders/OrderView.vue";
import store from "../store";
const routes = [
  { path: "/", redirect: "/app" },
  {
    path: "/app",
    name: "app",
    redirect: "/app/dashboard",
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "dashboard", name: "app.dashboard", component: Dashboard },
      { path: "categories", name: "app.categories", component: Categories },
      { path: "products", name: "app.products", component: Products },
      {
        path: "products/create",
        name: "app.products.create",
        component: ProductForm,
      },
      {
        path: "products/:id",
        name: "app.products.edit",
        component: ProductForm,
        props: {
          id: (value) => /^\d+$/.test(value),
        },
      },
      {
        path: "orders",
        name: "app.orders",
        component: Orders,
      },
      {
        path: "orders/:id",
        name: "app.orders.view",
        component: OrderView,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { requiresGuest: true },
  },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "login" });
  } else if (to.meta.requiresGuest && store.state.user.token) {
    next({ name: "app.dashboard" });
  } else {
    next();
  }
});

export default router;
