<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-form-item label="Disabled">
          <el-switch v-model="activeField.disabled"></el-switch>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="Step">
          <el-input-number v-model="activeField.step" controls-position="right"></el-input-number>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="Step Strictly">
          <el-switch v-model="activeField.stepStrictly"></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Min Value">
          <el-row>
            <el-col :span="6">
              <el-switch v-model="activeField.hasMinValue"></el-switch>
            </el-col>
            <el-col :span="18">
              <el-input-number v-show="activeField.hasMinValue" v-model="activeField.min" controls-position="right"></el-input-number>
            </el-col>
          </el-row>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Max Value">
          <el-row>
            <el-col :span="6">
              <el-switch v-model="activeField.hasMaxValue"></el-switch>
            </el-col>
            <el-col :span="18">
              <el-input-number v-show="activeField.hasMaxValue" v-model="activeField.max" controls-position="right"></el-input-number>
            </el-col>
          </el-row>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'RatingAdvancedProp',
  computed: {
    ...mapState({
      activeField: state => state.activeField,
    }),
  },
};
</script>

<style scoped>
/* Add your styles here if necessary */
</style>
