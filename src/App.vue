<!-- <template>
  <div id="app">
     En-tête avec le logo et navigation 
    <header>
      <div class="logo">
        <img src="@/assets/600.jpg" alt="Logo" />
      </div>
      <nav>
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Sign Up</router-link>
      
      </nav>
    </header>

     Section principale avec les catégories de cours et description 
    <main>
      <section class="categories">
        <h2>Catégories des Cours</h2>
        <div class="category-list">
          <div class="category-item">Développement Web</div>
          <div class="category-item">Design</div>
          <div class="category-item">Science</div>
          <div class="category-item">Intelligence Artificielle</div>
          <div class="category-item">Affaires</div>
          <div class="category-item">Langues</div>
          Ajoute d'autres catégories ici 
        </div>
      </section>

      <section class="description">
        <h2>Pourquoi Choisir Notre Plateforme ?</h2>
        <p>
          Notre plateforme propose une large gamme de cours en ligne dispensés par des professionnels expérimentés. Que vous cherchiez à améliorer vos compétences ou à commencer une nouvelle carrière, nous avons des cours adaptés à vos besoins.
        </p>
        <button>En savoir plus</button>
      </section>
    </main>

    Footer
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
export default {
  name: "App",
};
</script>

<style scoped>
/* Styles globaux */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #8e9295;
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

header {
  background-color: #2c3e50; /* Couleur du header */
  padding: 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

header .logo img {
  height: 50px; /* Taille de votre logo */
}

nav a {
  color: #ecf0f1;
  text-decoration: none;
  margin: 0 15px;
  font-size: 16px;
}

nav a:hover {
  text-decoration: underline;
}

main {
  flex: 1;
  padding: 40px 20px;
  background-color: #fff;
}

.categories {
  margin-bottom: 40px;
}

.category-list {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap; /* Pour s'assurer que les catégories se réorganisent de manière responsive */
}

.category-item {
  padding: 20px;
  background-color: #e8e8e8;
  border-radius: 8px;
  text-align: center;
  width: 150px;
}

.description {
  margin-top: 40px;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #45a049;
}

footer {
  background-color: #2c3e50;
  color: white;
  padding: 20px 0;
  text-align: center;
}

footer .footer-links a {
  color: #ecf0f1;
  text-decoration: none;
  margin: 0 15px;
}

footer .footer-links a:hover {
  text-decoration: underline;
}
</style> -->
<template>
  <div id="app">
    <header>
      <!-- <router-link to="/home">Home</router-link> -->
    
     
    </header>
    <router-view /> <!-- Affiche les pages correspondantes aux routes -->
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>

header a {
  color: white;
  text-decoration: none;
  margin: 0 10px;
}

header a:hover {
  text-decoration: underline;
}
</style>

