<template>
  <div class="teacher-space">
    <div class="header">
      <h1 class="title">Teacher Space:</h1>
      <button class="logout-button" @click="logout">Logout</button>
    </div>

    <!-- Profile Section -->
    <div class="profile-section" v-if="profile">
      <h2>My Profile</h2>
      <ul class="profile-list">
        <li><strong>First Name:</strong> {{ profile.firstName }}</li>
        <li><strong>Last Name:</strong> {{ profile.lastName }}</li>
        <li><strong>Email:</strong> {{ profile.email }}</li>
        <!-- <li><strong>Phone:</strong> {{ profile.phone }}</li> -->
        <li><strong>Date of Birth:</strong> {{ profile.dob }}</li>
      </ul>
    </div>

  <!-- <form @submit.prevent="addLesson" class="add-lesson-form">
  <input type="text" v-model="newLesson.title" placeholder="Lesson Title" required />
  <textarea v-model="newLesson.description" placeholder="Lesson Description" required></textarea>
  <input type="text" v-model="newLesson.instructor" placeholder="Instructor Name" required />
  <input type="text" v-model="newLesson.duration" placeholder="Duration (e.g., 4 weeks)" required />
  <button type="submit" class="add-button">Add Lesson</button>
</form> -->


    <!-- Add Course Form -->
    <div class="add-course">
      <h2>Add a New Course</h2>
      <form @submit.prevent="addCourse">
        <div class="form-group">
          <label for="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            v-model="newCourse.name"
            placeholder="Enter course name"
            required
          />
        </div>
        <div class="form-group">
          <label for="teacherName">Teacher Name:</label>
          <input
            type="text"
            id="teacherName"
            v-model="newCourse.teacherName"
            placeholder="Enter teacher name"
            required
          />
        </div>

        <div class="form-group">
          <label for="courseCategory">Course Category:</label>
          <select v-model="newCourse.type" id="courseCategory" required>
            <option value="" disabled>Select course category</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="Literature">Literature</option>
            <option value="Programming">Programming</option>
          </select>
        </div>

        <div class="form-group">
          <label for="courseDescription">Course Description:</label>
          <textarea
            id="courseDescription"
            v-model="newCourse.description"
            placeholder="Enter course description"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="courseFormat">Course Format:</label>
          <select v-model="newCourse.format" id="courseFormat" required>
            <option value="" disabled>Select course format</option>
            <option value="Video">Video</option>
            <option value="PDF">PDF</option>
            <option value="Interactive">Interactive</option>
          </select>
        </div>

        <!-- <div class="form-group">
          <label for="courseFile">Upload Course File:</label>
          <input
            type="file"
            id="courseFile"
            @change="handleFileUpload"
          />
        </div> -->

        <div class="form-group">
          <label>Duration:</label>
          <div class="duration-group">
            <input
              type="number"
              v-model="newCourse.durationValue"
              placeholder="Enter duration"
              required
            />
            <select v-model="newCourse.durationUnit">
              <option value="hours">Hours</option>
              <option value="weeks">Weeks</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="startDate">Start Date:</label>
          <input type="date" id="startDate" v-model="newCourse.startDate" required />
        </div>

        <div class="form-group">
          <label for="endDate">End Date:</label>
          <input type="date" id="endDate" v-model="newCourse.endDate" required />
        </div>

        <button type="submit" class="add-button" :disabled="isLoading">
          {{ isLoading ? "Adding..." : "Add Course" }}
        </button>
      </form>
    </div>

    <!-- Manage Courses -->
    <div class="manage-courses" v-if="filteredCourses.length">
      <h2>My Courses</h2>
      <ul class="courses-list">
        <li v-for="course in filteredCourses" :key="course.id" class="course-item">
          <div class="course-info">
            <strong>{{ course.name }}</strong> ({{ course.type }}) - {{ course.format }} 
            ({{ course.startDate }} to {{ course.endDate }})
          </div>
          <div class="actions">
            <button @click="deleteCourse(course.id)" class="delete-button">Delete</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- comments Section -->
    <!-- <div class="messages-section">
      <h2>Comments</h2>
      <div class="messages-list">
        <ul>
          <li v-for="message in messages" :key="message.id">
            <strong>{{ message.senderName }}:</strong> {{ message.text }}
          </li>
        </ul>
      </div>
      <div class="send-message">
        <input 
          type="text" 
          v-model="newMessage" 
          placeholder="Type your message..." 
        />
        <button @click="sendMessage">Send</button>
      </div>   -->
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, deleteDoc, addDoc, onSnapshot, query, orderBy, getDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase"; 

