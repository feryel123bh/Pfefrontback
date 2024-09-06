<template>
  <div class="main__wrapper">
    <el-container>
      <el-main :style="cssProps">
        <el-form>
          <div v-for="(eachFormObj, eachFormIndex) in forms" :key="`form-${eachFormIndex}`">
            <el-divider :key="`divider-${eachFormIndex}`">{{ eachFormObj.title }}</el-divider>
            <el-row :key="`row-${eachFormIndex}`">
              <div class="wrapper--forms">
                <el-col v-for="(field, index) in eachFormObj.fields" :key="index" :span="field.span" v-bind="field" class="form__group">
                  <component :is="field.fieldType" :currentField="field" class="form__field"></component>
                </el-col>
              </div>
            </el-row>
          </div>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { FormBuilder } from '@/components/form_elements/formbuilder';

export default {
  name: 'Preview',
  components: FormBuilder.$options.components,
  computed: {
    ...mapState({
      forms: state => state.forms,
      themingVars: state => state.themingVars
    }),
    cssProps() {
      const result = {};
      const themingVars = this.themingVars;

      for (const v in themingVars) {
        if (themingVars.hasOwnProperty(v)) {
          const newV = `--theme-${_.kebabCase(v)}`;
          let suffix = "";

          if (_.includes(newV, 'size')) suffix = "px";
          else if (_.includes(newV, 'margin')) suffix = "px";
          else if (_.includes(newV, 'radius')) suffix = "px";

          result[newV] = themingVars[v] + suffix;
        }
      }

      return result;
    }
  }
}
</script>

<style scoped>
.main__wrapper {
  padding: 20px;
}

.wrapper--forms {
  margin-bottom: 20px;
}

.form__group {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form__field {
  width: 100%;
}

.el-divider {
  font-size: 18px;
  color: #007acc;
}
</style>
