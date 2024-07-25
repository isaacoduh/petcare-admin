import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "../components/AppLayout.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Categories from "../views/Categories/Categories.vue";
import Products from "../views/Products/Products.vue";
import ProductForm from "../views/Products/ProductForm.vue";
import Orders from "../views/Orders/Orders.vue";
import OrderView from "../views/Orders/OrderView.vue";
import Users from "../views/Users/Users.vue";
import Customers from "../views/Customers/Customers.vue";
import CustomerView from "../views/Customers/CustomerView.vue";
import Report from "../views/Reports/Report.vue";
import OrdersReport from "../views/Reports/OrdersReport.vue";
import CustomersReport from "../views/Reports/CustomersReport.vue";
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
        path: "users",
        name: "app.users",
        component: Users,
      },
      {
        path: "customers",
        name: "app.customers",
        component: Customers,
      },
      {
        path: "customers/:id",
        name: "app.customers.view",
        component: CustomerView,
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
      {
        path: "/report",
        name: "reports",
        component: Report,
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "orders/:date?",
            name: "reports.orders",
            component: OrdersReport,
          },
          {
            path: "customers/:date?",
            name: "reports.customers",
            component: CustomersReport,
          },
        ],
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
