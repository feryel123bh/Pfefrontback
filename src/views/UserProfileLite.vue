<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">User Profile</h3>
      </d-col>
    </d-row>

    <!-- Content -->
    <d-row>
      <d-col lg="4">
        <upl-user-details :userDetails="userDetails" />
      </d-col>
      <d-col lg="8">
        <upl-user-account-details :title="'Update Your Details'" :userDetails="userDetails" />
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import UserDetails from '@/components/user-profile-lite/UserDetails.vue';
import UserAccountDetails from '@/components/user-profile-lite/UserAccountDetails.vue';

export default {
  name: 'UserProfileLite',
  components: {
    uplUserDetails: UserDetails,
    uplUserAccountDetails: UserAccountDetails,
  },
  data() {
    return {
      userDetails: {
        name: 'Jane Doe',
        avatar: require('@/assets/images/avatars/0.jpg'),
        jobTitle: 'Software Engineer',
        performanceReportTitle: 'Productivity',
        performanceReportValue: 80,
        metaTitle: 'About Me',
        metaValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
    };
  },
};
</script>
