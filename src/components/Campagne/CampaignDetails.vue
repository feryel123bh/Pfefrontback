<template>
  <div>
    <h2>Confirm Your Details</h2>
    <div class="form-summary">
      <h3>Step 1 Details</h3>
      <p><strong>Title:</strong> {{ formData.titre }}</p>
      <p><strong>Description:</strong> {{ formData.description }}</p>
      <p><strong>Campaign Type:</strong> {{ formData.campaignType }}</p>
      <p><strong>Start Date:</strong> {{ formData.startDate }}</p>

      <h3>Form Selected in Step 2</h3>
      <Preview :form-data="formData.form" />
    </div>

    <div class="buttons">
      <button @click="prevStep">Back</button>
      <button @click="confirmDetails">Confirm</button>
      <button @click="submitForm">Submit</button>
    </div>
  </div>
</template>

<script>
import Preview from "@/views/Preview.vue";

export default {
  props: ['formData'],
  components: {
    Preview
  },
  methods: {
    prevStep() {
      this.$emit('prev-step');
    },
    confirmDetails() {
      this.$emit('confirm-details', this.formData);
    },
    submitForm() {
      this.$emit('submit', this.formData);
    }
  }
}
</script>

<style scoped>
.form-summary {
  margin-bottom: 20px;
}

.form-summary h3 {
  margin-top: 0;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
  margin: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>
