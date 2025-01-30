<template>
  <div class="comment-management">
    <h2>Gestion des Commentaires</h2>

    <!-- Barre de recherche -->
    <input type="text" v-model="searchQuery" placeholder="Rechercher un commentaire..." class="search-input" />

    <!-- Affichage des commentaires des enseignants -->
    <h3>Commentaires des Enseignants</h3>
    <div v-if="filteredTeachers.length">
      <div v-for="comment in filteredTeachers" :key="comment.id" class="comment-card teacher">
        <p class="comment-text">
          {{ comment.text }} - <strong>{{ comment.userName }}</strong> (👨‍🏫 Enseignant)
        </p>
        <button @click="confirmDelete(comment.id)" class="delete-btn">Supprimer</button>
      </div>
    </div>
    <p v-else class="no-comments">Aucun commentaire d'enseignant trouvé.</p>

    <!-- Affichage des commentaires des étudiants -->
    <h3>Commentaires des Étudiants</h3>
    <div v-if="filteredStudents.length">
      <div v-for="comment in filteredStudents" :key="comment.id" class="comment-card student">
        <p class="comment-text">
          {{ comment.text }} - <strong>{{ comment.userName }}</strong> (🎓 Étudiant)
        </p>
        <button @click="confirmDelete(comment.id)" class="delete-btn">Supprimer</button>
      </div>
    </div>
    <p v-else class="no-comments">Aucun commentaire d'étudiant trouvé.</p>
  </div>
</template>

<script>
import { db, collection, getDocs, deleteDoc, doc } from '@/firebase';

export default {
  data() {
    return {
      comments: [],
      searchQuery: '',
    };
  },
  computed: {
    filteredTeachers() {
      return this.comments
        .filter(comment => comment.role === 'teacher')
        .filter(comment =>
          comment.text.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          comment.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    },
    filteredStudents() {
      return this.comments
        .filter(comment => comment.role === 'student')
        .filter(comment =>
          comment.text.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          comment.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }
  },
  methods: {
    async loadComments() {
      const commentsCollection = collection(db, 'comments');
      const snapshot = await getDocs(commentsCollection);
      this.comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    async confirmDelete(commentId) {
      if (confirm("Voulez-vous vraiment supprimer ce commentaire ?")) {
        await deleteDoc(doc(db, 'comments', commentId));
        this.loadComments();
      }
    }
  },
  mounted() {
    this.loadComments();
  }
};
</script>

<style scoped>
.comment-management {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2, h3 {
  text-align: center;
  color: #333;
}

.search-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.comment-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: transform 0.2s;
}

.teacher {
  background: #e3f2fd;
  border-left: 4px solid #2196f3;
}

.student {
  background: #e8f5e9;
  border-left: 4px solid #4caf50;
}

.comment-card:hover {
  transform: scale(1.02);
}

.comment-text {
  margin: 0;
  color: #444;
}

.delete-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s;
}

.delete-btn:hover {
  background: #c0392b;
}

.no-comments {
  text-align: center;
  color: #888;
}
</style>
