<template>
  <div class="container">
    <h2>Confirm Your Details</h2>
    <div class="form-summary">
      <h3>Step 1 Details</h3>
      <p><strong>Title:</strong> {{ formData.titre }}</p>
      <p><strong>Description:</strong> {{ formData.description }}</p>
      <p><strong>Campaign Type:</strong> {{ formData.campaignType }}</p>
      <p><strong>Start Date:</strong> {{ formData.startDate }}</p>

      <h3>Form Created in Step 2</h3>
      <Preview :form-data="formData.form" />
    </div>

    <div class="buttons">
      <button @click="prevStep" class="nav-button">Back</button>
      <button @click="confirmDetails" class="action-button">Confirm</button>
      <button @click="submitForm" class="submit-button">Submit</button>
    </div>
  </div>
</template>

<script>
import Preview from "@/views/Preview.vue";

export default {
  props: ['formData'],
  components: {
    Preview,
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
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 700px;
  margin: 0 auto;
}

h2 {
  color: #007bff;
  margin-bottom: 20px;
}

.form-summary {
  margin-bottom: 30px;
  text-align: left;
}

.form-summary h3 {
  margin-top: 0;
  color: #0056b3;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.nav-button {
  background-color: #6c757d;
  color: white;
}

.nav-button:hover {
  background-color: #5a6268;
}

.action-button {
  background-color: #007bff;
  color: white;
}

.action-button:hover {
  background-color: #0056b3;
}

.submit-button {
  background-color: #28a745;
  color: white;
}

.submit-button:hover {
  background-color: #218838;
}
</style>
