<template>
  <div class="container">
    <div class="card">
      <h2>Connexion</h2>
      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Mot de passe" required />
        <button type="submit">Connexion</button>
      </form>
      <p>
        Vous n'avez pas encore de compte ?
        <router-link to="/register">Inscrivez-vous</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();


const email = ref('');
const password = ref('');

const login = () => {
  console.log('Tentative de connexion avec', email.value, password.value);
  router.push('/home');
};
</script>

<style scoped>
/* Styles généraux */
* {
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

/* Conteneur principal */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 98vh;
  background: linear-gradient(135deg, #000, #272727);
  /* Dégradé noir */
}

/* Carte de connexion */
.card {
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2);
  text-align: center;
  width: 400px;
}

h2 {
  margin-bottom: 20px;
  color: #000;
}

/* Champs de saisie */
input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 2px solid #000;
  border-radius: 6px;
  font-size: 16px;
}

/* Bouton */
button {
  width: 100%;
  padding: 12px;
  background: #000;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #444;
}

/* Lien vers l'inscription */
p {
  margin-top: 15px;
}

router-link {
  color: #000;
  font-weight: bold;
  text-decoration: none;
}

router-link:hover {
  text-decoration: underline;
}
</style>