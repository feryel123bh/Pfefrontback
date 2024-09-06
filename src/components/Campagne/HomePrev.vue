<template>
  <div id="homeprev">
    <el-tabs v-model="activeName">
      <el-tab-pane label="Design" name="Design">
        <Home @form-updated="formUpdated"/>
      </el-tab-pane>
      <el-tab-pane label="Preview" name="Preview">
        <Preview :forms="forms"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Home from '@/views/Home';
import Preview from '@/views/Preview';
import axios from "axios";

export default {
  name: 'HomePrev',
  data() {
    return {
      activeName: "Design",
      forms: []
    }
  },
  components: {
    Home,
    Preview
  },
  methods: {
    async formUpdated(forms) {
      this.forms = forms;
      const dataToSend = { ...this.formData };

      delete dataToSend.id; // Ensure 'id' is not sent if not needed

      console.log('Sending data to create campaign:', JSON.stringify(dataToSend, null, 2));
      const response = await axios.post('https://localhost:7186/api/formulaire', dataToSend);
      this.$emit('form-updated', forms);
    }
  }
}
</script>
