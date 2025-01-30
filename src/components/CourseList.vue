<template>
    <section class="courses">
      <h2>{{ title }}</h2>
      <div class="course-container">
        <div class="course" v-for="course in courses" :key="course.id">
          <img :src="course.image" :alt="`Logo ${course.name}`" />
          <h3>{{ course.name }}</h3>
          <p>{{ course.description }}</p>
        </div>
      </div>
      <div class="course-list">
    <h2>{{ title }}</h2>
    <div class="course-card" v-for="course in courses" :key="course.id">
      <router-link :to="`/course/${course.id}`">
        <img :src="course.image" alt="Course Image" />
        <h3>{{ course.name }}</h3>
        <p>{{ course.description }}</p>
      </router-link>
    </div>
  </div>
    </section>
  </template>
  
  <script>
  export default {
  name: "CourseList",
  props: {
    courses: Array,
    title: String,
  },
};
  </script>
  
  <style scoped>
  .course-container {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
  }
  .course {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 15px;
    width: 300px;
    text-align: center;
  }
  .course img {
    max-width: 100px;
    margin-bottom: 10px;
  }
  .course h3 {
    margin: 10px 0;
    color: #0ba794;
  }
  .course p {
    color: #8a8585;
  }
  </style>