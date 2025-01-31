<template>
  <div class="course-detail">
    <h1>{{ course.name }}</h1>
    <p>{{ course.description }}</p>
    <button @click="showForm = true">S'inscrire</button>

    <div v-if="showForm" class="form-overlay">
      <div class="form-container">
        <h2>Formulaire d'inscription</h2>
        <form @submit.prevent="submitForm">
          <label>Nom:</label>
          <input v-model="form.name" type="text" required />
          
          <label>Email:</label>
          <input v-model="form.email" type="email" required />
          
          <button type="submit">Soumettre</button>
        </form>
        <button class="close-btn" @click="showForm = false">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRoute } from 'vue-router';

export default {
  data() {
    return {
      course: {},
      showForm: false,
      form: {
        name: '',
        email: ''
      }
    };
  },
  async created() {
    const route = useRoute();
    const courseId = route.params.id;
    const courseDoc = await getDoc(doc(db, 'categories', courseId));
    if (courseDoc.exists()) {
      this.course = courseDoc.data();
    }
  },
  methods: {
    submitForm() {
      alert(`Inscription réussie pour ${this.form.name} !`);
      this.showForm = false;
      this.form.name = '';
      this.form.email = '';
    }
  }
};
</script>

<style scoped>
.course-detail {
  padding: 20px;
  text-align: center;
}
button {
  padding: 10px 20px;
  margin: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
button:hover {
  background-color: #2980b9;
}
.form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
}
.close-btn {
  background-color: red;
}
</style>
