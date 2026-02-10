export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isLoggedIn } = useAuth();

  const publicRoutes = ["/login", "/register"];

  if (!publicRoutes.includes(to.path) && !isLoggedIn.value) {
    return navigateTo("/login");
  }

  if (publicRoutes.includes(to.path) && isLoggedIn.value) {
    navigateTo("/");
  }
});
