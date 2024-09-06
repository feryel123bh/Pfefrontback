<template>
  <div class="add-evaluation">
    <h2>Add New Evaluation</h2>

    <form @submit.prevent="submitEvaluation">
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="evaluation.description" required></textarea>
      </div>

      <div class="form-group">
        <label for="employee">Select Employee:</label>
        <select id="employee" v-model="evaluation.employeeId" required>
          <option v-for="employee in employees" :key="employee.id" :value="employee.id">
            {{ employee.nom }} {{ employee.prenom }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="score">Score:</label>
        <input type="number" id="score" v-model="evaluation.score" required min="0" max="100" />
      </div>

      <div class="form-group">
        <label for="comments">Comments:</label>
        <textarea id="comments" v-model="evaluation.comments"></textarea>
      </div>

      <button type="submit">Add Evaluation</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      evaluation: {
        description: '',
        employeeId: '',
        score: 0,
        comments: '',
      },
      employees: [], // To store the list of employees
    };
  },
  async created() {
    try {
      const response = await axios.get('https://localhost:7186/api/employees'); // Adjust the endpoint if necessary
      this.employees = response.data;
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  },
  methods: {
    async submitEvaluation() {
      try {
        const response = await axios.post('https://localhost:7186/api/evaluations', this.evaluation);
        console.log('Evaluation added:', response.data);

        // Redirect or show a success message
        this.$router.push({ name: 'EvaluationList' });
      } catch (error) {
        console.error('Error adding evaluation:', error);
      }
    },
  },
};
</script>

<style scoped>
.add-evaluation {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
