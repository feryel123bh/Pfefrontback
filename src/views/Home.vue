<template>
  <div>
    <el-container>
      <el-main class="el-main-left">
        <div class="wrapper--forms">
          <el-form>
            <el-row>
              <el-button style="margin-bottom: 10px;" type="primary" @click="addSection">Add Section</el-button>
            </el-row>

            <!-- Check if forms exist -->
            <el-row v-if="forms && forms.length > 0">
              <div v-for="(eachFormObj, eachFormIndex) in forms" :key="eachFormIndex" class="section-block">
                <div class="source">
                  <el-row>
                    <el-col :span="18">
                      <el-input placeholder="Please input section title" v-model="eachFormObj.title" style="width: 100%;"></el-input>
                    </el-col>
                    <el-col :span="6">
                      <el-button type="danger" round style="float: right" @click="deleteSection(eachFormIndex, eachFormObj.title)">Delete Section</el-button>
                    </el-col>
                  </el-row>
                </div>
                <div class="meta">
                  <el-row>
                    <draggable :list="eachFormObj.fields" class="dragArea" :group="{ name: 'formbuilder', pull: false, put: true }" :sort="true" ghost-class="sortable__ghost">
                      <el-col v-for="(field, index) in eachFormObj.fields" :key="index" v-bind="field" :span="field.span" class="form__group" :class="{ 'is--active': field === activeField }">
                        <span class="form__selectedlabel">{{ field.fieldType }}</span>
                        <div @click="editElementProperties(field)">
                          <component :is="field.fieldType" :currentField="field" class="form__field"></component>
                        </div>
                        <div class="form__actiongroup">
                          <el-button circle size="mini" icon="el-icon-rank" class="form__actionitem--move"></el-button>
                          <el-button-group class="form__actionlist">
                            <el-button size="mini" icon="el-icon-plus" @click="cloneElement(index, field, eachFormObj.fields)" v-show="!field.isUnique"></el-button>
                            <el-button size="mini" icon="el-icon-delete" @click="deleteElement(index, eachFormObj.fields)"></el-button>
                          </el-button-group>
                        </div>
                      </el-col>
                    </draggable>
                  </el-row>
                </div>
              </div>
            </el-row>

            <!-- Message if forms are empty -->
            <el-row v-else>
              <div><h3><div style="text-align: center;"><b>Please add Sections</b></div></h3></div>
            </el-row>

          </el-form>
        </div>
      </el-main>

      <el-aside class="wrapper--sidebar" width="30%">
        <el-tabs type="border-card" v-model="activeTabForFieldsProxy">
          <el-tab-pane name="elements" label="Elements">
            <elements />
          </el-tab-pane>
          <el-tab-pane name="properties" label="Properties">
            <properties v-show="Object.keys(activeField).length > 0"></properties>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
// Import the necessary components
import draggable from 'vuedraggable';
import { mapState } from 'vuex';
import { FormBuilder } from '@/components/form_elements/formbuilder';
import axios from 'axios';

export default {
  name: 'Home',

  computed: {
    ...mapState({
      forms: state => state.forms || [], // Ensure forms is an array
      activeField: state => state.activeField || {},
      activeTabForFields: state => state.activeTabForFields || 'elements',
    }),
    activeTabForFieldsProxy: {
      get() {
        return this.activeTabForFields;
      },
      set(value) {
        this.$store.commit('setActiveTabForFields', value);
      }
    }
  },
  data() {
    return {
      sortElementOptions: FormBuilder.$data.sortElementOptions,
    };
  },
  components: FormBuilder.$options.components,
  methods: {
    async fetchForms() {
      try {
        const response = await axios.get('https://localhost:7186/api/formulaire');
        if (response.data) {
          this.$store.commit('setActiveForm', response.data);
        } else {
          console.error('API did not return any data');
        }
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    },
    deleteElement(index, form) {
      FormBuilder.deleteElement(index, form);
    },
    cloneElement(index, field, form) {
      FormBuilder.cloneElement(index, field, form);
    },
    editElementProperties(field) {
      FormBuilder.editElementProperties(field);
      this.$store.commit('setActiveField', field);
    },
    addSection() {
      const formObj = {
        title: "",
        fields: []
      };
      this.forms.push(formObj);
    },
    deleteSection(formIndex, formTitle) {
      this.$confirm(`Are you sure to delete the section ${formTitle}?`, 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$delete(this.forms, formIndex);
      });
    }
  },
  mounted() {
    this.fetchForms(); // Fetch forms from backend when component is mounted
  }
}
</script>

<style lang="scss" scoped>
.empty-section {
  text-align: center;
  font-size: 40px;
  background: linear-gradient(to bottom, #FFFFFF, #A7C7E7);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}

.dragArea {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  min-height: 10px;
  height: calc(30vh);
  z-index: 2;
}

.el-main-left {
  height: calc(90vh);
  max-width: 1200px;
  margin: 0 auto;
}

.form__selectedlabel {
  display: none;
  background: #E3F2FD;
  padding: 3px 5px;
  color: #333333;
  font-size: 12px;
  position: absolute;
  top: -17px;
  right: 15px;
}

.form__actionitem--move {
  position: absolute;
  right: -14px;
  top: 50%;
  transform: translateY(-50%);
  visibility: hidden;

  &:active,
  &:focus,
  &:hover {
    border-color: #64B5F6;
    background: #E3F2FD;
  }
}

.form__actionlist {
  position: absolute;
  margin-top: 10px;
  visibility: hidden;
  z-index: 3;
  right: 0;
  border-radius: 2px;
}

.form__group {
  margin-bottom: 25px;
  border: 1px solid transparent;
  position: relative;
  padding: 15px;
  border-radius: 5px;
  background-color: #F5F5F5;

  &:hover {
    border-color: #64B5F6;

    .form__actionitem--move {
      visibility: visible;
    }
  }

  &.is--active {
    border-color: #64B5F6;
    background: #E3F2FD;

    .form__actionlist {
      visibility: visible;
    }

    .form__selectedlabel {
      display: inline-block;
    }
  }
}

.section-block {
  border: 1px solid #E0E0E0;
  border-radius: 5px;
  margin-bottom: 20px;
  background-color: #FFFFFF;
}

.section-block .source {
  padding: 15px;
  background-color: #E3F2FD;
  border-bottom: 1px solid #B3E5FC;
}

.section-block .meta {
  background-color: #F5F5F5;
  border-top: 1px solid #E0E0E0;
  padding: 15px;
}
</style>
