<template>
    <div>
      <header class="header">
      <h1>Bienvenue, Espace Étudiant</h1>
      <nav>
      <ul class="nav-links">
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/student/profile">Profil</router-link></li>
          <li><router-link to="/course/:courseId">Cours</router-link></li>
        </ul>
      </nav>
      <!-- Contenu spécifique pour les étudiants -->
      <button @click="logout">Déconnexion</button>
    </header>

     <!-- Réutilisation du composant CourseList -->
     <CourseList :courses="studentCourses" title="Vos cours disponibles" />
    

       <!-- Footer -->
       <footer>
      <p>&copy; 2025 E-learning platform | All rights reserved.</p>
      <div class="footer-links">
        <router-link to="/about">About Us</router-link> | 
        <router-link to="/contact">Contact</router-link>
      </div>
    </footer>
    
    </div>
  </template>
  
  <script>

import CourseList from "@/components/CourseList.vue";

  export default {
    name: 'StudentView',
    components : {
      CourseList,
    },

    data() {
    return {
      studentCourses: [
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
          id: 12,
          name: "Espagnol Avancé",
          category: "Langues",
          description: "Perfectionnez votre espagnol.",
          duration: "8 semaines",
          mode: "presentiel",
          image: "/images/espagnol.png",
          comments : [],
        },
      ],
    };
  },

  methods: {
  logout() {
    this.$router.push('/');
  },
},
  };

  </script>



<style scoped>
/* Général */
/* Général */
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background: linear-gradient(120deg, #f6d365, #fda085);
  color: #333;
}

/* En-tête */
header {
  background-color: #66dd6a;
  padding: 20px 30px;
  text-align: center;
  color: white;
  font-size: 1.8em;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-bottom: 3px solid #57b65b;
}

header h1 {
  margin: 0;
  font-size: 2em;
}

header nav {
  margin-top: 10px;
}

header .nav-links {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
}

header .nav-links li {
  display: inline;
}

header .nav-links a {
  color: white;
  text-decoration: none;
  font-size: 1.1em;
  font-weight: 500;
  transition: color 0.3s ease;
}

header .nav-links a:hover {
  color: #c8e6c9;
}

header button {
  margin-top: 15px;
  background: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: 0.3s ease;
}

header button:hover {
  background: #d32f2f;
}

/* Conteneur principal */
.container {
  max-width: 1000px; /* Ajustement de la largeur du conteneur */
  margin: 30px auto;
  padding: 20px;
  display: flex;
  flex-wrap: wrap; /* Permet aux cartes de se réorganiser */
  justify-content: space-around;
}

/* Carte de cours */
.course-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  margin: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 250px; /* Taille fixée pour la carte */
  max-width: 300px; /* Limite la largeur maximale */
  overflow: hidden;
}

.course-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Réduction de la taille de l'image dans la carte de cours */
.course-card img {
  width: 80px; /* Limite la largeur de l'image */
  height: 80px; /* Limite la hauteur de l'image */
  object-fit: cover; /* S'assure que l'image s'adapte sans déformation */
  margin-bottom: 20px;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.course-card h3 {
  font-size: 1.3em;
  color: #4caf50;
  margin: 10px 0;
}

.course-card p {
  color: #666;
  font-size: 0.9em; /* Réduit la taille du texte */
  line-height: 1.5;
  margin-bottom: 15px;
  padding: 0 10px; /* Ajoute un peu de marge autour du texte */
}

/* Boutons */
button {
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 25px;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background: #388e3c;
  transform: scale(1.05);
}

/* Footer */
footer {
  background-color: #34495e;
  color: white;
  padding: 20px;
  font-size: 14px;
  text-align: center;
}

footer p {
  margin: 0;
}

.footer-links a {
  color: #ecf0f1;
  text-decoration: none;
  margin: 0 10px;
}

.footer-links a:hover {
  text-decoration: underline;
}

/* Animations */
header, .course-card, footer {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>