export default {
  name: "TeacherSpace",
  data() {
    return {
      profile: { firstname: "",lastname:"", email: "", dob: "" },
      newCourse: { 
        name: "", 
        type: "", 
        format: "", 
        startDate: "", 
        endDate: "", 
        teacherId: "", 
        description: "",
        durationValue: "", 
        durationUnit: "hours", 
        file: null 
      },
      newLesson: { 
        title: "", 
        description: "", 
        instructor: "", 
        duration: "" 
      },
      courses: [],
      isLoading: false,
      messages: [],
      newMessage: "",
    };
    
  },
  computed: {
    filteredCourses() {
      if (!this.profile) return [];
      return this.courses.filter((course) => course.teacherId === this.profile.id);
    },
  },
  async created() {
    await this.fetchProfile();
    await this.fetchCourses();
    this.fetchMessages();
  },
  methods: {
    fetchMessages() {
      const messagesRef = query(
        collection(db, "messages"),
        orderBy("timestamp", "asc")
      );
      onSnapshot(messagesRef, (snapshot) => {
        this.messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
    },
    async sendMessage() {
      if (!this.newMessage.trim()) return;

      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        await addDoc(collection(db, "messages"), {
          text: this.newMessage,
          senderId: user.uid,
          senderName: this.profile.username,
          timestamp: Date.now(),
        });
        this.newMessage = "";
      }
    },
    async fetchProfile() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            this.profile = docSnap.data();
            this.profile.id = user.uid; // Store user ID for filtering
          } else {
            console.error("No such document!");
          }
        } else {
          this.$router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching profile: ", error);
      }
    },
    async fetchCourses() {
      try {
        const coursesCollection = collection(db, "courses");
        const coursesSnapshot = await getDocs(coursesCollection);
        this.courses = coursesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    },
    handleFileUpload(event) {
      this.newCourse.file = event.target.files[0];
    },
    async addCourse() {
      try {
        this.isLoading = true;

        if (!this.newCourse.name || !this.newCourse.type  || !this.newCourse.startDate || !this.newCourse.endDate || !this.newCourse.durationValue || !this.newCourse.description) {
          alert("Please fill in all fields.");
          this.isLoading = false;
          return;
        }

        // let fileUrl = "";
        // if (this.newCourse.file) {
        //   const fileRef = ref(storage, courses/${this.newCourse.file.name});
        //   await uploadBytes(fileRef, this.newCourse.file);
        //   fileUrl = await getDownloadURL(fileRef);
        // }

        await addDoc(collection(db, "courses"), {
          ...this.newCourse,
          teacherId: this.profile.id, // Assign course to the current teacher
          // fileUrl: fileUrl,
        });

        alert("Course added successfully!");
        this.newCourse = { name: "", type: "", format: "", startDate: "", endDate: "", teacherId: "", description: "", durationValue: "", durationUnit: "hours", file: null };
        await this.fetchCourses();
      } catch (error) {
        console.error("Error adding course:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteCourse(courseId) {
      try {
        await deleteDoc(doc(db, "courses", courseId));
        alert("Course deleted successfully!");
        this.courses = this.courses.filter((course) => course.id !== courseId);
      } catch (error) {
        console.error("Error deleting course: ", error);
      }
    },
    async logout() {
      try {
        const auth = getAuth();
        await signOut(auth);
        this.$router.push("/login");
      } catch (error) {
        console.error("Error during logout: ", error);
      }
    },
  },

  //add lesson 
//   async addLesson() {
//   if (!this.newLesson || !this.newLesson.title || !this.newLesson.description || !this.newLesson.instructor || !this.newLesson.duration) {
//     alert("Please fill in all fields.");
//     return;
//   }
//   try {
//     const lessonsCollection = collection(db, "lessons");
//     const docRef = await addDoc(lessonsCollection, this.newLesson);
//     alert("Lesson added successfully!");
//     this.newLesson = { title: "", description: "", instructor: "", duration: "" };  // Reset newLesson
//   } catch (error) {
//     console.error("Error adding lesson: ", error);
//   }
// },

};
</script>
<style scoped>
/* Global Styles */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f2f5;
  color: #4a4a4a;
  transition: background-color 0.3s ease;
  animation: backgroundColorChange 5s ease-in-out infinite;
}

