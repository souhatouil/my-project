<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <form @submit.prevent="handleSubmit">
    <div class="form">
      <label for="name"> Nom :</label>
      <input type="text" id="name" placeholder="enter your name" v-model="name">
    </div>
    <div class="form">
      <label for="lastname"> Prenom : </label>
      <input type="text" id="lastName" placeholder="enter your last name" v-model="Lastname">
    </div>
    <div class="form">
      <label for="email"> Email : </label>
      <input type="email" id="email"  placeholder="enter your email" v-model="email">
    </div>
    <div class="form">
      <label for="password"> password: </label>
      <input type="password" id="pass" placeholder="enter your password" v-model="password">
    </div>
    <div class="form">
      <label for="télèphone"> Télèphone: </label>
      <input type="tel" id="tel" placeholder="enter your phone number" v-model="telephone">
    </div>
    <div class="form">
      <label for="adresse"> Adresse : </label>
      <input type="text" id="add" placeholder="enter your adrese " v-model="adresse">
    </div>
    <div class="form">
      <label for="specialite"> Spécialité : </label>
      <select id="specialty" v-model="specialty" class="form"> 
        <option disabled value="">Please select one</option> 
        <option>Web Development</option> 
        <option>Data Science</option> 
        <option>Cyber Security</option> 
        <option>Artificial Intelligence</option> 
      </select>
    </div>
    <button type="submit" @click="handleSubmit" class="btn"> Submit </button>
  </form>
  <p v-if="submitted" class="submitted-message">Submitted! 
    <strong>Nom: </strong> {{ name }} <br/>
    <strong>Prenom: </strong> {{ Lastname }} <br/>
    <strong>Email: </strong> {{ email }} <br/>
    <strong>password: </strong> {{ password }} <br/>
    <strong>Télèphone: </strong> {{ telephone }} <br/>
    <strong>Adresse : </strong> {{ adresse }} <br/>
    <strong>specialite: </strong> {{ specialty }}</p>
  </div>
</template>

<script>
export default {
  name: 'helloWord',
  props: {
    msg: String
  },

  data() {
    return {
      name: "",
      email: "",
      submitted: false, // Variable pour contrôler l'affichage
    };
  },
  methods: {
    handleSubmit() {
      // Passe `submitted` à true pour afficher les informations
      this.submitted = true;
    },
  },
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.container{
  max-width: 400px; 
  margin: 0 auto; 
  padding: 20px; 
  border: 1px solid #dfdada; 
  border-radius: 10px; 
  background-color: #e0e8df; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form{
  margin-bottom: 15px;
}

.form label{
  display: block; 
  margin-bottom: 5px; 
  font-weight: bold;
}

.btn { 
  display: inline-block; 
  padding: 10px 20px; 
  font-size: 16px; 
  color: #e9e4e4; 
  background-color: #9dc9ac; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer; }

  .submitted-message { 
    margin-top: 20px; 
    padding: 10px; 
    background-color: #ecf0ec; 
    border: 1px solid #090909; 
    border-radius: 5px; 
    color: #181818; }

</style>
