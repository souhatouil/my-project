<template>
    <div class="profile-container">
      <header class="profile-header">
        <h1>Profil de l'étudiant</h1>
      </header>
      <div class="profile-details">
        <img :src="student.photo" alt="Photo de l'étudiant" class="profile-photo" />
        <ul>
          <li><strong>Nom :</strong> {{ student.name }}</li>
          <li><strong>Prénom :</strong> {{ student.firstName }}</li>
          <li><strong>Email :</strong> {{ student.email }}</li>
          <li><strong>Numéro étudiant :</strong> {{ student.studentId }}</li>
        </ul>
      </div>
      <button @click="goBack" class="back-button">Retour</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "StudentProfile",
    data() {
      return {
        student: {
          name: "kawther",
          firstName: "eljoudi",
          email: "kawther@gmail.com",
          studentId: "0001",
          photo: require("../assets/student-photo.png"), // Chemin de la photo
        },
      };
    },
    methods: {
      goBack() {
        this.$router.push("/Student"); // Retour à l'accueil ou autre page
      },
    },
  };
  </script>
  
  <style scoped>
  .profile-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .profile-header {
    margin-bottom: 20px;
  }
  
  .profile-photo {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 20px;
  }
  
  .profile-details ul {
    list-style: none;
    padding: 0;
    text-align: left;
  }
  
  .profile-details li {
    margin: 10px 0;
  }
  
  .back-button {
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
  