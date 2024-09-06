<template>
  <div>
    <h2>Select or Create Form</h2>
    <button @click="openModal">Select or Create Form</button>

    <Modal :visible="isModalVisible" @close="closeModal">
      <template v-slot:header>
        <h3>Select or Create a Form</h3>
      </template>
      <template v-slot:body>
        <div>
          <button @click="chooseCreateForm">Create a New Form</button>
          <button @click="selectExistingForm">Select an Existing Form</button>
        </div>
      </template>
      <template v-slot:footer>
        <button @click="closeModal">Close</button>
      </template>
    </Modal>

    <div v-if="creatingForm">
      <HomePrev />
    </div>
  </div>
</template>

<script>
import Modal from './Modal.vue';
import HomePrev from "@/components/Campagne/HomePrev.vue";
import axios from 'axios';

export default {
  components: {
    Modal,
    HomePrev,
  },
  data() {
    return {
      isModalVisible: false,
      creatingForm: false,
      existingForms: [],
      selectedFormId: null,
    };
  },
  async created() {
    try {
      const response = await axios.get('https://localhost:7186/api/formulaire');
      this.existingForms = response.data;
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    chooseCreateForm() {
      this.creatingForm = true;
      this.closeModal();
    },
    selectExistingForm(formId) {
      this.selectedFormId = formId;
      this.creatingForm = false;
      this.closeModal();
      this.$emit('next-step', {formId: this.selectedFormId});
    },
  },
};
</script>

<style scoped>
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
