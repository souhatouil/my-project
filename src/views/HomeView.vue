<template>
  <div id="app">
    <!-- En-tête avec le logo et navigation -->
    <header>
      <div class="logo">
        <img src="@/assets/600.jpg" alt="Logo" />
      </div>
      <nav>
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Sign Up</router-link>
      </nav>
    </header>

    <!-- Section principale avec les catégories de cours -->
    <main>
      <section class="categories">
        <h2>Catégories des Cours</h2>
        <div class="category-list">
          <div
            v-for="course in courses"
            :key="course.id"
            class="category-item"
            @click="goToCourseDetail(course.id)"
          >
            <img :src="course.image" :alt="course.name" />
            <h3>{{ course.name }}</h3>
          </div>
        </div>
      </section>
    </main>

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
import { useRouter } from "vue-router";

export default {
  name: "HomeView",
  setup() {
    const router = useRouter();

    // Liste des cours avec images
    const courses = [
      {
        id: 1,
        name: "Développement Web",
        image: "/images/web-development.jpg",
      },
      {
        id: 2,
        name: "Design",
        image: "/images/design.jpg",
      },
      {
        id: 3,
        name: "Science",
        image: "/images/science.jpg",
      },
      {
        id: 4,
        name: "Intelligence Artificielle",
        image: "/images/ai.jpg",
      },
      {
        id: 5,
        name: "Affaires",
        image: "/images/business.jpg",
      },
      {
        id: 6,
        name: "Langues",
        image: "/images/languages.jpg",
      },
    ];

    // Redirection vers les détails d'un cours
    const goToCourseDetail = (courseId) => {
      router.push(`/course/${courseId}`);
    };

    return { courses, goToCourseDetail };
  },
};
</script>

<style scoped>
/* Style de la page */
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
  background-color: #2c3e50;
  padding: 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

header .logo img {
  height: 50px;
}

nav a {
  color: #ecf0f1;
  text-decoration: none;
  margin: 0 15px;
  font-size: 16px;
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
  flex-wrap: wrap;
}

.category-item {
  padding: 20px;
  background-color: #e8e8e8;
  border-radius: 8px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.category-item:hover {
  transform: scale(1.05);
}

.category-item img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}

footer {
  background-color: #34495e;
  color: white;
  padding: 20px;
  font-size: 14px;
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
</style>
