<template>
  <div class="interview-list-container">
    <h2 class="interview-list-title">Liste des interviews pour campagne 1</h2>
    <table class="interview-table">
      <thead>
      <tr>
        <th>NOM</th>
        <th>Equipe</th>
        <th>Manager</th>
        <th>Date</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(interview, index) in interviews" :key="index">
        <td>
          <img :src="interview.avatar" alt="avatar" class="avatar" />
          <span>{{ interview.name }}</span>
        </td>
        <td>{{ interview.team }}</td>
        <td>{{ interview.manager }}</td>
        <td>{{ interview.date }}</td>
        <td><span class="status-badge">{{ interview.status }}</span></td>
        <td><button @click="viewForm(interview)" class="btn-view-form">voir formulaire</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      interviews: [
        {
          name: 'Dimas Adit',
          avatar: 'https://via.placeholder.com/40',
          team: 'Product Designer',
          manager: 'select Manager',
          date: '22 Dec 2024',
          status: 'Pending Interview'
        },
        {
          name: 'Dimas Adit',
          avatar: 'https://via.placeholder.com/40',
          team: 'Frontend Engineer',
          manager: 'select Manager',
          date: '22 Dec 2024',
          status: 'Pending Interview'
        },
        // Ajoute d'autres interviews ici
      ]
    };
  },
  methods: {
    viewForm(interview) {
      alert(`Voir le formulaire pour ${interview.name}`);
      // Logique pour afficher ou modifier le formulaire
    }
  }
};
</script>

<style scoped>
.interview-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.interview-list-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.interview-table {
  width: 100%;
  border-collapse: collapse;
}

.interview-table th, .interview-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.interview-table th {
  background-color: #f4f6f9;
  font-weight: bold;
}

.interview-table tr:hover {
  background-color: #f1f1f1;
}

.avatar {
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: middle;
}

.status-badge {
  background-color: #ffaa00;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.btn-view-form {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.btn-view-form:hover {
  background-color: #0056b3;
}
</style>
