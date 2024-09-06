<template>
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>
    <!-- Admin-specific content here -->
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  mounted() {
    if (!this.$store.getters.isAdmin) {
      this.$router.push({ name: 'home' });
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
