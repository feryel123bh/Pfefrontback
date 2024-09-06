<template>
  <div>
    <h2>Réponses des employés pour la campagne : {{ campaignTitle }}</h2>
    <el-table :data="responses">
      <el-table-column prop="employeeName" label="Employé"></el-table-column>
      <el-table-column prop="response" label="Réponse"></el-table-column>
      <el-table-column prop="submittedDate" label="Date de soumission"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['campaignId'],
  data() {
    return {
      responses: [],
      campaignTitle: '',
    };
  },
  async created() {
    try {
      const response = await axios.get(`https://localhost:7186/api/campagne/${this.campaignId}`);
      this.campaignTitle = response.data.titre;
      this.responses = response.data.formulaire.responses.map(r => ({
        employeeName: `${r.employee.nom} ${r.employee.prenom}`,
        response: r.responseText,
        submittedDate: r.submittedDate,
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des réponses des employés :', error);
    }
  },
};
</script>

<style scoped>
.el-table {
  width: 100%;
  border: 1px solid #ddd;
}

.el-table-column {
  padding: 10px;
  text-align: left;
}

h2 {
  margin-bottom: 20px;
  color: #007acc;
}
</style>
