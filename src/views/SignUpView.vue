<!-- <template>
    <div class="signup-view">
      <h1>Inscription</h1>
      <input v-model="email" placeholder="Email" />
      <input v-model="password" placeholder="Mot de passe" type="password" />
      <button @click="signUp">S'inscrire</button>
    </div>
  </template>
  
  <script>
  import { auth, createUserWithEmailAndPassword } from "../firebase";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      async signUp() {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
          console.log("Utilisateur créé :", userCredential.user);
          alert("Inscription réussie !");
          this.$router.push("/login"); // Redirige vers la page de connexion après inscription
        } catch (error) {
          console.error("Erreur d'inscription :", error.message);
          alert("Erreur : " + error.message); // Affiche un message d'erreur à l'utilisateur
        }
      },
    },
  };
  </script>
  
  <style>
  .signup-view {
    margin: 20px;
  }
  input {
    display: block;
    margin: 10px 0;
    padding: 8px;
    width: 300px;
  }
  button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #45a049;
  }
  </style> -->
  


  <template>
    <div class="form-container">
      <h2>Create an Account</h2>
      <form @submit.prevent="signup">
        <input type="text" v-model="firstName" placeholder="First name" required />
        <input type="text" v-model="lastName" placeholder="Last name" required />
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="date" v-model="dob" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <input type="password" v-model="confirmPassword" placeholder="Confirm password" required />
        <!-- <div> -->
          <label  for="role">Rôle:</label>
           <select class="role" v-model="role" required>
            <option value="etudiant">Étudiant</option>
             <option value="enseignant">Enseignant</option>
              <option value="admin">Admin</option> </select>
        <!-- </div> -->
        <button type="submit">Create an account</button>
      </form>
      <p>
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </template>
  
  <script>
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import { db} from '../firebase'
  import { doc, setDoc } from "firebase/firestore";
  
  export default {
    data() {
      return {
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        password: "",
        confirmPassword: "",
        role: "etudiant"
      };
    },
    methods: {
      async signup() {

        if (this.password !== this.confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        const auth = getAuth();
        // const firestore = getFirestore();
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, this.email , this.password);
            // Récupération de l'UID de l'utilisateur
            if (userCredential && userCredential.user) {
            const uid = userCredential.user.uid;
          await setDoc(doc(db, "users", uid), {
            // await db.collection('users').doc(uid).set({
              firstName: this.firstName,
              lastName:this.lastName,
              email: this.email,
              dob: this.dob,
              role: this.role
          });
        }

          alert("Compte créé avec succès");

                  // Redirection basée sur le rôle
        switch (this.role) {
          case "etudiant":
            this.$router.push("/student");
            break;
          case "enseignant":
            this.$router.push("/teacher");
            break;
          case "admin":
            this.$router.push("/admin");
            break;
          default:
            this.$router.push("/");
        }

        } catch (error) {
          // gestion des erreurs 
          console.error("Error during sign up :", error);
          alert("Error: " + error.message);
        }
      },
    },
  };
  </script>
  

  <style>
/* CSS pour Signup */
.form-container {
  max-width: 500px;
  width: 100%;
  margin: auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9); /* Fond semi-transparent */
  border-radius: 15px; /* Coins arrondis */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Ombre */
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin: 10px 0;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: box-shadow 0.3s ease;
}

.role{
  margin: 10px 0;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: box-shadow 0.3s ease;
}

input:focus {
  box-shadow: 0 0 8px rgba(40, 167, 69, 0.5); /* Effet focus */
  border-color: #28a745;
  outline: none;
}

button {
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #218838;
}

a {
  text-decoration: none;
  color: #28a745;
}

a:hover {
  text-decoration: underline;
}

p {
  margin-top: 15px;
}
</style>
