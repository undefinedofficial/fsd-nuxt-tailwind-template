<template>
  <h2 class="text-5xl text-blue-700">Login Page</h2>

  <NuxtLink class="py-2 px-4 bg-red-500 text-white" to="/">To Index</NuxtLink>
</template>

<script lang="ts" setup>
useHead({ title: "Login" });
definePageMeta({ layout: "passport" });
</script>
