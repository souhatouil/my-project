<!-- <template>
    <div class="login-view">
      <h1>Connexion</h1>
      <input v-model="email" placeholder="Email" />
      <input v-model="password" placeholder="Mot de passe" type="password" />
      <button @click="login">Se connecter</button>
    </div>
  </template>
  
  <script>
  import { auth, signInWithEmailAndPassword } from "../firebase";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      async login() {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
          console.log("Connexion réussie :", userCredential.user);
          this.$router.push("/dashboard"); // Redirige vers le tableau de bord après connexion
        } catch (error) {
          console.error("Erreur de connexion :", error.message);
          alert("Erreur : " + error.message); // Affiche un message d'erreur à l'utilisateur
        }
      },
    },
  };
  </script>
  
  <style>
  .login-view {
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
  



  <!-- <template>
    <div class="form-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="Email or phone number" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <a href="#">Forgot your password?</a>
      </form>
      <p>
        Don't have an account?
        <router-link to="/signup">Create a new account</router-link>
      </p>
    </div>
  </template>
  
  <script>
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      async login() {
        const auth = getAuth();
        try {
          await signInWithEmailAndPassword(auth, this.email, this.password);
          alert("Login successful");
        } catch (error) {
          alert("Error: " + error.message);
        }
      },
    },
  };
  </script> -->





  <template>
    <div class="form-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input type="email" placeholder="enter your email" v-model="email" required />
        <input type="password" placeholder="Mot de passe" v-model="password" required />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  </template>
  
  <script>
import { auth } from '@/firebase';
// import { sign } from 'core-js/core/number';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';

  export default {
    name: "LoginView",
    data() {
      return {
        email: "",
        password: "",
        // role:'etudiant',   // Rôle par défaut
      };
    },
    methods: {
     async handleLogin() {
        try{
          const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
          alert ("connexion réussite");

        // Récupérer le rôle de l'utilisateur depuis Firestore
        const user = userCredential.user;
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

          //  this.login();

          if (docSnap.exists()) {
          const userData = docSnap.data();
          const role = userData.role;  // Récupérer le rôle de l'utilisateur depuis la base de données
        
                  // Rediriger en fonction du rôle
                  switch (role) {
            case "etudiant":
              this.$router.push("/student"); // Redirection vers l'interface étudiant
              break;
            case "enseignant":
              this.$router.push("/teacher"); // Redirection vers l'interface enseignant
              break;
            case "admin":
              this.$router.push("/admin"); // Redirection vers l'interface admin
              break;
            default:
              this.$router.push("/home"); // Redirection vers une page par défaut
          }
        } else {
          alert("Utilisateur introuvable dans la base de données.");
        }
        
        
        
        } catch (erreur) {
          alert ("erreur : " + erreur.message);
          
        }
      }
      //   // Simulez une connexion réussie et redirigez
      //   if (this.email && this.password) {
      //     this.$router.push('/home'); // Redirection vers Home
      //   } else {
      //     alert("Veuillez entrer vos informations.");
      //   }
      // },
      // login() { 
      //   if (this.role === 'etudiant') 
        
      //   { this.$router.push('/student'); 

      //   } else if (this.role === 'enseignant') { 
      //     this.$router.push('/teacher'); 
      //   } else if (this.role === 'admin') { 
      //     this.$router.push('/admin'); 
      //   }
      // }

    },
  };
  </script>
  
  <style>
  /* Reprenez le style précédent pour form-container */
  </style>
  

    <style>
/* CSS pour Login */
.form-container {
  max-width: 400px;
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

input:focus {
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5); /* Effet focus */
  border-color: #007bff;
  outline: none;
}

button {
  background-color: #007bff;
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
  background-color: #0056b3;
}

a {
  text-decoration: none;
  color: #007bff;
}

a:hover {
  text-decoration: underline;
}

p {
  margin-top: 15px;
}
</style>

  
 
  