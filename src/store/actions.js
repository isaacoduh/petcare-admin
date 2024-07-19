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
