<template>
  <div v-if="currentUser.id" class="min-h-full bg-gray-200 flex">
    <div class="flex-1">
      <main class="p-6">
        <router-view></router-view>
      </main>
    </div>
  </div>
  <div v-else class="min-h-full bg-gray-200 flex items-center justify-center">
    <!-- <Spinner /> -->
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
const { title } = defineProps({ title: String });
const currentUser = computed(() => store.state.user.data);
import store from "../store";

onMounted(() => {
  store.dispatch("getCurrentUser");
});
</script>

<style scoped></style>
