<template>
  <div class="app">
    <h1>Catégories de Cours</h1>
    <!-- Your existing course category and comments section -->
    <div v-if="course">
      <h2>{{ course.name }}</h2>
      <p>{{ course.description }}</p>
      <p><strong>Durée:</strong> {{ course.durationValue }}</p>
      <p><strong>Mode:</strong> {{ course.mode === 'online' ? 'En ligne' : 'Présentiel' }}</p>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default {
  data() {
    return {
      course: null,  // To store the fetched course data
    };
  },
  async mounted() {
    // Fetch the course details using the courseId from the route
    const courseId = this.$route.params.courseId;
    this.fetchCourseDetails(courseId);
  },
  methods: {
    async fetchCourseDetails(courseId) {
      try {
        const courseDoc = await getDoc(doc(db, 'courses', courseId));  // Fetch course by ID
        if (courseDoc.exists()) {
          this.course = courseDoc.data();
        } else {
          console.error("No course found with that ID.");
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    },
  },};
  

</script>



<style scoped>
.app {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.course-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
}

h2 {
  color: #007bff;
  margin-bottom: 10px;
}

p {
  color: #555;
  line-height: 1.6;
}

strong {
  color: #000;
}
</style>
