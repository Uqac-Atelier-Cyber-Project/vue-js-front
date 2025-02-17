<template>
    <div class="container">
      <!-- Barre de navigation -->
      <nav class="navbar">
        <div class="logo">🖥️ OPIB</div>
        <div class="icons">
          <span class="icon">🔔</span>
          <span class="icon">👤</span>
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
  //import { useRouter } from 'vue-router';
  
  //const router = useRouter();
  
  const goToAnalyse = () => {
    console.log('Redirection vers Analyse');
    // router.push('/analyse');
  };
  
  const goToReportHistory = () => {
    console.log('Redirection vers Report History');
    // router.push('/report-history');
  };
  </script>
  
  <style scoped>
  /* Conteneur principal */
  .container {
    width: 100vw;
    height: 98vh;
    display: flex;
    flex-direction: column;
    background: white;
  }
  
  /* Barre de navigation */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 2px solid black;
    background: white;
  }
  
  .logo {
    font-size: 18px;
    font-weight: bold;
  }
  
  .icons {
    display: flex;
    gap: 15px;
  }
  
  .icon {
    font-size: 22px;
    cursor: pointer;
  }
  
  /* Contenu principal */
  .content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    background: #ddd;
    padding: 40px;
  }
  
  /* Cartes */
  .card {
    width: 250px;
    height: 250px;
    background: #bbb;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }
  
  .card:hover {
    background: #999;
  }
  
  .card .icon {
    font-size: 50px;
  }
  
  p {
    font-size: 18px;
    margin-top: 10px;
    color: black;
  }
  </style>
  