/* Animation for Background Color Change */
@keyframes backgroundColorChange {
  0% { background-color: #f0f2f5; }
  50% { background-color: #ecf0f1; }
  100% { background-color: #f0f2f5; }
}

/* Header and Main Title */
h1, h2 {
  color: #333;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: slideInFromTop 1s ease-out;
}

h1 {
  font-size: 3rem;
  text-align: center;
  margin: 20px 0;
}

/* Slide-in animation for Titles */
@keyframes slideInFromTop {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Container for Page Content */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px;
}

/* Profile Section with New Animation */
.profile-section {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);
  margin-bottom: 50px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeInUp 1s ease-out;
}

.profile-section:hover {
  transform: translateY(-10px);
  box-shadow: 0px 25px 60px rgba(0, 0, 0, 0.2);
}

/* Fade-in-up animation for Profile Section */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.profile-image {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin-right: 30px;
  transition: transform 0.3s ease;
}

.profile-image:hover {
  transform: scale(1.1);
}

.profile-details {
  max-width: 600px;
}

.profile-details h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 15px;
  text-transform: uppercase;
}

.profile-list {
  list-style-type: none;
  padding: 0;
}

.profile-list li {
  font-size: 1.1rem;
  margin: 8px 0;
}

.profile-list strong {
  color: #3498db;
}

/* Buttons Styling with Hover Effects */
.button {
  background-color: #3498db;
  color: #fff;
  padding: 15px 30px;
  font-size: 1.2rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  position: relative;
}

.button::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #2980b9;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.button:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}

.button:hover::after {
  opacity: 0.2;
}

.delete-button {
  background-color: #e74c3c;
  color: #fff;
  padding: 15px 30px;
  font-size: 1.2rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.delete-button:hover {
  background-color: #c0392b;
  transform: scale(1.05);
}

/* Form Section with New Animation */
.add-course, .manage-courses, .messages-section {
  background-color: #ffffff;
  padding: 30px;
  margin-bottom: 50px;
  border-radius: 15px;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);
  animation: bounceIn 1s ease-out;
}

.add-course h2, .manage-courses h2, .messages-section h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 25px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Form Inputs */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-size: 1.1rem;
  font-weight: bold;
  color: #34495e;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  font-size: 1.1rem;
  border: 2px solid #ddd;
  border-radius: 10px;
  background-color: #f8f8f8;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #3498db;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(52, 152, 219, 0.2);
  outline: none;
  transform: scale(1.02);
}

/* Animated Submit Button */
.submit-button {
  background-color: #27ae60;
  color: #fff;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin-top: 30px;
  position: relative;
}

.submit-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #2ecc71;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.submit-button:hover {
  background-color: #2ecc71;
  transform: translateY(-5px);
}

.submit-button:hover::before {
  opacity: 0.2;
}

/* Course Management Section */
.manage-courses .courses-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.course-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 15px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.course-item:hover {
  background-color: #bdc3c7;
  transform: translateX(10px);
}

.course-info {
  font-size: 1.1rem;
  color: #34495e;
  text-transform: capitalize;
}

.actions {
  display: flex;
  align-items: center;
}

.actions .edit-button {
  background-color: #f39c12;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-right: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.actions .edit-button:hover {
  background-color: #e67e22;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    width: 90%;
    padding: 20px;
  }

/* Profile Section Box */
.profile-section {
  background-color: #ffffff;  /* White background for the profile */
  padding: 30px 40px;
  margin-bottom: 50px;
  border-radius: 20px;
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
  max-width: 900px;
  margin: 20px auto; /* Center the profile box */
  animation: fadeIn 1s ease-out;
  transition: all 0.3s ease;
  border: 3px solid #3498db; /* Border color */
}

.profile-section:hover {
  box-shadow: 0px 25px 50px rgba(0, 0, 0, 0.2); /* Stronger shadow on hover */
}

