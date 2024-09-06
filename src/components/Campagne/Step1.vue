<template>
  <div class="form-container">
    <h2>Enter Campaign Details</h2>

    <div class="form-group">
      <label for="titre">Title:</label>
      <input type="text" id="titre" v-model="formData.titre" />
    </div>

    <div class="form-group">
      <label for="description">Description:</label>
      <textarea id="description" v-model="formData.description" rows="4"></textarea>
    </div>

    <div class="form-group">
      <label for="campaignType">Campaign Type:</label>
      <select id="campaignType" v-model="formData.campaignType">
        <option value="Annuelle">Annual</option>
        <option value="Semestrielle">Semi-annual</option>
        <option value="Trimestrielle">Quarterly</option>
      </select>
    </div>

    <div class="form-group">
      <label for="startDate">Start Date:</label>
      <input type="date" id="startDate" v-model="formData.startDate" />
    </div>

    <div class="form-group">
      <label for="manager">Select Manager (Collaborator):</label>
      <select id="manager" v-model="formData.managerId">
        <option value="" disabled>Select a Manager</option>
        <option v-for="m in managers" :key="m.id" :value="m.id">
          {{ m.fullName }} (ID: {{ m.id }})
        </option>
      </select>
      <p v-if="managers.length === 0" class="no-managers">Aucun manager trouvé</p>
      <p v-else class="managers-count">Nombre de managers trouvés : {{ managers.length }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['formData'],
  data() {
    return {
      managers: [],
    };
  },
  methods: {
    async fetchManagers() {
      try {
        const response = await axios.get('https://localhost:7186/api/employe/getmanager');
        console.log('Managers received:', response.data);

        if (Array.isArray(response.data)) {
          this.managers = response.data.map(manager => ({
            ...manager,
            id: manager.Id ? manager.Id.toString() : '',
            fullName: `${manager.Nom} ${manager.Prenom}`,
          }));

          if (this.managers.length > 0) {
            this.formData.managerId = this.managers[0].id;
          }
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching managers:', error);
      }
    },
  },
  mounted() {
    this.fetchManagers();
  },
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-group label {
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}

.form-group textarea {
  resize: vertical;
}

.no-managers,
.managers-count {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}
</style>
