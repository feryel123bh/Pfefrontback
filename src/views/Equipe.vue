<template>
  <div class="team-list-page">
    <h1>Équipes</h1>
    <button @click="openAddTeamModal" class="add-team-button">Ajouter une équipe</button>

    <table class="team-table" v-if="teams.length > 0">
      <thead>
      <tr>
        <th>ID</th>
        <th>Nom de l'équipe</th>
        <th>Status</th>
        <th>Manager de l'équipe</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="team in teams" :key="team.id">
        <td>{{ team.id }}</td>
        <td>{{ team.name || 'N/A' }}</td>
        <td>{{ team.Status || 'N/A' }}</td>
        <td>{{ team.manager || 'N/A' }}</td>
        <td>
          <button @click="editTeam(team)" v-if="!team.isEditing" class="action-button">✏️</button>
          <button @click="saveTeam(team)" v-if="team.isEditing" class="action-button">💾</button>
          <button @click="deleteTeam(team)" class="action-button">🗑️</button>
        </td>
      </tr>
      </tbody>
    </table>

    <div v-else>
      <p>Aucune équipe n'a été trouvée.</p>
    </div>

    <button @click="exportTeams" class="export-button">Exporter</button>

    <!-- Popup for Adding Team -->
    <div v-if="isAddTeamModalOpen" class="modal-overlay">
      <div class="modal-content">
        <h2>Ajouter une nouvelle équipe</h2>
        <form @submit.prevent="submitNewTeam">
          <div class="form-group">
            <label for="team-name">Nom de l'équipe</label>
            <input type="text" id="team-name" v-model="newTeam.name" required />
          </div>
          <div class="form-group">
            <label for="team-status">Status</label>
            <select id="team-status" v-model="newTeam.status" required>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div class="form-group">
            <label for="team-manager">Manager</label>
            <select id="team-manager" v-model="newTeam.managerId" required>
              <option value="" disabled>Sélectionner un Manager</option>
              <option v-for="m in managers" :key="m.id" :value="m.id">
                {{ m.fullName }} (ID: {{ m.id }})
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="team-employees">Employés</label>
            <multiselect
              id="team-employees"
              v-model="newTeam.employeeIds"
              :options="employees"
              :multiple="true"
              :searchable="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Sélectionner les employés"
              label="fullName"
              track-by="id"
              :preselect-first="true"
            ></multiselect>
          </div>

          <div class="modal-actions">
            <button type="submit" class="submit-button">Enregistrer</button>
            <button type="button" @click="closeAddTeamModal" class="cancel-button">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Multiselect from 'vue-multiselect';

export default {
  components: { Multiselect },
  data() {
    return {
      teams: [],
      isAddTeamModalOpen: false,
      newTeam: {
        Name: '',
        Status: 'Active',
        ManagerId: '',
        EmployeeIds: []
      },
      managers: [],
      employees: []
    };
  },
  created() {
    this.fetchTeams();
    this.fetchManagers();
    this.fetchEmployees();
  },
  methods: {
    async fetchTeams() {
      try {
        const response = await axios.get('https://localhost:7186/api/equipe');
        console.log('API Response:', response.data); // Log the API response to see the actual structure

        // Adjust the field names based on the actual API response
        this.teams = response.data.map(team => ({
          id: team.Id, // Assuming this field is correct based on your previous input
          name: team.Name || 'N/A', // Adjust 'EquipeName' based on the actual field name in your API
          status: team.status || 'N/A', // Adjust 'CurrentStatus' based on the actual field name in your API
          manager: team.ManagerId ? `${team.ManagerId.Nom} ${team.ManagerId.Prenom}` : 'N/A', // Adjust based on the actual structure of ManagerInfo
          isEditing: false
        }));

        console.log('Mapped Teams:', this.teams); // Log the mapped teams to verify
      } catch (error) {
        console.error("Erreur lors de la récupération des équipes :", error);
      }
    },
    async fetchManagers() {
      try {
        const response = await axios.get('https://localhost:7186/api/employe/getmanager');
        this.managers = response.data.map(manager => ({
          id: manager.Id ? manager.Id.toString() : '',
          fullName: `${manager.Nom} ${manager.Prenom}`,
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des managers :', error);
      }
    },
    async fetchEmployees() {
      try {
        const response = await axios.get('https://localhost:7186/api/employe/getallemployees');
        this.employees = response.data.map(employee => ({
          id: employee.Id ? employee.Id.toString() : '',
          fullName: `${employee.Nom} ${employee.Prenom}`,
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des employés :', error);
      }
    },
    openAddTeamModal() {
      this.isAddTeamModalOpen = true;
    },
    closeAddTeamModal() {
      this.isAddTeamModalOpen = false;
    },
    async submitNewTeam() {
      const payload = {
        name: this.newTeam.name,
        status: this.newTeam.status,
        managerId: this.newTeam.managerId,
        employeeIds: this.newTeam.employeeIds.map(employee => employee.id) // Ensure only IDs are sent
      };

      if (!payload.name || !payload.managerId || !payload.employeeIds.length) {
        console.error("Missing required fields");
        return;
      }

      try {
        console.log("Sending payload:", JSON.stringify(payload, null, 2));
        const response = await axios.post('http://localhost:7186/api/equipe', payload);
        this.teams.push({ ...response.data, isEditing: false });
        this.closeAddTeamModal();
        alert('Équipe créée avec succès!');
      } catch (error) {
        // Properly handle the error
        if (error.response) {
          console.error("Erreur lors de l'ajout de l'équipe :", error.response.data);
        } else if (error.request) {
          console.error("Aucune réponse reçue de l'API :", error.request);
        } else {
          console.error("Erreur lors de la création de l'équipe :", error.message);
        }
      }
    }

    ,
    editTeam(team) {
      team.isEditing = true;
    },
    async saveTeam(team) {
      try {
        await axios.put(`https://localhost:7186/api/equipe/${team.id}`, {
          id: team.id,
          name: team.name,
          status: team.status
        });
        team.isEditing = false;
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'équipe :", error);
      }
    },
    async deleteTeam(team) {
      if (confirm(`Êtes-vous sûr de vouloir supprimer l'équipe ${team.name} ?`)) {
        try {
          await axios.delete(`/api/equipe/${team.id}`);
          this.teams = this.teams.filter(t => t.id !== team.id);
        } catch (error) {
          console.error("Erreur lors de la suppression de l'équipe :", error);
        }
      }
    },
    async exportTeams() {
      try {
        const response = await axios.get('https://localhost:7186/api/equipe/export', { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Equipes.xlsx';
        link.click();
      } catch (error) {
        console.error("Erreur lors de l'exportation des équipes :", error);
      }
    }
  }
};
</script>

<style scoped>
.team-list-page {
  padding: 20px;
  font-family: 'Roboto', sans-serif;
}

h1, h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.team-table,
.employee-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.team-table th,
.team-table td,
.employee-table th,
.employee-table td {
  border: none;
  padding: 15px 20px;
  text-align: left;
}

.team-table th,
.employee-table th {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #333;
  font-size: 14px;
}

.team-table td,
.employee-table td {
  font-size: 14px;
  color: #495057;
}

.team-table tr {
  border-bottom: 1px solid #dee2e6;
  transition: background-color 0.2s ease-in-out;
}

.team-table tr:hover {
  background-color: #f1f3f5;
}

.export-button,
.add-team-button {
  padding: 12px 20px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.export-button:hover,
.add-team-button:hover {
  background-color: #5a6268;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 25px;
  border-radius: 10px;
  width: 400px;
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

.action-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
}
</style>
