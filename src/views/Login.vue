<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-image">
        <img src="@/assets/mohsen.png" alt="Employee Evaluation" />
      </div>
      <div class="login-form">
        <h2>Welcome to EvalPro!</h2>
        <p>Please sign in to your account and start the adventure</p>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">Email</label>
            <input type="text" id="username" v-model="loginRequest.username" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="loginRequest.password" required />
          </div>
          <div class="form-options">
            <div class="remember-me">
              <input type="checkbox" id="remember-me" />
              <label for="remember-me">Remember Me</label>
            </div>
            <a href="#" class="forgot-password">Forgot Password?</a>
          </div>
          <button type="submit">Login</button>
          <div v-if="error" class="error">{{ error }}</div>
        </form>
        <div class="signup">
          <p>New on our platform? <a href="#">Create an account</a></p>
        </div>
        <div class="social-login">
          <p>or</p>
          <a href="#" class="social-icon facebook">Facebook</a>
          <a href="#" class="social-icon twitter">Twitter</a>
          <a href="#" class="social-icon google">Google</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginRequest: {
        username: '',
        password: ''
      },
      error: '',
      userName: '' // To store the fetched user name
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch('https://localhost:7186/api/Auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.loginRequest)
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();
        const token = data.token;
        // Store the JWT token in localStorage
        localStorage.setItem('token', token);
        console.log(token);
        // Fetch the user details using the token
        await this.fetchUserDetails();

        // Redirect to the home page or the appropriate dashboard
        this.$router.push({ name: 'home' });

      } catch (err) {
        console.error('Login error:', err);
        this.error = 'Login failed. Please check your credentials and try again.';
      }
    },

    async fetchUserDetails() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('https://localhost:7186/api/Auth/details', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const userData = await response.json();

        // Store the user details in the component's state or Vuex
        this.userName = userData.name;

      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    }

  }
};
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  max-width: 900px;
  width: 100%;
}

.login-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #007bff;
  padding: 20px;
}

.login-image img {
  max-width: 100%;
  border-radius: 8px;
}

.login-form {
  padding: 40px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-form h2 {
  color: #007bff;
  margin-bottom: 20px;
  text-align: center;
}

.login-form p {
  color: #666;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.remember-me {
  display: flex;
  align-items: center;
}

.form-options input[type="checkbox"] {
  margin-right: 5px;
}

.form-options .forgot-password {
  color: #007bff;
  text-decoration: none;
}

.form-options .forgot-password:hover {
  text-decoration: underline;
}

button {
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.error {
  margin-top: 10px;
  color: red;
  text-align: center;
}

.signup {
  margin-top: 20px;
  text-align: center;
}

.signup p {
  color: #666;
}

.signup a {
  color: #007bff;
  text-decoration: none;
}

.signup a:hover {
  text-decoration: underline;
}

.social-login {
  margin-top: 20px;
  text-align: center;
}

.social-login p {
  color: #666;
  margin-bottom: 10px;
}

.social-icon {
  margin: 0 10px;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s;
}

.facebook {
  background-color: #3b5998;
}

.twitter {
  background-color: #1da1f2;
}

.google {
  background-color: #db4437;
}

.facebook:hover {
  background-color: #2d4373;
}

.twitter:hover {
  background-color: #1a91da;
}

.google:hover {
  background-color: #c33d29;
}
</style>
