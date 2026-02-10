<script setup>
const { user, isLoggedIn, logout } = useAuth();
const router = useRouter();

onMounted(() => {
  if (!isLoggedIn.value) {
    navigateTo("/login");
  }
});

const error = ref("");

const handleLogout = async () => {
  try {
    error.value = "";
    await logout();
    router.push("/login");
    routerKey.push;
  } catch (error) {
    error.value = "There was an error logging out";
  }
};
</script>

<template>
  <div v-if="isLoggedIn" class="flex items-center justify-center h-screen">
    <div
      class="bg-white flex flex-col items-center justify-center w-1/2 h-1/2 p-24 shadow-2xl rounded-lg"
    >
      <h1 class="pb-12 text-2xl">Home Page</h1>
      <h3>Welcome {{ user?.username }}</h3>

      <button
        class="rounded-lg p-2 mt-4 mx-auto bg-red-500 text-bold text-white w-1/2"
        @click="handleLogout"
      >
        Logout
      </button>
      <p v-if="error" class="text-red-700">{{ error }}</p>
    </div>
  </div>
</template>
