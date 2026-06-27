class SessionHelper {
  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken() {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("token");
    }
    return "";
  }

  setName(name: string) {
    localStorage.setItem("name", name);
  }

  getName() {
    return localStorage.getItem("name");
  }

  logout() {
    localStorage.clear();
    window.location.href = "/login";
  }
}

export const { setToken, getToken, logout } = new SessionHelper();
