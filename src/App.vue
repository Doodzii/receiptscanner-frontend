<script setup lang="ts">
</script>

<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import SocketioService from "@/services/socket-service";

export default {
  name: "app",
  components: {},
  created() {
    SocketioService.setupSocketConnection();
  }
}
</script>

<template>
  <RouterView />
</template>

<style scoped>


</style>
