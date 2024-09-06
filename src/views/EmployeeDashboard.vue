<template>
  <div class="employee-dashboard">
    <h1>Employee Dashboard</h1>
    <!-- Employee-specific content here -->
  </div>
</template>

<script>
export default {
  name: 'EmployeeDashboard',
  mounted() {
    if (!this.$store.getters.isEmployee) {
      this.$router.push({ name: 'home' });
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
