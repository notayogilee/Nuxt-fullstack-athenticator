<script setup>
const { register, login, isLoggedIn } = useAuth();
const router = useRouter();

onMounted(() => {
  if (isLoggedIn.value) {
    router.push("/");
  }
});

const email = ref("");
const password = ref("");
const username = ref("");
const error = ref("");

const handleRegister = async () => {
  try {
    error.value = "";
    await register(email.value, password.value, username.value);
    router.push("/login");
  } catch (error) {
    error.value = "Registration failed";
  }
};
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div
      class="bg-white flex flex-col items-center justify-center w-1/2 h-1/2 p-24 shadow-2xl rounded-lg"
    >
      <h1 class="pb-12 text-2xl">Register</h1>
      <form class="w-full flex flex-col gap-5" @submit.prevent="handleRegister">
        <input
          v-model="email"
          type="email"
          placeholder="email"
          class="px-3 py-1 border-gray-300 border rounded-lg"
        />
        <input
          v-model="username"
          type="text"
          placeholder="username"
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
        <p v-if="error" class="text-red-600">{{ error }}</p>
        <p class="text-center">
          Already have an account?
          <NuxtLink class="underline" to="/login">Login here!</NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>
