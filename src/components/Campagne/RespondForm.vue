<template>
  <div class="form-container">
    <h2>Répondez au formulaire</h2>

    <!-- Sélection d'employé -->
    <div class="select-container">
      <label for="employee">Sélectionnez un employé :</label>
      <el-select id="employee" v-model="selectedEmployee" placeholder="Sélectionner un employé">
        <el-option v-for="employee in employees" :key="employee.id" :label="employee.fullName" :value="employee.id" />
      </el-select>
      <p v-if="employees.length === 0" class="no-employees">Aucun employé trouvé</p>
      <p v-else class="employee-count">Nombre d'employés trouvés : {{ employees.length }}</p>
    </div>

    <el-form :model="formResponses" class="response-form">
      <el-form-item v-for="(question, index) in questions" :key="index" :label="question.label">
        <el-input v-model="formResponses[question.id]" placeholder="Réponse" />
      </el-form-item>
    </el-form>

    <div class="button-group">
      <el-button @click="submitResponses" type="primary">Soumettre</el-button>
      <el-button @click="showPreview" type="default">Prévisualiser</el-button>
    </div>

    <el-dialog :visible.sync="isPreviewVisible" title="Prévisualisation des réponses">
      <Preview :responses="previewResponses"/>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import Preview from "@/views/Preview.vue";

export default {
  components: { Preview },
  props: ['campaignId', 'formId'],
  data() {
    return {
      employees: [],
      selectedEmployee: null,
      questions: [],
      formResponses: {},
      isPreviewVisible: false,
      previewResponses: [],
      internalFormId: this.formId // Utilisation d'une valeur interne basée sur la prop
    };
  },
  computed: {
    currentFormId() {
      return this.internalFormId || this.$route.params.formId;
    }
  },
  methods: {
    async submitResponses() {
      try {
        if (!this.selectedEmployee) {
          console.error('Aucun employé sélectionné');
          return;
        }

        const responsePayload = this.questions.map(question => ({
          fieldId: question.id,
          response: this.formResponses[question.id],
        }));

        const payload = {
          employeeId: this.selectedEmployee,
          fieldResponses: responsePayload,
        };

        console.log('Payload envoyé:', JSON.stringify(payload, null, 2));

        await axios.post(`https://localhost:7186/api/FieldResponse`, payload);

        // Supprimez ou corrigez cette ligne si la route "CampaignList" n'existe pas
        this.$router.push({ name: 'CampaignList' });
      } catch (error) {
        console.error('Erreur lors de la soumission des réponses:', error);
      }
    }
,
    async showPreview() {
      try {
        if (!this.selectedEmployee) {
          console.error('Aucun employé sélectionné pour la prévisualisation');
          return;
        }

        const url = `https://localhost:7186/api/FieldResponse/form/${this.currentFormId}/employee/${this.selectedEmployee}`;
        console.log('Preview URL:', url);

        const previewResponse = await axios.get(url);
        this.previewResponses = previewResponse.data;
        this.isPreviewVisible = true; // Affiche le dialogue de prévisualisation
      } catch (error) {
        console.error('Erreur lors de la récupération des réponses pour prévisualisation:', error);
      }
    }
    ,
    async fetchEmployees() {
      try {
        const response = await axios.get('https://localhost:7186/api/employe/getall');
        console.log('Employees received:', response.data);

        if (Array.isArray(response.data)) {
          this.employees = response.data.map(employee => ({
            ...employee,
            id: employee.Id ? employee.Id.toString() : '',
            fullName: `${employee.Nom} ${employee.Prenom}`,
          }));

          if (this.employees.length > 0 && !this.selectedEmployee) {
            this.selectedEmployee = this.employees[0].id;
          }
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    }
  },

  async created() {
    try {
      if (!this.currentFormId) {
        console.error('formId est indéfini');
        return;
      }

      const formResponse = await axios.get(`https://localhost:7186/api/formulaire/${this.currentFormId}`);
      this.questions = formResponse.data.Sections.flatMap(section => section.Fields.map(field => ({ label: field.Label, id: field.Id })));

      await this.fetchEmployees();  // Fetch employees after loading form questions
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  }
};
</script>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

h2 {
  margin-bottom: 20px;
  color: #007acc;
  font-size: 24px;
}

.select-container, .response-form {
  margin-bottom: 20px;
}

.select-container label {
  font-weight: bold;
}

.el-select, .el-form {
  width: 100%;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-input {
  width: 100%;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.no-employees, .employee-count {
  color: #999;
  font-size: 14px;
}
</style>
