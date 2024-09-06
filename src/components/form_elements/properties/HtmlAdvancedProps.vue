<template>
  <el-form-item label="Html Content" v-show="activeField.hasOwnProperty('htmlContent')">
    <el-input :rows="16" type="textarea" v-model="activeField.htmlContent"></el-input>
  </el-form-item>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HtmlAdvancedProp',
  computed: {
    ...mapState({
      activeField: state => state.activeField,
    }),
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
