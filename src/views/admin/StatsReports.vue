<template>
  <div class="stats-container">
    <h2 class="stats-title">Statistiques du Dashboard</h2>
    <div class="stats-cards">
      <div class="card">
        <h3>Utilisateurs</h3>
        <p class="stat-number">{{ users.length }}</p>
        <button @click="viewDetails('users')">Voir détails</button>
      </div>
      <div class="card">
        <h3>Cours</h3>
        <p class="stat-number">{{ courses.length }}</p>
        <button @click="viewDetails('courses')">Voir détails</button>
      </div>
      <!-- <div class="card">
        <h3>Commentaires</h3>
        <p class="stat-number">{{ comments.length }}</p>
        <button @click="viewDetails('comments')">Voir détails</button>
      </div> -->
    </div>
  </div>
</template>

<script>
import { db, collection, getDocs } from '@/firebase';

export default {
  data() {
    return {
      users: [],
      courses: [],
    };
  },
  methods: {
    async loadStats() {
      // Récupération des utilisateurs
      const usersSnapshot = await getDocs(collection(db, 'users'));
      this.users = usersSnapshot.docs;

      // Récupération des cours
      const coursesSnapshot = await getDocs(collection(db, 'courses'));
      this.courses = coursesSnapshot.docs;

      // Récupération des commentaires
    //   const commentsSnapshot = await getDocs(collection(db, 'comments'));
    //   this.comments = commentsSnapshot.docs;
    },
    viewDetails(type) {
      this.$router.push(`/admin/${type}`);
    }
  },
    viewDetails(type) {
      // Redirect to another page or show more info (this could be implemented as per your needs)
      this.$router.push(`/admin/${type}`);
    },
  mounted() {
    this.loadStats();
  }

};
</script>

<style scoped>
/* Container for the Statistics */
.stats-container {
  padding: 30px;
  background-color: #ecf0f1;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.stats-title {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.card h3 {
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 15px;
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
}

button {
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .stats-container {
    padding: 20px;
  }

  .stats-cards {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
