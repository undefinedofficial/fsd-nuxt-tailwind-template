<template>
  <h2 class="text-5xl text-blue-700">Index Page</h2>

  <NuxtLink class="py-2 px-4 bg-red-500 text-white" to="/login">To Login</NuxtLink>
</template>

<script lang="ts" setup>
useHead({ title: "Index Page" });
definePageMeta({ layout: "default" });
</script>
