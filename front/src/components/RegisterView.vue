<template>
    <div class="container">
      <div class="card">
        <h2>Inscription</h2>
        <form @submit.prevent="register">
          <input type="email" v-model="email" placeholder="Email" required />
          <input type="password" v-model="password" placeholder="Mot de passe" required />
          <input type="password" v-model="confirmPassword" placeholder="Confirmer le mot de passe" required />
          <button type="submit">S'inscrire</button>
        </form>
        <button class="back-btn" @click="goBack">Retour à la connexion</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const router = useRouter();
  
  const register = () => {
    if (password.value !== confirmPassword.value) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    console.log('Inscription avec', email.value);
  };
  
  const goBack = () => {
    router.push('/');
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
    background: linear-gradient(135deg, #fff, #ddd); /* Dégradé blanc */
  }
  
  /* Carte d'inscription */
  .card {
    background: #000;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 400px;
  }
  
  h2 {
    margin-bottom: 20px;
    color: #fff;
  }
  
  /* Champs de saisie */
  input {
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: 2px solid #fff;
    border-radius: 6px;
    font-size: 16px;
    background: transparent;
    color: #fff;
  }
  
  input::placeholder {
    color: #ccc;
  }
  
  /* Bouton principal */
  button {
    width: 100%;
    padding: 12px;
    background: #fff;
    color: #000;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s;
  }
  
  button:hover {
    background: #ddd;
  }
  
  /* Bouton retour */
  .back-btn {
    background: transparent;
    border: 2px solid #fff;
    color: #fff;
    margin-top: 10px;
  }
  
  .back-btn:hover {
    background: #fff;
    color: #000;
  }
  </style>
  