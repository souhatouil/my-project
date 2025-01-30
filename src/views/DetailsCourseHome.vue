<template>
    <div class="app">
      <h1>Catégories de Cours</h1>
  
      <!-- Boutons pour les catégories -->
      <div class="categories">
        <button
          v-for="category in categories"
          :key="category.name"
          class="btn-category"
          :class="{ active: category.name === selectedCategory }"
          @click="selectedCategory = category.name"
        >
          {{ category.name }}
        </button>
      </div>
  
      <!-- Affichage des cours -->
      <div class="courses">
        <h2>Cours dans la catégorie : {{ selectedCategory }}</h2>
        <div v-if="displayedCourses.length > 0">
          <div v-for="course in displayedCourses" :key="course.id" class="course-card">
            <img :src="course.image" :alt="course.name" class="course-image" />
            <div class="course-info">
              <h3>{{ course.name }}</h3>
              <p>{{ course.description }}</p>
              <p><strong>Durée :</strong> {{ course.duration }}</p>
              <p>
                <strong>Mode :</strong> {{ course.mode === 'online' ? 'En ligne' : 'Présentiel' }}
              </p>
              <!-- Affichage des commentaires -->
              <div class="comments-section">
                <h4>Commentaires :</h4>
                <ul>
                  <li v-for="(comment, index) in course.comments" :key="index" class="comment-item">
                    {{ comment }}
                    <!-- Button to delete comment -->
                    <button @click="deleteComment(course, index)">Supprimer</button>
                  </li>
                </ul>
                <!-- Formulaire pour ajouter un commentaire -->
                <form @submit.prevent="addComment(course)">
                  <input v-model="newComments[course.id]" placeholder="Add a comment" />
                  <button type="submit">Submit</button>
                </form>
              </div>
  
              <!-- Bouton d'inscription --> 
              <button class="btn-enroll" @click="openEnrollmentForm(course)">
                S'inscrire
              </button>
            </div>
          </div>
        </div>
        <p v-else>Aucun cours disponible pour cette catégorie.</p>
      </div>
  
      <!-- Formulaire d'inscription -->
      <div v-if="showForm" class="enrollment-form">
        <h3>Inscription au cours : {{ selectedCourse.name }}</h3>
        <form @submit.prevent="submitEnrollment">
          <label for="name">Nom :</label>
          <input type="text" id="name" v-model="form.name" required />
  
          <label for="email">Email :</label>
          <input type="email" id="email" v-model="form.email" required />
  
          <label for="phone">Téléphone :</label>
          <input type="tel" id="phone" v-model="form.phone" required />
  
          <button type="submit" class="btn-submit">Envoyer</button>
          <button type="button" class="btn-cancel" @click="closeEnrollmentForm">
            Annuler
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { db, collection, getDocs } from '../firebase';
  import firebase from 'firebase/app';
  import 'firebase/auth';
  
  export default {
    data() {
      return {
        categories: [
          { name: "Développement Web" },
          { name: "Design" },
          { name: "Science" },
          { name: "AI" },
          { name: "Affaires" },
          { name: "Langues" },
        ],
        selectedCategory: "Développement Web",
        courses: [
        {
            id: 1,
            name: "Introduction au Design",
            category: "Design",
            description: "Apprenez les bases du design graphique.",
            duration: "4 semaines",
            mode: "online",
            image: "/images/intro design.jpg",
            comments : [],
          },
          {
            id: 2,
            name: "UI/UX Design",
            category: "Design",
            description: "Découvrez comment concevoir des interfaces utilisateur modernes.",
            duration: "6 semaines",
            mode: "presentiel",
            image: "/images/UX.jpg",
            comments : [],
          },
          {
            id: 3,
            name: "HTML & CSS",
            category: "Développement Web",
            description: "Maîtrisez les bases du développement web.",
            duration: "5 semaines",
            mode: "online",
            image: "/images/html.jpg",
            comments : [],
          },
          {
            id: 4,
            name: "JavaScript Avancé",
            category: "Développement Web",
            description: "Plongez dans le JavaScript avancé.",
            duration: "8 semaines",
            mode: "presentiel",
            image: "/images/java.jpg",
            comments : [],
          },
          {
            id: 5,
            name: "Introduction à la Physique",
            category: "Science",
            description: "Explorez les principes fondamentaux de la physique.",
            duration: "6 semaines",
            mode: "online",
            image: "/images/physics.jpg",
            comments : [],
          },
          {
            id: 6,
            name: "Biologie pour Débutants",
            category: "Science",
            description: "Comprenez les bases de la biologie.",
            duration: "5 semaines",
            mode: "presentiel",
            image: "/images/bio.jpg",
            comments : [],
          },
          {
            id: 7,
            name: "Introduction à l'Intelligence Artificielle",
            category: "AI",
            description: "Apprenez les concepts de base de l'IA.",
            duration: "7 semaines",
            mode: "online",
            image: "/images/ai.jpg",
            comments : [],
          },
          {
            id: 8,
            name: "Machine Learning",
            category: "AI",
            description: "Découvrez les algorithmes de machine learning.",
            duration: "10 semaines",
            mode: "presentiel",
            image: "/images/ML.jpg",
            comments : [],
          },
          {
            id: 9,
            name: "Marketing Digital",
            category: "Affaires",
            description: "Maîtrisez les stratégies de marketing en ligne.",
            duration: "4 semaines",
            mode: "online",
            image: "/images/digitalmarketing.jpg",
            comments : [],
          },
          {
            id: 10,
            name: "Entrepreneuriat",
            category: "Affaires",
            description: "Développez vos compétences entrepreneuriales.",
            duration: "8 semaines",
            mode: "presentiel",
            image: "/images/business (2).jpg",
            comments : [],
          },
          {
            id: 11,
            name: "Anglais pour Débutants",
            category: "Langues",
            description: "Apprenez les bases de l'anglais.",
            duration: "6 semaines",
            mode: "online",
            image: "/images/anglais.jpg",
            comments : [],
          },
          {
            id: 12,
            name: "Espagnol Avancé",
            category: "Langues",
            description: "Perfectionnez votre espagnol.",
            duration: "8 semaines",
            mode: "presentiel",
            image: "/images/espagnol.png",
            comments : [],
          },
          // Your courses data here...
        ],
        showForm: false,
        selectedCourse: null,
        form: {
          name: "",
          email: "",
          phone: "",
        },
        newComments: {},
      };
    },
    computed: {
      displayedCourses() {
         // Récupération des cours
         return this.courses.filter(course => course.category === this.selectedCategory);
      },
    },
    methods: {
        async loadCourses() {
      try {
        const coursesSnapshot = await getDocs(collection(db, 'courses'));
        this.courses = coursesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          comments: doc.data().comments || [], // S'assurer que 'comments' existe
        }));
      } catch (error) {
        console.error("Erreur lors du chargement des cours : ", error);
      }
    }, 
      async submitEnrollment() {
        if (this.form.name && this.form.email && this.form.phone) {
          try {
            await db.collection('inscriptions').add({
              courseId: this.selectedCourse.id,
              courseName: this.selectedCourse.name,
              studentName: this.form.name,
              studentEmail: this.form.email,
              studentPhone: this.form.phone,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            alert(`Inscription réussie pour le cours : ${this.selectedCourse.name}`);
            this.closeEnrollmentForm();
          } catch (error) {
            console.error("Erreur lors de l'inscription : ", error);
            alert("Une erreur est survenue lors de l'inscription.");
          }
        } else {
          alert("Veuillez remplir tous les champs du formulaire.");
        }
      },
      addComment(course) {
        const newComment = this.newComments[course.id];
        if (newComment) {
          course.comments.push(newComment);
          this.newComments[course.id] = "";
        }
      },
      deleteComment(course, index) {
        course.comments.splice(index, 1); // Delete the comment at the given index
      },
      openEnrollmentForm(course) {
        this.selectedCourse = course;
        this.showForm = true;
      },
      closeEnrollmentForm() {
        this.showForm = false;
        this.selectedCourse = null;
        this.form = { name: "", email: "", phone: "" };
      },
    },
  // Charger les cours dès que le composant est monté
  mounted() {
    this.loadCourses();
  },
  };
  </script>
  