<template>
  <div class="objectives-page">
    <!-- Vue d'ensemble -->
    <div class="objective-overview">
      <div class="overview-header">
        <h2>Objectifs de {{ employeeName }}</h2>
        <div class="year-selection">
          <button v-for="year in years" :key="year" @click="selectYear(year)" :class="{ active: year === selectedYear }">
            {{ year }}
          </button>
        </div>
      </div>
      <div class="overview-content">
        <div class="year-summary" v-for="year in years" :key="year">
          <p>{{ year }}</p>
          <p>{{ getPercentage(year) }}%</p>
          <p>{{ getObjectivesCount(year) }} objectifs</p>
        </div>
      </div>
    </div>

    <!-- Objectifs d'équipe -->
    <div class="objective-section">
      <h3>Objectifs d'équipe</h3>
      <div class="objective-item" v-for="objective in teamObjectives" :key="objective.id">
        <div class="objective-header">
          <p>{{ objective.title }}</p>
          <div class="objective-actions">
            <select v-model="objective.status" class="status-select" @change="updateObjectiveStatus(objective.id, objective.status)">
              <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
            </select>
            <button class="update-button" @click="markAsUpdated(objective.id)">Déclarer comme à jour</button>
          </div>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-inner" :style="{ width: objective.progress + '%' }"></div>
          <span class="progress-text">{{ objective.progress }}%</span>
        </div>
        <div class="sub-objectives" v-if="objective.subObjectives && objective.subObjectives.length">
          <div v-for="sub in objective.subObjectives" :key="sub.id" class="sub-objective">
            <div class="sub-objective-header">
              <img :src="sub.icon" alt="Sub-objective icon" class="sub-objective-icon">
              <p>{{ sub.title }}</p>
            </div>
            <div class="progress-bar">
              <div class="progress-bar-inner" :style="{ width: sub.progress + '%' }"></div>
              <span>{{ sub.progress }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Objectifs personnels -->
    <div class="objective-section">
      <h3>Objectifs personnels</h3>
      <div class="objective-item" v-for="objective in personalObjectives" :key="objective.id">
        <div class="objective-header">
          <p>{{ objective.title }}</p>
          <div class="objective-actions">
            <select v-model="objective.status" class="status-select" @change="updateObjectiveStatus(objective.id, objective.status)">
              <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
            </select>
            <button class="update-button" @click="markAsUpdated(objective.id)">Déclarer comme à jour</button>
          </div>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-inner" :style="{ width: objective.progress + '%' }"></div>
          <span class="progress-text">{{ objective.progress }}%</span>
        </div>
        <div class="sub-objectives" v-if="objective.subObjectives && objective.subObjectives.length">
          <div v-for="sub in objective.subObjectives" :key="sub.id" class="sub-objective">
            <div class="sub-objective-header">
              <input type="checkbox" :checked="sub.completed" @change="toggleSubObjective(sub.id)">
              <p>{{ sub.title }}</p>
            </div>
            <div class="progress-bar">
              <div class="progress-bar-inner" :style="{ width: sub.progress + '%' }"></div>
              <span>{{ sub.progress }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bouton pour ajouter un objectif -->
    <button @click="openModal" class="add-objective-button">Ajouter un objectif</button>

    <!-- Modal pour ajouter un objectif -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <h2>Ajouter un nouvel objectif</h2>
        <form @submit.prevent="submitObjective">
          <div class="form-group">
            <label for="title">Titre de l'objectif</label>
            <input type="text" id="title" v-model="newObjective.title" required />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" v-model="newObjective.description" required></textarea>
          </div>
          <div class="form-group">
            <label for="progress">Progression initiale (%)</label>
            <input type="number" id="progress" v-model="newObjective.progress" min="0" max="100" required />
          </div>
          <div class="form-group">
            <label for="status">Statut</label>
            <select id="status" v-model="newObjective.status" required>
              <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="subObjectives">Sous-objectifs (optionnel)</label>
            <input
              v-for="(sub, index) in newObjective.subObjectives"
              :key="index"
              type="text"
              v-model="sub.title"
              placeholder="Sous-objectif"
            />
            <button @click.prevent="addSubObjective">Ajouter un sous-objectif</button>
          </div>
          <div class="modal-actions">
            <button type="submit" class="submit-button">Enregistrer</button>
            <button type="button" @click="closeModal" class="cancel-button">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isModalOpen: false,
      selectedYear: null,
      newObjective: {
        title: '',
        description: '',
        progress: 0,
        status: 'Réalisable',
        subObjectives: []
      },
      employeeName: 'Feryel Benhassen',
      currentYear: new Date().getFullYear(),
      years: [],
      statusOptions: ['Réalisable', 'En cours', 'Complété'],
      teamObjectives: [],
      personalObjectives: []
    };
  },
  created() {
    this.initializeYears();
    this.selectedYear = this.currentYear;
    this.loadObjectivesForUser();
  },
  methods: {
    initializeYears() {
      const startYear = this.currentYear - 3;
      const endYear = this.currentYear + 1;
      for (let year = startYear; year <= endYear; year++) {
        this.years.push(year);
      }
    },
    async loadObjectivesForUser() {
      try {
        const response = await axios.get(`/api/objectives/${this.employeeId}/${this.selectedYear}`);
        this.teamObjectives = response.data.filter(obj => obj.isTeamObjective);
        this.personalObjectives = response.data.filter(obj => !obj.isTeamObjective);
      } catch (error) {
        console.error("Error loading objectives:", error);
      }
    },
    async updateObjectiveStatus(objectiveId, status) {
      try {
        await axios.put(`/api/objectives/${objectiveId}`, `"${status}"`);
        alert(`Objectif mis à jour avec succès!`);
      } catch (error) {
        console.error("Error updating objective status:", error);
      }
    },
    async submitObjective() {
      try {
        const response = await axios.post(`/api/objectives`, this.newObjective);
        if (this.isTeamObjective) {
          this.teamObjectives.push(response.data);
        } else {
          this.personalObjectives.push(response.data);
        }
        this.closeModal();
      } catch (error) {
        console.error("Error creating objective:", error);
      }
    },
    markAsUpdated(objectiveId) {
      this.updateObjectiveStatus(objectiveId, 'Complété');
    },
    toggleSubObjective(subId) {
      const sub = this.findSubObjective(subId);
      if (sub) {
        sub.completed = !sub.completed;
        sub.progress = sub.completed ? 100 : 0;
        this.updateSubObjective(subId, sub.completed);
      }
    },
    async updateSubObjective(subId, completed) {
      try {
        await axios.put(`/api/subobjectives/${subId}`, { completed });
        alert(`Sous-objectif mis à jour avec succès!`);
      } catch (error) {
        console.error("Error updating sub-objective:", error);
      }
    },
    findSubObjective(subId) {
      for (const obj of this.teamObjectives.concat(this.personalObjectives)) {
        const sub = obj.subObjectives.find(s => s.id === subId);
        if (sub) return sub;
      }
      return null;
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    addSubObjective() {
      this.newObjective.subObjectives.push({ title: '', progress: 0, completed: false });
    },
    selectYear(year) {
      this.selectedYear = year;
      this.loadObjectivesForUser();
    },
    getPercentage(year) {
      // Dummy data, replace with actual calculation
      return 50;
    },
    getObjectivesCount(year) {
      // Dummy data, replace with actual count
      return 5;
    }
  }
}
</script>

