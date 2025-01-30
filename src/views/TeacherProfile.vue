<!-- 
  <template>
    <div class="profile-container">
      <header class="profile-header">
        <h1>Profil de l'enseignant</h1>
      </header>
      <div v-if="loading" class="loading">chargement...</div>
        //  Vérification si l'image existe avant de l'afficher 
        <div v-else-if="teacher" class="profile-details">
        <img v-if="teacher.photo" :src="teacher.photo" alt="Photo du professeur" class="profile-photo" />
        <p v-else>Aucune photo disponible</p>
  
        // Affichage des détails de l'enseignant 
        <ul>
          <li><strong>Nom :</strong> {{ teacher.name }}</li>
          <li><strong>Prénom :</strong> {{ teacher.firstName }}</li>
          <li><strong>Email :</strong> {{ teacher.email }}</li>
        </ul>
      </div>
      <div v-else>
      <p>Aucun profil trouvé pour cet enseignant.</p>
      </div>
      <button @click="goBack" class="back-button">Retour</button>
    </div>
  </template> -->
  <template>
    <div class="profile-container">
      <header class="profile-header">
        <h1>Profil de l'enseignant</h1>
      </header>
      <!-- Loading state -->
      <div v-if="loading" class="loading">Chargement...</div>
      <!-- Display teacher details when data is loaded -->
      <div v-else-if="teacher" class="profile-details">
        <img v-if="teacher.photo" :src="teacher.photo" alt="Photo du professeur" class="profile-photo" />
        <p v-else>Aucune photo disponible</p>
        <ul>
          <li><strong>Nom :</strong> {{ teacher.name }}</li>
          <li><strong>Prénom :</strong> {{ teacher.firstName }}</li>
          <li><strong>Email :</strong> {{ teacher.email }}</li>
        </ul>
      </div>
      
      <div v-else>
        <p>Aucun profil trouvé pour cet enseignant.</p>
      </div>
      <button @click="goBack" class="back-button">Retour</button>
    </div>
  </template>
  
  <script>
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Importez Firestore depuis votre fichier firebase.js


  export default {
    name: "TeacherProfile",
    data() {
      return {
        // teacher: {
        //   name: "Noujoud",
        //   firstName: "Eljoudi",
        //   email: "noujoud@gmail.com",
        //   photo: require("../assets/teacher-photo.jpg"), 
        teacher: null,
        loading: false,
        
      };
    },


    async created() {
    // Get the teacherId from the route parameters
    const teacherId = this.$route.params.teacherId; 
    try {
      // Fetch the teacher's document from Firestore
      const teacherDoc = await getDoc(doc(db, "teachers", teacherId)); // "teachers" is your Firestore collection name
      if (teacherDoc.exists()) {
        this.teacher = teacherDoc.data(); // Store the teacher's data
      } else {
        console.error("Aucun profil trouvé pour cet enseignant.");
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
    } finally {
      this.loading = false; // Stop loading spinner
    }
  }, 
    methods: {

      
  goBack() {
    this.$router.push("/Teacher"); // Retour 
  },
    },
  };
  </script>
  
  <style scoped>
  .profile-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #f9f9f9;
  }
  .profile-header {
    text-align: center;
    margin-bottom: 20px;
  }
  .profile-photo {
    display: block;
    margin: 0 auto 20px;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
  .profile-details ul {
    list-style: none;
    padding: 0;
  }
  .profile-details li {
    margin: 10px 0;
    font-size: 16px;
  }
  .back-button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .back-button:hover {
    background-color: #0056b3;
  }
  </style>
  