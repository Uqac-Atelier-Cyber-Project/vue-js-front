<template>
    <div class="container">
      <!-- Barre de navigation -->
      <nav class="navbar">
        <div class="logo">🖥️ OPIB</div>
        <div class="icons">
          <span @click="goBack" class="back-btn">↩️</span>
          <span class="icon">🔔</span>
          <span class="icon">👤</span>
        </div>
      </nav>
  
      <!-- Contenu principal -->
      <div class="content">
        <div v-for="(option, index) in options" :key="index" class="option">
          <label>
            <input type="checkbox" v-model="selectedOptions" :value="option.name" />
            {{ option.label }}
          </label>
          <div v-if="selectedOptions.includes(option.name)" class="details">
            <label>IP : <input type="text" v-model="option.ip" placeholder="Entrez l'IP" /></label>
            <label>Port : <input type="number" v-model="option.port" placeholder="Entrez le port" /></label>
          </div>
        </div>
        <button @click="submit" class="btn">OK</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        options: [
          { name: 'bruteForceWifi', label: 'Brute Force Wifi', ip: '', port: '' },
          { name: 'bruteForceSSH', label: 'Brute Force SSH', ip: '', port: '' },
          { name: 'scanPort', label: 'Scan de port', ip: '', port: '' },
          { name: 'detectionCVE', label: 'Détection CVE', ip: '', port: '' }
        ],
        selectedOptions: []
      };
    },
    methods: {
      submit() {
        const selectedData = this.options.filter(opt => this.selectedOptions.includes(opt.name));
        console.log('Données envoyées:', selectedData);
      },
      goBack() {
        this.$router.push('/home'); // Remplacez '/page1' par le chemin de votre première page
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
    flex-direction: column;
    height: 98vh;
    background: linear-gradient(135deg, #fff, #f0f0f0); /* Dégradé blanc */
  }
  
  /* Barre de navigation */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 2px solid #000;
    background: #fff;
  }
  
  .logo {
    font-size: 18px;
    font-weight: bold;
    color: #000;
  }
  
  .icons {
    display: flex;
    gap: 15px;
    align-items: center;
  }
  
  .icon {
    font-size: 22px;
    cursor: pointer;
    color: #000;
  }
  

  
  .back-btn {
    display: flex;
    gap: 15px;
    align-items: center;
  }
  
  .back-btn {
    font-size: 22px;
    cursor: pointer;
    color: #000;
  }

  /* Contenu principal */
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 40px;
  }
  
  /* Options */
  .option {
    width: 250px;
    background: #000;
    color: #fff;
    padding: 15px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }
  
  .option:hover {
    background: #333;
  }
  
  .option input[type="checkbox"] {
    margin-right: 10px;
  }
  
  .details {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-left: 5px solid #000;
    padding: 10px;
    border-radius: 10px;
    margin-top: 5px;
  }
  
  .btn {
    width: 250px;
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
  
  .btn:hover {
    background: #333;
  }
  </style>
  