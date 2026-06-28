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

  setEmail(email: string) {
    localStorage.setItem("email", email);
  }

  getEmail() {
    return localStorage.getItem("email");
  }

  logout() {
    localStorage.clear();
    window.location.href = "/login";
  }
}

export const {
  setToken,
  setName,
  getName,
  setEmail,
  getEmail,
  getToken,
  logout,
} = new SessionHelper();
