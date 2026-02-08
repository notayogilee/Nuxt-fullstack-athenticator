<template>
  <div class="flex items-center justify-center h-screen">
    <div
      class="bg-white flex flex-col items-center justify-center w-1/2 h-1/2 p-24 shadow-2xl rounded-lg"
    >
      <h1 class="pb-12 text-2xl">Login</h1>
      <form class="w-full flex flex-col gap-5" action="">
        <input
          type="email"
          placeholder="email"
          class="px-3 py-1 border-gray-300 border rounded-lg"
        />
        <input
          type="text"
          placeholder="password"
          class="px-3 py-1 border-gray-300 border rounded-lg"
        />
        <button
          class="rounded-lg p-2 mt-4mx-auto bg-red-500 text-bold text-white"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>
