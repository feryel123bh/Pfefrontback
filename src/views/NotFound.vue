<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <router-link to="/path">
      <li>
        <a>Link</a>
      </li>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
};
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px;
}

.not-found h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.not-found a {
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
}

.not-found a:hover {
  text-decoration: underline;
}
</style>
