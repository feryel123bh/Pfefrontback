<template>
  <div class="campaigns-page">
    <div class="header">
      <h1>Campagnes</h1>
      <div class="header-actions">
        <input type="text" placeholder="Rechercher" class="search-input"/>
        <button @click="goToCampagne" class="new-campaign-button">Nouvelle campagne</button>
      </div>
    </div>

    <!-- Section : Campagnes à démarrer -->
    <div class="campaigns-to-start">
      <h2>À démarrer</h2>
      <div class="campaign-card-container">
        <div class="campaign-card" v-for="campaign in campaignsToStart" :key="campaign.id">
          <div class="campaign-card-header">
            <span class="campaign-type">{{ campaign.type }}</span>
            <button class="more-options-button">...</button>
          </div>
          <div class="campaign-card-body">
            <h3>{{ campaign.title }}</h3>
            <div class="campaign-meta">
              <span>{{ campaign.date }}</span>
              <span>{{ campaign.participants }} participants</span>
            </div>
          </div>
          <div class="campaign-card-footer">
            <img :src="campaign.responsiblePhoto" alt="Responsable" class="responsible-photo"/>
          </div>
        </div>
      </div>
    </div>

    <!-- Section : Campagnes à analyser -->
    <div class="campaigns-to-analyze">
      <h2>Campagnes</h2>
      <table class="campaigns-table">
        <thead>
        <tr>
          <th>Titre de la campagne</th>
          <th>Statut</th>
          <th>Date début</th>
          <th>Responsable</th>
          <th>Participants</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="campaign in campaignsToAnalyze" :key="campaign.id">
          <td @click="navigateToForm(campaign.FormulaireId)" style="cursor: pointer">{{ campaign.title }}</td>
          <td><span :class="getStatusClass(campaign.status)">{{ campaign.status }}</span></td>
          <td>{{ campaign.date }}</td>
          <td>
            <img :src="responsiblePhoto" alt="Responsible Photo" class="responsible-photo" />
            {{ campaign.responsibleName }}
          </td>
          <td>{{ campaign.participants }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {

      campaignsToStart: [
        {
          id: 1,
          type: 'Entretien trimestriel',
          title: 'Point objectifs trimestriels',
          date: '31 mars 2021',
          participants: 8,
          responsiblePhoto: '@/assets/images/avatars/2.jpg',
        },
        {
          id: 2,
          type: 'Entretien retour de congé longue durée',
          title: 'Retour de congés maladie longue durée',
          date: '30 juin 2021',
          participants: 2,
          responsiblePhoto: 'path/to/photo2.jpg',
        },
        // Ajoutez plus de campagnes ici...
      ],
      campaignsToAnalyze: [
        {
          id: 1,
          title: 'Entretiens annuels 2022',
          status: 'En cours',
          deadline: '28/02/2023',
          responsibleName: 'Hernandez Daniel',
          responsiblePhoto: '@/assets/images/avatars/1.jpg',
          popularity: '20',
        },
        {
          id: 2,
          title: 'Evaluación del desempeño 2022',
          status: 'En cours',
          deadline: '28/02/2023',
          responsibleName: 'Gómez Antonio',
          responsiblePhoto: '@/assets/images/avatars/0.jpg',
          popularity: '15',
        },
        // Ajoutez plus de campagnes ici...
      ],
    };
  },
  methods: {
    goToCampagne() {
      this.$router.push({ name: 'campagne' });
    },
    getStatusClass(status) {
      return {
        'status-in-progress': status === "En cours",
        'status-closed': status === "Terminée",
      };
    },
    navigateToForm(formId)
    {
       this.$router.push({ name: 'respond', params: { formId: formId }});
    }
  },
  async created() {
    const response = await axios.get(`https://localhost:7186/api/campagne`);
    console.log(response)
    this.campaignsToStart = response.data.filter(c => c.Status == 2).map((campagne) => {
      return {
        id: campagne.Id,
        type: getCampagneType(campagne.CampaignType),
        FormulaireId: campagne.FormulaireId,
        title: campagne.Titre,
        date: new Date(campagne.StartDate).toLocaleDateString("en-US"),
        participants: campagne.NotifiedEmployees.length,
        responsiblePhoto: '@/assets/images/avatars/0.jpg',
      }
    })
    this.campaignsToAnalyze = response.data.filter(c => c.Status != 2).map((campagne) => {
      return {
        id: campagne.Id,
        title: campagne.Titre,
        fieldId: campagne["fieldId"],
        status: getCampagneStatus(campagne.Status),
        FormulaireId: campagne.FormulaireId,
        date: new Date(campagne.StartDate).toLocaleDateString("en-US"),
        participants: campagne.NotifiedEmployees.length,
        responsibleName: campagne.Manager.Nom + " " + campagne.Manager.Prenom ,
        responsiblePhoto: '@/assets/images/avatars/2.jpg',
      }
    })
  },
};
function getCampagneType(typeCampagne) {
  switch (typeCampagne) {
    case 0:
      return "Entretiens Annuelle";
      break;
    case 1:
      return "Entretiens Semestrielle";
      break;
    case 2:
      return "Entretiens Trimestrielle"
      break;
  }
}
function getCampagneStatus(status) {
  switch (status) {
    case 0:
      return "En cours";
      break;
    case 1:
      return "Terminée";
      break;
    case 2:
      return "A réaliser"
      break;
  }
}

</script>

<style scoped>
.campaigns-page {
  padding: 20px;
  font-family: 'Roboto', sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-actions {
  display: flex;
  align-items: center;
}

.search-input {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ced4da;
  margin-right: 10px;
}

.new-campaign-button {
  padding: 10px 20px;
  background-color: #00aaff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.new-campaign-button:hover {
  background-color: #007acc;
}

.campaigns-to-start {
  margin-bottom: 40px;
}

.campaign-card-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.campaign-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  width: calc(25% - 20px);
  position: relative;
}

.campaign-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.campaign-type {
  font-size: 14px;
  color: #00aaff;
}

.more-options-button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.campaign-card-body h3 {
  margin: 0 0 10px;
}

.campaign-meta {
  font-size: 14px;
  color: #888;
  display: flex;
  justify-content: space-between;
}

.campaign-card-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
}

.responsible-photo {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.campaigns-table {
  width: 100%;
  border-collapse: collapse;
}

.campaigns-table th,
.campaigns-table td {
  padding: 15px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.campaigns-table th {
  background-color: #f8f9fa;
}

.status-in-progress {
  color: #28a745;
  font-weight: bold;
}

.status-closed {
  color: #dc3545;
  font-weight: bold;
}
</style>
