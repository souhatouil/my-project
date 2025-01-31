<template>
    <div class="admin-container">
      <!-- Sidebar -->
      <aside class="sidebar">
        <h2 class="sidebar-title">Admin Panel</h2>
        <router-link to="/admin/courses">📚 Manage Lessons</router-link>
        <router-link to="/admin/users">👥 Manage Users</router-link>
        <router-link to="/admin/categories"> Manage Categories</router-link>
        <router-link to="/admin/stats"> Statistiques</router-link>
        <button class="logout-button" @click="logout">Logout</button>
      </aside>
  
      <!-- Main Content -->
      <div class="content">
        <div class="header">
          <h1 class="title">Admin Dashboard</h1>
          
        </div>
        
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  import { getAuth, signOut } from "firebase/auth";
  
  export default {
    methods: {
      logout() {
        const auth = getAuth();
        signOut(auth)
          .then(() => {
            alert("Logged out successfully!");
            this.$router.push("/login");
          })
          .catch((error) => {
            console.error("Error during logout: ", error);
            alert("Failed to logout. Please try again.");
          });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Amélioration de l'interface pour correspondre à l'image */
  .admin-container {
    display: flex;
    height: 100vh;
    font-family: 'Poppins', sans-serif;
    background-color: #f4f7fa;
  }
  
  /* Barre latérale améliorée */
  .sidebar {
    width: 280px;
    background-color: #2c3e50;
    color: white;
    padding: 25px;
    display: flex;
    flex-direction: column;
    height: 100vh;
    box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
    justify-content: flex-start;
    position: fixed;
  }
  
  .sidebar-title {
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 30px;
    border-bottom: 3px solid #3498db;
    padding-bottom: 15px;
    font-weight: bold;
  }
  
  .sidebar a {
    text-decoration: none;
    color: white;
    font-size: 1rem;
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    transition: all 0.3s ease;
    font-weight: 500;
  }
  
  .sidebar a:hover {
    background-color: #3498db;
    transform: scale(1.05);
  }
  
  /* Bouton de déconnexion correctement aligné */
  .logout-button {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    color: white;
    font-size: 1rem;
    padding: 15px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px; 
    width: 100%;
  }
  
  .logout-button:hover {
    background: linear-gradient(135deg, #ff6b6b, #e74c3c);
    transform: scale(1.05);
  }
  
  /* Contenu principal */
  .content {
    margin-left: 280px;
    flex-grow: 1;
    padding: 30px;
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }
  
  .header {
    display: flex;
    justify-content: center; /* Centers horizontally */
    align-items: center; /* Centers vertically */
    margin-bottom: 30px;
    height: 100px; /* Optional: adjust based on your design */
  }
  
  .title {
    font-size: 2.2rem;
    color: #2c3e50;
    font-weight: bold;
  }
  
  
  /* Tableau de bord */
  .dashboard-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .card {
    background: white;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;
  }
  
  .card:hover {
    transform: scale(1.03);
  }
  
  @media (max-width: 768px) {
    .sidebar {
      width: 220px;
    }
    .content {
      margin-left: 220px;
    }
  }
  </style>