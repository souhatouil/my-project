<template>
  <div>
    <h2 class="subtitle">List of Users</h2>
    <button class="logout-button" @click="$router.go(-1)">Back</button>
    <table class="user-table">
      <thead>
        <tr>
          <th>Fierst name</th>
          <th>Last name</th>
          <th>Email</th>
          <!-- <th>Phone</th> -->
          <th>Date of Birth</th>
          <th>Role</th>
          <!-- <th v-if="hasTeachers">Specialty</th> -->
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <!-- <td>{{ user.phone }}</td> -->
          <td>{{ user.dob }}</td>
          <td>{{ user.role }}</td>
          <!-- <td v-if="user.role === 'teacher'">enseignant</td>
          <td v-if="user.role === 'admin'">admin</td>
          <td v-if="user.role === 'student'">student</td>
          <td> -->
            <button class="delete-button" @click="deleteUser(user.id)">Delete</button>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default {
  data() {
    return {
      users: [],
      hasTeachers: false,
    };
  },
  async created() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        this.users = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.hasTeachers = this.users.some((user) => user.role === "teacher");
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    },
    async deleteUser(userId) {
      if (confirm("Are you sure you want to delete this user?")) {
        try {
          await deleteDoc(doc(db, "users", userId));
          this.users = this.users.filter((user) => user.id !== userId);
          alert("User deleted successfully!");
        } catch (error) {
          console.error("Error deleting user: ", error);
        }
      }
    },
  },
};
</script>
<style scoped>
/* Styles globaux pour l'interface */
.admin-space {
  font-family: 'Roboto', sans-serif;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f4f7fa;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.title {
  font-size: 2rem;
  color: #34495e;
}

.logout-button {
position: absolute;
top: 20px;
right: 20px;
background-color: #e74c3c;
color: white;
font-size: 1rem;
padding: 10px 20px;
border: none;
border-radius: 5px;
cursor: pointer;
transition: background-color 0.3s;
}

.logout-button:hover {
background-color: #c0392b;
}

.subtitle {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  display: inline-block;
  padding-bottom: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

table th,
table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

table th {
  background-color: #2c3e50;
  color: white;
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: 700;
}

table td {
  color: #34495e;
  font-size: 0.9rem;
}

table tr:hover {
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

.add-button {
  background-color: #3498db;
  color: white;
  margin-top: 10px;
}

.add-button:hover {
  background-color: #2980b9;
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
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.detail-button:hover {
  background-color: #2980b9;
}


.add-course {
  margin-top: 30px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.add-course h3 {
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 20px;
}

.add-course input,
.add-course select {
  width: calc(33.33% - 10px);
  margin-right: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #fff;
}

.add-course input:last-of-type,
.add-course select:last-of-type {
  margin-right: 0;
}

.add-course input:focus,
.add-course select:focus {
  border-color: #3498db;
  outline: none;
}

/* Styles spécifiques pour le champ select */
.add-course select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpolygon points='0,0 10,0 5,5' fill='%3498db'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px 12px;
}

.add-course select:hover {
  cursor: pointer;
}

.add-course select:disabled {
  background-color: #e8e8e8;
  color: #999;
}

@media (max-width: 768px) {
  .add-course input,
  .add-course select {
    width: calc(100% - 10px);
    margin-bottom: 10px;
  }

  .add-course input:last-of-type,
  .add-course select:last-of-type {
    margin-bottom: 0;
  }
}
</style>