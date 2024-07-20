export default {
  user: { token: sessionStorage.getItem("TOKEN"), data: {} },
  toast: { show: false, message: "", delay: 5000 },
  categories: { loading: false, data: [] },
};
