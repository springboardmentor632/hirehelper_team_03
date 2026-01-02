export function getToken() {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
}

export function getAuthHeader() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
