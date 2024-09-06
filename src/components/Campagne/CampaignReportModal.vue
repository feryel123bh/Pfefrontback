<template>
  <div v-if="visible && campaignId" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-header">
        <h3>Create Campaign Report</h3>
        <button class="close-button" @click="close">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="reportTitle">Report Title:</label>
          <input type="text" id="reportTitle" v-model="reportTitle" placeholder="Enter report title" />
        </div>
      </div>
      <div class="modal-footer">
        <button @click="submitReport" class="submit-button">Create Report</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    campaignId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      reportTitle: '',
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async submitReport() {
      if (!this.campaignId) {
        console.error('Campaign ID is missing');
        return;
      }

      try {
        const reportData = {
          titre: this.reportTitle,
        };

        const response = await axios.post(`https://localhost:7186/api/campagne/${this.campaignId}/report`, reportData);
        this.$emit('report-created', response.data);
      } catch (error) {
        console.error('Error creating report:', error);
      }
    }
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.modal-body .form-group {
  margin-bottom: 20px;
}

.submit-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
