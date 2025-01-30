<template>
  <div class="app">
    <h1>Catégories de Cours</h1>
    <!-- Your existing course category and comments section -->
    <div v-if="course">
      <h2>{{ course.name }}</h2>
      <p>{{ course.description }}</p>
      <p><strong>Durée:</strong> {{ course.duration }}</p>
      <p><strong>Mode:</strong> {{ course.mode === 'online' ? 'En ligne' : 'Présentiel' }}</p>

      <!-- Displaying comments -->
      <div v-if="course.comments && course.comments.length">
        <h4>Commentaires :</h4>
        <ul>
          <li v-for="(comment, index) in course.comments" :key="index">
            {{ comment }}
            <button @click="deleteComment(index)">Supprimer</button>
          </li>
        </ul>
      </div>
      <form @submit.prevent="addComment">
        <input v-model="newComment" placeholder="Add a comment" />
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default {
  data() {
    return {
      course: null,  // To store the fetched course data
      newComment: '',  // To hold the new comment text
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
    async addComment() {
      if (this.newComment) {
        this.course.comments.push(this.newComment);
        this.newComment = '';  // Clear input field

        try {
          await updateDoc(doc(db, 'courses', this.$route.params.courseId), {
            comments: this.course.comments,  // Update the course's comments
          });
        } catch (error) {
          console.error("Error adding comment:", error);
        }
      }
    },
    deleteComment(index) {
      this.course.comments.splice(index, 1);  // Remove the comment at the given index
      updateDoc(doc(db, 'courses', this.$route.params.courseId), {
        comments: this.course.comments,  // Update the course's comments
      });
    },
  },
};
</script>


<style scoped>
/* Styles similaires, avec ajout pour les images */
.app {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
}

.categories {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn-category {
  padding: 10px 15px;
  border: none;
  background-color: #eee;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s ease;
}

.btn-category.active {
  background-color: #3498db;
  color: white;
}

.btn-category:hover {
  background-color: #2980b9;
  color: white;
}

.courses {
  margin-top: 20px;
}

.course-card {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  margin: 10px auto;
  max-width: 400px;
  text-align: left;
}

.course-card h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.course-card p {
  margin: 5px 0 0;
  font-size: 14px;
  color: #666;
}

.btn-enroll {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease;
}

.btn-enroll:hover {
  background-color: #2980b9;
}

.enrollment-form {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin: 20px auto;
  max-width: 400px;
  text-align: left;
}

.enrollment-form h3 {
  margin: 0 0 15px;
}

.enrollment-form label {
  display: block;
  margin: 10px 0 5px;
  font-weight: bold;
}

.enrollment-form input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.btn-submit {
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease;
}

.btn-submit:hover {
  background-color: #27ae60;
}

.btn-cancel {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  transition: 0.3s ease;
}

.btn-cancel:hover {
  background-color: #c0392b;
}

.course-card {
  display: flex;
  gap: 15px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  margin: 10px auto;
  max-width: 600px;
  align-items: center;
}

.course-image {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.course-info {
  flex: 1;
  text-align: left;
}
</style>
