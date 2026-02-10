export const useAuth = () => {
  const user = userState("user", () => null);
  const isLoggedIn = computed(() => !!user.value);

  const login = async (email, password) => {
    const { data } = await useFetch("/api/auth/login", {
      method: "POST",
      body: { email, password },
    });
    user.value = data.value?.user;
    return data.value;
  };

  const register = async (email, password, username) => {
    const { data } = await useFetch("/api/auth/register", {
      method: "POST",
      body: { email, password, username },
    });
    return data.value;
  };

  const logout = async () => {
    await useRequestFetch("/api/auth/logout", { method: "POST" });
    user.value = null;
  };

  return {
    user,
    isLoggedIn,
    login,
    register,
    logout,
  };
};