/* Adding Animation to Profile Box */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Overall Profile Section Styling */
.profile-section {
  background: linear-gradient(135deg, #ff7e5f, #feb47b); /* Soft gradient background */
  color: white;
  padding: 40px;
  border-radius: 15px;
  max-width: 1000px;
  margin: 40px auto;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
  position: relative;
  overflow: hidden;
}

/* Add subtle hover effect on the profile section */
.profile-section:hover {
  transform: scale(1.03); /* Slight zoom effect */
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

/* Profile Image Design */
.profile-image {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 6px solid #ffffff;
  margin-bottom: 30px;
  object-fit: cover;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.4s ease, box-shadow 0.3s ease;
}

/* Zoom effect on profile image hover */
.profile-image:hover {
  transform: scale(1.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* Profile Name Styling */
.profile-name {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 15px;
  letter-spacing: 1px;
}

/* Profile Details (text) */
.profile-details {
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 20px;
  opacity: 0.85;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

/* Adding hover effect to profile details */
.profile-section:hover .profile-details {
  opacity: 1;
  transform: translateY(-5px);
}

/* Social Links Styling */
.profile-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
  padding: 15px 0;
  border-top: 2px solid rgba(255, 255, 255, 0.3);
}

.profile-links a {
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
  transition: transform 0.3s ease, color 0.3s ease;
  padding: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
}

.profile-links a:hover {
  transform: scale(1.1);
  color: #feb47b; /* Soft peach color on hover */
  background-color: rgba(255, 255, 255, 0.3);
}

/* Edit Button Styling */
.edit-profile-button {
  background-color: #feb47b;
  color: white;
  font-size: 1.4rem;
  padding: 12px 30px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  margin-top: 40px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  transition: all 0.3s ease;
}

.edit-profile-button:hover {
  background-color: #ff7e5f; /* Change color on hover */
  transform: translateY(-4px); /* Button lift on hover */
}

.edit-profile-button:active {
  background-color: #e66465; /* Darker peach color when clicked */
}

/* Adding Animation to Profile Section */
@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.profile-section {
  animation: slideIn 0.8s ease-out;
}

/* Media Queries for Smaller Screens */
@media (max-width: 768px) {
  .profile-section {
    padding: 30px;
    border-radius: 10px;
  }

  .profile-name {
    font-size: 2rem;
  }

  .profile-details {
    font-size: 1rem;
  }

  .profile-image {
    width: 150px;
    height: 150px;
  }

  .profile-links {
    gap: 15px;
  }

  .edit-profile-button {
    font-size: 1.2rem;
    padding: 10px 25px;
  }
}


  /* .form-group input,
  .form-group select,
  .form-group textarea {
    font-size: 1rem;
  }

  .button,
  .delete-button {
    font-size: 1rem;
    padding: 10px 20px;
  }

  .submit-button {
    font-size: 1rem;
    padding: 10px 20px;
  } */
}
/* Form Section Box */
.add-course, .manage-courses, .messages-section {
  background-color: #ffffff;  /* White background */
  padding: 40px;
  margin-bottom: 50px;
  border-radius: 15px;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  animation: bounceIn 1s ease-out;
  border: 2px solid #3498db; /* Border color to make it stand out */
  max-width: 800px;
  margin: 20px auto; /* Centering the box */
  transition: all 0.3s ease;
}

.add-course:hover, .manage-courses:hover, .messages-section:hover {
  box-shadow: 0px 25px 50px rgba(0, 0, 0, 0.2); /* Stronger shadow on hover */
}

/* Adding Animation to Box */
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Styling Form Inputs inside the Box */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-size: 1.1rem;
  font-weight: bold;
  color: #34495e;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  font-size: 1.1rem;
  border: 2px solid #ddd;
  border-radius: 10px;
  background-color: #f8f8f8;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #3498db;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(52, 152, 219, 0.2);
  outline: none;
  transform: scale(1.02);
}

/* Styled Submit Button inside the Box */
.submit-button {
  background-color: #27ae60;
  color: #fff;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin-top: 30px;
  position: relative;
  width: 100%;
  max-width: 300px; /* Max width to avoid stretching */
  margin-left: auto;
  margin-right: auto;
}

.submit-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #2ecc71;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.submit-button:hover {
  background-color: #2ecc71;
  transform: translateY(-5px);
}

.submit-button:hover::before {
  opacity: 0.2;
}

/* Responsive Styling */
@media (max-width: 768px) {
  .add-course, .manage-courses, .messages-section {
    padding: 20px;
    border-radius: 10px;
    max-width: 100%;
  }
}


</style>