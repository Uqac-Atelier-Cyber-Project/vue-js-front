<template>
    <div class="container">
      <!-- Barre de navigation -->
      <nav class="navbar">
        <div class="logo">🖥️ OPIB</div>
        <div class="icons">
          <span class="icon">🔔</span>
          <span class="icon">👤</span>
          <button @click="logout" class="logout-btn">Déconnexion</button>
        </div>
      </nav>
  
      <!-- Contenu principal -->
      <div class="content">
        <div class="card" @click="goToAnalyse">
          <span class="icon">🔍</span>
          <p>Analyse</p>
        </div>
        <div class="card" @click="goToReportHistory">
          <span class="icon">📄</span>
          <p>Report History</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const goToAnalyse = () => {
    console.log('Redirection vers Analyse');
    router.push('/analyse');
  };
  
  const goToReportHistory = () => {
    console.log('Redirection vers Report History');
    // router.push('/report-history');
  };
  
  const logout = () => {
    console.log('Déconnexion');
    router.push('/'); // Remplacez '/' par le chemin de votre page d'accueil
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
  
  .logout-btn {
    background: #000;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 10px 20px;
    cursor: pointer;
    transition: 0.3s;
  }
  
  .logout-btn:hover {
    background: #333;
  }
  
  /* Contenu principal */
  .content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    padding: 40px;
  }
  
  /* Cartes */
  .card {
    width: 250px;
    height: 250px;
    background: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }
  
  .card:hover {
    background: #333;
  }
  
  .card .icon {
    font-size: 50px;
    color: #fff;
  }
  
  p {
    font-size: 18px;
    margin-top: 10px;
    color: #fff;
  }
  </style>
  