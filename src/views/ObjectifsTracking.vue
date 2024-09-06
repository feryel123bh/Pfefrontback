<template>
  <div class="objectives-tracking-page">
    <h2>Suivi des Objectifs de l'Équipe</h2>

    <div v-for="objective in objectives" :key="objective.id" class="objective-item">
      <div class="objective-header">
        <h3>{{ objective.title }}</h3>
        <div class="objective-progress">
          <div class="progress-bar">
            <div class="progress-bar-inner" :style="{ width: objective.progress + '%' }"></div>
          </div>
          <span>{{ objective.progress }}%</span>
        </div>
      </div>

      <div class="objective-body">
        <p>{{ objective.description }}</p>
        <rating v-model="objective.rating"></rating>
        <textarea v-model="objective.comment" placeholder="Ajouter un commentaire..."></textarea>
        <button @click="saveComment(objective)">Enregistrer le commentaire</button>
      </div>

      <div class="objective-comments">
        <h4>Commentaires</h4>
        <div v-for="comment in objective.comments" :key="comment.id" class="comment-item">
          <p>{{ comment.text }}</p>
          <button @click="editComment(objective, comment)">Modifier</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Rating from '@/components/Rating.vue';

export default {
  components: {
    Rating
  },
  data() {
    return {
      objectives: []
    };
  },
  created() {
    this.loadObjectives();
  },
  methods: {
    async loadObjectives() {
      try {
        const response = await axios.get('/api/objectives');
        this.objectives = response.data;
      } catch (error) {
        console.error("Error loading objectives:", error);
      }
    },
    async saveComment(objective) {
      if (objective.comment) {
        try {
          await axios.post(`/api/objectives/${objective.id}/note`, {
            note: objective.rating,
            commentaire: objective.comment
          });
          objective.comments.push({
            id: Date.now(),
            text: objective.comment
          });
          objective.comment = '';
          alert('Commentaire enregistré avec succès!');
        } catch (error) {
          console.error("Error saving comment:", error);
        }
      }
    }
    ,
    editComment(objective, comment) {
      objective.comment = comment.text;
      objective.comments = objective.comments.filter(c => c.id !== comment.id);
    }
  }
};
</script>

<style scoped>
.objectives-tracking-page {
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
}

.objective-item {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.objective-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-bar {
  width: 70%;
  background-color: #e9ecef;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 10px;
}

.progress-bar-inner {
  height: 10px;
  background-color: #28a745;
}

.objective-body {
  margin-top: 15px;
}

.objective-body textarea {
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ced4da;
}

.objective-comments {
  margin-top: 20px;
}

.comment-item {
  background: #f1f1f1;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}
</style>
