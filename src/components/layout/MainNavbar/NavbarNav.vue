<template>
  <d-navbar-nav class="border-left flex-row">
    <li class="nav-item border-right dropdown notifications">
      <a class="nav-link nav-link-icon text-center" v-d-toggle.notifications>
        <div class="nav-link-icon__wrapper">
          <i class="material-icons">&#xE7F4;</i>
          <d-badge pill theme="danger">{{ notificationCount }}</d-badge>
        </div>
      </a>
      <d-collapse id="notifications" class="dropdown-menu dropdown-menu-small">
        <d-dropdown-item v-for="(notification, index) in notifications" :key="notification.id || index">
          <div class="notification__icon-wrapper">
            <div class="notification__icon">
              <i class="material-icons">&#xE6E1;</i>
            </div>
          </div>
          <div class="notification__content">
            <span class="notification__category">Campaign</span>
            <p>{{ notification.message }}</p>
          </div>
        </d-dropdown-item>
        <d-dropdown-item class="notification__all text-center">View all Notifications</d-dropdown-item>
      </d-collapse>
    </li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle text-nowrap px-3" v-d-toggle.user-actions>
        <img class="user-avatar rounded-circle mr-2" src="@/assets/images/avatars/0.jpg" alt="User Avatar">
        <span class="d-none d-md-inline-block">{{ userName }}</span>
      </a>
      <d-collapse id="user-actions" class="dropdown-menu dropdown-menu-small">
        <d-dropdown-item><i class="material-icons">&#xE7FD;</i> Profile</d-dropdown-item>
        <d-dropdown-item><i class="material-icons">&#xE8B8;</i> Edit Profile</d-dropdown-item>
        <d-dropdown-item><i class="material-icons">&#xE2C7;</i> Files</d-dropdown-item>
        <d-dropdown-item><i class="material-icons">&#xE896;</i> Transactions</d-dropdown-item>
        <d-dropdown-divider />
        <d-dropdown-item @click="logout" class="text-danger">
          <i class="material-icons text-danger">&#xE879;</i> Logout
        </d-dropdown-item>
      </d-collapse>
    </li>
  </d-navbar-nav>
</template>

<script>
export default {
  data() {
    return {
      userName: 'Loading...',
      notificationCount: 0
    };
  },
  computed: {
    notifications() {
      return this.$store.state.notifications || [];
    }
  },
  watch: {
    notifications(newNotifications) {
      this.notificationCount = newNotifications.length;
    }
  },
  methods: {
    async fetchUserDetails() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://localhost:7186/api/Auth/details', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const data = await response.json();
        this.userName = data.name || 'User';
      } catch (err) {
        console.error('Error fetching user details:', err);
        this.userName = 'Error loading name';
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'login' });
    }
  },
  mounted() {
    this.fetchUserDetails();
  }
};
</script>

<style scoped>
.nav-link:hover {
  cursor: pointer;
}

.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.d-badge {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
