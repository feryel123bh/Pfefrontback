<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-form-item label="Remote Data Source">
          <el-switch v-model="activeField.isFromUrl">{{activeField.htmlContent}}</el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="18">
        <el-form-item label="Url" v-show="activeField.isFromUrl" prop="dataUrl">
          <el-input v-model="activeField.dataUrl"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row v-show="activeField.isFromUrl">
      <el-col :span="4">
        <el-form-item label="Fetch Data" v-show="activeField.labelField">
          <el-button type="success" plain @click="fetchData">Fetch Data</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="Label Field">
          <el-input v-model="activeField.labelField"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="Value Field">
          <el-input v-model="activeField.valueField"></el-input>
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
      const {dataUrl, valueField, labelField} = this.activeField;
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
/* Add your styles here if necessary */
</style>
