<template>
  <d-card class="card-small mb-4 pt-3">
    <d-card-header class="border-bottom text-center">
      <div class="mb-3 mx-auto">
        <img class="rounded-circle" :src="userDetails.avatar" :alt="userDetails.name" width="110">
      </div>
      <h4 class="mb-0">{{ userDetails.name }}</h4>
      <span class="text-muted d-block mb-2">{{ userDetails.jobTitle }}</span>
      <d-button pill outline size="sm" class="mb-2">
        <i class="material-icons mr-1">person_add</i> Follow
      </d-button>
    </d-card-header>

    <d-list-group flush>
      <d-list-group-item class="px-4">
        <div class="progress-wrapper">
          <strong class="text-muted d-block mb-2">{{ userDetails.performanceReportTitle }}</strong>
          <d-progress class="progress-sm">
            <span class="progress-value">{{ userDetails.performanceReportValue }}%</span>
            <d-progress-bar :max="100" :value="userDetails.performanceReportValue" />
          </d-progress>
        </div>
      </d-list-group-item>

      <d-list-group-item>
        <strong class="text-muted d-block mb-2">{{ userDetails.metaTitle }}</strong>
        <span>{{ userDetails.metaValue }}</span>
      </d-list-group-item>
    </d-list-group>
  </d-card>
</template>

<script>
export default {
  name: 'UserDetails',
  props: {
    userDetails: {
      type: Object,
      required: true,
    },
  },
};
</script>
