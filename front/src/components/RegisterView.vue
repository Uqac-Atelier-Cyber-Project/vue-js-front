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
      <p>
        Vous avez déjà un compte ?
        <router-link to="/">Connectez-vous</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterComponent',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      userID: '',
      api_url: process.env.VUE_APP_API_URL
    };
  },
  methods: {
    async register() {
      try {
        if (this.password !== this.confirmPassword) {
          alert('Les mots de passe ne correspondent pas');
          return;
        }

        console.log('Inscription en cours...');
        console.log(this.email);

        /*const response = await fetch(`${this.api_url}/users/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          alert(`Erreur : ${data.message || 'Une erreur est survenue'}`);
          throw new Error(data.message || 'Une erreur est survenue');
        }

        this.userID = data.userId;
        console.log('Inscription réussie:', data);*/
        this.$router.push({ path: '/home', query: { userID: this.userID } });
      } catch (error) {
        alert(`Erreur : ${error.message}`);
        console.error('Erreur lors de l\'inscription:', error.message);
      }
    }
  }
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
  background: linear-gradient(-135deg, #000, #272727);
  /* Même fond que la page de connexion */
}

/* Carte d'inscription */
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

/* Bouton principal */
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

/* Lien vers la connexion */
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