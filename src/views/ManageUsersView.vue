<template>
    <div>
      <h1>Gestion des utilisateurs</h1>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button @click="editUser(user)">Modifier</button>
              <button @click="deleteUser(user.id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [
          { id: 1, name: "Alice", email: "alice@example.com", role: "Étudiant" },
          { id: 2, name: "Bob", email: "bob@example.com", role: "Enseignant" },
        ],
      };
    },
    methods: {
      editUser(user) {
        alert(`Modifier l'utilisateur : ${user.name}`);
      },
      deleteUser(id) {
        alert(`Supprimer l'utilisateur avec l'ID : ${id}`);
      },
    },
  };
  </script>
  