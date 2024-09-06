<template>
  <div class="register-container">
    <div class="register-content">
      <h2>Create an Account</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="registerRequest.username" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="registerRequest.password" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="registerRequest.email" required />
        </div>
        <div class="form-group">
          <label for="nom">Full Name</label>
          <input type="text" id="nom" v-model="registerRequest.nom" required />
        </div>
        <div class="form-group">
          <label for="adresse">Address</label>
          <input type="text" id="adresse" v-model="registerRequest.adresse" required />
        </div>
        <div class="form-group">
          <label for="poste">Job Position</label>
          <input type="text" id="poste" v-model="registerRequest.poste" required />
        </div>
        <div class="form-group">
          <label for="role">Role</label>
          <select id="role" v-model="registerRequest.role" required>
            <option value="EmployeSimple">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Rh">HR</option>
          </select>
        </div>
        <button type="submit">Register</button>
        <div v-if="error" class="error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerRequest: {
        username: '',
        password: '',
        email: '',
        nom: '',
        adresse: '',
        poste: '',
        role: 'EmployeSimple', // Default role
      },
      error: ''
    };
  },
  methods: {
    async handleRegister() {
      try {
        const response = await fetch('https://localhost:7186/api/Auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.registerRequest)
        });

        if (!response.ok) {
          throw new Error('Registration failed');
        }

        const data = await response.json();
        alert('Registration successful!');
        this.$router.push({ name: 'login' });
      } catch (err) {
        console.error('Registration error:', err);
        this.error = 'Registration failed. Please try again.';
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.register-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error {
  margin-top: 10px;
  color: red;
}
</style>
