<template>
  <div>
    <options-advanced-props/>
    <el-row>
      <el-col :span="8">
        <el-form-item label="Disabled">
          <el-switch v-model="activeField.disabled"></el-switch>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="Clearable">
          <el-switch v-model="activeField.clearable"></el-switch>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="Multiple">
          <el-switch v-model="activeField.multiple"></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="Filterable">
          <el-switch v-model="activeField.filterable"></el-switch>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="Remote Search">
          <el-switch @change="remoteChange" v-model="activeField.remote"></el-switch>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="Multiple">
          <el-switch v-model="activeField.multiple"></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import fetchData from '@/api/fetch-data';

export default {
  name: 'SelectListAdvancedProp',
  computed: {
    ...mapState({
      activeField: state => state.activeField,
    }),
  },
  methods: {
    fetchData() {
      const { dataUrl, valueField, labelField } = this.activeField;
      if (!dataUrl) {
        this.$message.error('Url cannot be empty');
        return;
      }
      if (!valueField) {
        this.$message.error('Value Field cannot be empty');
        return;
      }
      if (!labelField) {
        this.$message.error('Label Field cannot be empty');
        return;
      }

      const promise = fetchData.fetchOptionsData(dataUrl, labelField, valueField);
      promise.then((data) => {
        this.activeField.options = data;
      });
      this.$message({
        showClose: true,
        message: 'Success.',
        type: 'success',
        duration: 1000,
      });
    },
  },
};
</script>

<style scoped>
/* Your styles */
</style>
