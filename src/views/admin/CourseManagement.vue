<template>
  <div>
    <div class="header-container">
      <button class="back-button" @click="$router.go(-1)">Back</button>
      <h2 class="subtitle">Manage Lessons</h2>
    </div>
    <table class="lesson-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Teacher</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Duration</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lesson in lessons" :key="lesson.id">
          <td>{{ lesson.name }}</td>
          <td>{{ lesson.description }}</td>
          <td>{{ lesson.teacherName }}</td>
          <td>{{ lesson.startDate }}</td>
          <td>{{ lesson.endDate }}</td>
          <td>{{ lesson.durationValue }} {{ lesson.durationUnit }}</td>
          <td>
            <button class="detail-button" @click="viewLessonDetails(lesson.id)">Detail</button>
            <button class="delete-button" @click="deleteLesson(lesson.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default {
  data() {
    return {
      lessons: [],
    };
  },
  async created() {
    await this.fetchLessons();
  },
  methods: {
    async fetchLessons() {
      try {
        const lessonsCollection = collection(db, "courses");
        const lessonsSnapshot = await getDocs(lessonsCollection);
        this.lessons = lessonsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error fetching lessons: ", error);
      }
    },
    async deleteLesson(lessonId) {
      if (confirm("Are you sure you want to delete this lesson?")) {
        try {
          await deleteDoc(doc(db, "courses", lessonId));
          this.lessons = this.lessons.filter((lesson) => lesson.id !== lessonId);
          alert("Lesson deleted successfully!");
        } catch (error) {
          console.error("Error deleting lesson: ", error);
        }
      }
    },
    viewLessonDetails(courseId) {
      this.$router.push({ name: "CourseDetail", params: { courseId } });
    },
  },
};
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.back-button {
  background-color: #e74c3c;
  color: white;
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #c0392b;
}

.subtitle {
  text-align: center;
  font-size: 1.8rem;
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 5px;
}

.lesson-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.lesson-table th,
.lesson-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.lesson-table th {
  background-color: #2c3e50;
  color: white;
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: 700;
}

.lesson-table td {
  color: #34495e;
  font-size: 0.9rem;
}

.lesson-table tr:hover {
  background-color: #f2f6fc;
}

button {
  font-size: 0.9rem;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
}

.delete-button:hover {
  background-color: #c0392b;
}

.detail-button {
  background-color: #3498db;
  color: white;
}

.detail-button:hover {
  background-color: #2980b9;
}
</style>
