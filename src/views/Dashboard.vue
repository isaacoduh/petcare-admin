<template>
  <div class="mb-2 flex items-center justify-between">
    <h1 class="text-3xl font-semibold">Dashboard</h1>
  </div>
</template>

<script setup>
import { UserIcon } from "@heroicons/vue/outline";
import axiosClient from "../axios.js";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const customersCount = ref(0);
</script>

<style scoped></style>
