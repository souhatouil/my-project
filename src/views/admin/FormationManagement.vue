<template>
    <div>
      <h2>Gestion des Formations</h2>
      <div v-for="formation in formations" :key="formation.id">
        <p>{{ formation.title }} - {{ formation.instructor }}</p>
        <button @click.stop="deleteFormation(formation.id)">Supprimer</button>
      </div>
      <button @click="addFormation()">Ajouter une Formation</button>
    </div>
  </template>
  
  <script>
  import { db } from '@/firebase';
  
  export default {
    data() {
      return {
        formations: [],
      };
    },
    methods: {
      loadFormations() {
        db.collection('formations').get().then(snapshot => {
          this.formations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        });
      },
      addFormation() {
        const newFormation = { title: 'Nouvelle Formation', instructor: 'Nom Formateur' };
        db.collection('formations').add(newFormation).then(this.loadFormations);
      },
      deleteFormation(formationId) {
        db.collection('formations').doc(formationId).delete().then(this.loadFormations);
      }
    },
    mounted() {
      this.loadFormations();
    }
  };
  </script>
  