export function setUser(state, user) {
  state.user.data = user;
}

export function setToken(state, token) {
  state.user.token = token;
  if (token) {
    sessionStorage.setItem("TOKEN", token);
  } else {
    sessionStorage.removeItem("TOKEN");
  }
}

export function showToast(state, message) {
  state.toast.show = true;
  state.toast.message = message;
}

export function hideToast(state) {
  state.toast.show = false;
  state.toast.message = "";
}

export function setCategories(state, [loading, data = null]) {
  if (data) {
    state.categories = { ...state.categories, data: data.data };
  }

  state.categories.loading = loading;
}
