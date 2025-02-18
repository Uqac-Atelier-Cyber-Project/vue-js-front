<template>
    <div class="container">
        <!-- Barre de navigation -->
        <nav class="navbar">
            <div class="logo">
                <img src="../assets/logo.png" alt="Logo" class="logo-img" />
            </div>
            <div class="icons">
                <span @click="goBack" class="icon">↩️</span>
                <span class="icon">🔔</span>
                <span class="icon">👤</span>
            </div>
        </nav>

        <!-- Contenu principal -->
        <div class="content">
            <!-- Historique d'analyse -->
            <div class="history">
                <div v-for="(report, index) in reports" :key="index" class="report-item"
                    @click="openReport(report.pdfUrl)">
                    <p>{{ report.title }}</p>
                </div>
            </div>

            <!-- Affichage du PDF -->
            <div class="pdf-viewer">
                <canvas ref="pdfCanvas"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goBack() {
            this.$router.push('/home');
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
    height: 100vh; /* Utiliser toute la hauteur de la vue */
    background: linear-gradient(135deg, #ffffff, #bebebe); /* Dégradé blanc plus subtil */
}

/* Barre de navigation */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px; /* Plus d'espace pour la barre de navigation */
    border-bottom: 3px solid #ccc; /* Bordure plus épaisse */
    background: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Ombre légère */
}

.logo {
    display: flex;
    align-items: center;
}

.logo-img {
    height: 60px; /* Ajustez la hauteur selon vos besoins */
    width: auto;
}

.icons {
    display: flex;
    gap: 20px; /* Plus d'espace entre les icônes */
    align-items: center;
}

.icon {
    font-size: 34px; /* Icônes plus grandes */
    cursor: pointer;
    color: #333;
    transition: color 0.3s;
}

.icon:hover {
    color: #000; 
    opacity: 0.7;
    transform: scale(1.05);
}

/* Contenu principal */
.content {
    flex: 1;
    display: flex;
    padding: 40px; /* Plus de padding pour le contenu */
}

/* Historique d'analyse */
.history {
    width: 30%;
    background: #fff;
    border-right: 3px solid #ccc; /* Bordure plus épaisse */
    padding: 30px; /* Plus de padding */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15); /* Ombre plus prononcée */
}

.report-item {
    padding: 15px; /* Plus de padding */
    border-bottom: 2px solid #f0f0f0; /* Bordure plus épaisse */
    cursor: pointer;
    transition: background 0.3s, transform 0.3s;
}

.report-item:hover {
    background: #f0f0f0;
    transform: scale(1.02); /* Effet de zoom */
}

/* Affichage du PDF */
.pdf-viewer {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px; /* Plus de padding */
}

canvas {
    border: 2px solid #333; /* Bordure plus épaisse */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Ombre pour le canvas */
}
</style>
