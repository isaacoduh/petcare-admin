import axiosClient from "../axios";

export function getCurrentUser({ commit }, data) {
  return axiosClient.get("/user", data).then(({ data }) => {
    commit("setUser", data);
    return data;
  });
}

export function login({ commit }, data) {
  return axiosClient.post("/login", data).then(({ data }) => {
    commit("setUser", data.user);
    commit("setToken", data.token);
    return data;
  });
}

export function logout({ commit }) {
  return axiosClient.post("/logout").then((response) => {
    commit("setToken", null);
    return response;
  });
}

export function getCategories(
  { commit, state },
  { sort_field, sort_direction } = {}
) {
  commit("setCategories", [true]);
  return axiosClient
    .get("/categories", {
      params: { sort_field, sort_direction },
    })
    .then((response) => {
      commit("setCategories", [false, response.data]);
    })
    .catch(() => {
      commit("setCategories", [false]);
    });
}

export function createCategory({ commit }, category) {
  return axiosClient.post("/categories", category);
}

export function updateCategory({ commit }, category) {
  return axiosClient.put(`/categories/${category.id}`, category);
}

export function deleteCategory({ commit }, category) {
  return axiosClient.delete(`/categories/${category.id}`);
}

export function getProducts(
  { commit, state },
  { url = null, search = "", per_page, sort_field, sort_direction } = {}
) {
  commit("setProducts", [true]);
  url = url || "/products";
  const params = {
    per_page: state.products.limit,
  };

  return axiosClient
    .get(url, {
      params: { ...params, search, per_page, sort_field, sort_direction },
    })
    .then((response) => {
      commit("setProducts", [false, response.data]);
    })
    .catch(() => {
      commit("setProducts", [false]);
    });
}

export function getProduct({ commit }, id) {
  return axiosClient.get(`/products/${id}`);
}

export function createProduct({ commit }, product) {
  if (product.images && product.images.length) {
    const form = new FormData();
    form.append("title", product.title);
    product.images.forEach((im) => form.append("images[]", im));
    form.append("description", product.description || "");
    form.append("published", product.published ? 1 : 0);
    form.append("price", product.price);
    product = form;
  }

  return axiosClient.post("/products", product);
}

export function updateProduct({ commit }, product) {
  const id = product.id;
  if (product.images && product.images.length) {
    const form = new FormData();
    form.append("id", product.id);
    form.append("title", product.title);
    product.images.forEach((im) => form.append(`images[${im.id}]`, im));
    if (product.deleted_images) {
      product.deleted_images.forEach((id) =>
        form.append("deleted_images[]", id)
      );
    }
    for (let id in product.image_positions) {
      form.append(`image_positions[${id}]`, product.image_positions[id]);
    }
    form.append("description", product.description || "");
    form.append("published", product.published ? 1 : 0);
    form.append("price", product.price);
    form.append("_method", "PUT");
    product = form;
  } else {
    product._method = "PUT";
  }

  return axiosClient.post(`/products/${id}`, product);
}

export function deleteProduct({ commit }, id) {
  return axiosClient.delete(`/products/${id}`);
}
