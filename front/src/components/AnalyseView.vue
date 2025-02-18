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
            <div v-for="(option, index) in options" :key="index" class="option">
                <label>
                    <input type="checkbox" v-model="selectedOptions" :value="option.name" class="option-txt"/>
                    {{ option.label }}
                </label>
                <div v-if="selectedOptions.includes(option.name)" class="details">
                    <label>IP : <input type="text" v-model="option.ip" placeholder="Entrez l'IP" /></label>
                    <label>Port : <input type="number" v-model="option.port" placeholder="Entrez le port" /></label>
                </div>
            </div>
        </div>
        <div class="button">
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
    height: 98vh; /* Utiliser toute la hauteur de la vue */
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
    flex-direction: row;
    justify-content: flex-start; /* Aligner les éléments au début */
    align-items: center;
    gap: 40px; /* Plus d'espace entre les éléments */
    padding: 80px; /* Plus de padding pour le contenu */
}

/* Options */
.option {
    width: 400px; /* Éléments plus larges */
    background: #333;
    color: #fff;
    padding: 30px; /* Plus de padding */
    border-radius: 15px; /* Coins plus arrondis */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    cursor: pointer;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3); /* Ombre plus prononcée */
    transition: transform 0.3s, background 0.3s;
}

.option-txt {
    margin-right: 15px; /* Espace entre la case à cocher et le texte */
}

.option:hover {
    background: #444;
    transform: scale(1.05); /* Effet de zoom */
}

/* Style des cases à cocher */
.option input[type="checkbox"] {
    appearance: none; /* Supprimer le style par défaut */
    width: 25px; /* Taille plus grande */
    height: 25px;
    border: 3px solid #fff; /* Bordure blanche */
    border-radius: 5px; /* Coins arrondis */
    background: #555; /* Couleur de fond */
    transition: background 0.3s, border 0.3s;
    cursor: pointer;
    margin-bottom: 10px; /* Espace en dessous de la case à cocher */
    position: relative; /* Ajout pour positionner la coche */
}

.option input[type="checkbox"]:checked {
    background: #007BFF; /* Couleur de fond lorsque coché */
    border-color: #005BB5; /* Couleur de la bordure lorsque coché */
}

.option input[type="checkbox"]::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 15px;
    height: 10px;
    border: solid #fff;
    border-width: 0 3px 3px 0;
    transform: translate(-50%, -50%) rotate(45deg);
    opacity: 0;
    transition: opacity 0.3s;
}

.option input[type="checkbox"]:checked::after {
    opacity: 1; /* Afficher le signe de coche lorsque coché */
}

.option label {
    font-size: 24px; /* Augmenter la taille de la police */
    margin-top: 10px; /* Espace au-dessus du texte */
    display: flex;
    align-items: center; /* Centrer verticalement le texte avec la case à cocher */
}

.details {
    display: flex;
    flex-direction: column;
    background: #fff;
    color: #000;
    width: 100%;
    padding: 20px; /* Plus de padding */
    border-radius: 15px;
    margin-top: 15px; /* Plus d'espace au-dessus des détails */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Ombre pour les détails */
}

.details label {
    font-size: 18px; /* Taille de la police des étiquettes */
    margin-bottom: 10px; /* Espace en dessous des étiquettes */
}

/* Bouton OK */
.button {
    display: flex;
    justify-content: center; /* Centrer le bouton horizontalement */
    align-items: center; /* Centrer le bouton verticalement */
}

.btn {
    width: 200px; /* Bouton plus large */
    padding: 20px 40px; /* Plus de padding */
    background: #333;
    color: #fff;
    font-size: 24px; /* Augmenter la taille de la police du bouton */
    font-weight: bold;
    border: none;
    border-radius: 10px; /* Coins plus arrondis */
    cursor: pointer;
    transition: background 0.3s, transform 0.3s;
    margin-bottom: 200px;
}

.btn:hover {
    background: #444;
    transform: scale(1.05); /* Effet de zoom */
}
</style>
