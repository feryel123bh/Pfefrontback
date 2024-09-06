<template>
  <div class="manager-dashboard">
    <h1>Manager Dashboard</h1>
    <!-- Manager-specific content here -->
  </div>
</template>

<script>
export default {
  name: 'ManagerDashboard',
  mounted() {
    if (!this.$store.getters.isManager) {
      this.$router.push({ name: 'home' });
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
