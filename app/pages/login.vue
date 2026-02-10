<script setup>
const { login, isLoggedIn } = useAuth();
const router = useRouter();

onMounted(() => {
  if (isLoggedIn) {
    router.push("/");
  }
});

const email = ref("");
const password = ref("");
const error = ref("");

const handleLogin = async () => {
  try {
    error.value = "";
    await login(email.value, password.value);
    router.push("/");
  } catch (error) {
    error.value = "Invalid credentials";
  }
};
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div
      class="bg-white flex flex-col items-center justify-center w-1/2 h-1/2 p-24 shadow-2xl rounded-lg"
    >
      <h1 class="pb-12 text-2xl">Login</h1>
      <form class="w-full flex flex-col gap-5" @submit.prevent="handleLogin">
        <input
          v-model="email"
          type="email"
          placeholder="email"
          class="px-3 py-1 border-gray-300 border rounded-lg"
        />
        <input
          v-model="password"
          type="password"
          placeholder="password"
          class="px-3 py-1 border-gray-300 border rounded-lg"
        />
        <button
          class="rounded-lg p-2 mt-4mx-auto bg-red-500 text-bold text-white"
        >
          Submit
        </button>
        <p class="text-center">
          Haven't signed up yet?
          <NuxtLink class="underline" to="/register">Register Here!</NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>
