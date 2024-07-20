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