<style scoped>
.objectives-page {
  padding: 30px;
  font-family: 'Roboto', sans-serif;
  background-color: #f4f6f9;
}

.objective-overview {
  background-color: #17a2b8;
  padding: 20px;
  border-radius: 10px;
  color: white;
  margin-bottom: 40px;
}

.overview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.year-selection button {
  background-color: #ffffff22;
  border: none;
  color: white;
  font-size: 18px;
  margin: 0 10px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.year-selection button.active {
  font-weight: bold;
  background-color: white;
  color: #17a2b8;
}

.overview-content {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.year-summary {
  text-align: center;
}

.objective-section {
  margin-bottom: 40px;
}

.objective-item {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.objective-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.objective-actions {
  display: flex;
  align-items: center;
}

.status-select {
  margin-right: 15px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ced4da;
  background-color: #f8f9fa;
}

.update-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.update-button:hover {
  background-color: #218838;
}

.progress-bar {
  position: relative;
  height: 15px;
  background-color: #e9ecef;
  border-radius: 7px;
  margin-bottom: 10px;
}

.progress-bar-inner {
  height: 100%;
  background-color: #28a745;
  border-radius: 7px;
}

.progress-text {
  margin-top: -5px;
  font-size: 14px;
  color: #6c757d;
}

.sub-objectives {
  padding-left: 20px;
}

.sub-objective {
  margin-bottom: 15px;
}

.sub-objective-header {
  display: flex;
  align-items: center;
}

.sub-objective-header p {
  margin-left: 10px;
  font-size: 16px;
}

.sub-objective-icon {
  width: 24px;
  height: 24px;
}

.add-objective-button {
  display: block;
  margin: 20px auto 0;
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.add-objective-button:hover {
  background-color: #0056b3;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 25px;
  border-radius: 10px;
  width: 500px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.modal-content h2 {
  margin-top: 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
}

.submit-button {
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}

.cancel-button {
  padding: 12px 24px;
  background-color: #6c757d;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.cancel-button:hover {
  background-color: #5a6268;
}

.add-sub-objective {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.add-sub-objective:hover {
  background-color: #0056b3;
}
</style>
