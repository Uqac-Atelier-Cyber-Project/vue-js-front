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
                <button @click="logout" class="logout-btn">Déconnexion</button>
            </div>
        </nav>

        <!-- Contenu principal -->
        <div class="content">
            <!-- Section Profil -->
            <div class="profile-section">
                <h2>Profil</h2>
                <form @submit.prevent="updateProfile">
                    <label for="email">Email :</label>
                    <input type="email" id="email" v-model="user.email" required />

                    <label for="password">Mot de passe :</label>
                    <input type="password" id="password" v-model="user.password" required />

                    <label for="confirmPassword">Confirmer le mot de passe :</label>
                    <input type="password" id="confirmPassword" v-model="confirmPassword" required />

                    <button type="submit" class="btn">Mettre à jour</button>
                </form>
            </div>

            <!-- Section Historique de Connexion -->
            <div class="history-section">
                <h2>Historique de Connexion</h2>
                <ul>
                    <li v-for="(connection, index) in connectionHistory" :key="index">
                        {{ formatConnection(connection) }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const user = ref({
    email: 'user@example.com',
    password: ''
});

const confirmPassword = ref('');

const connectionHistory = ref([
    { date: '2023-10-01', time: '14:30', device: 'Firefox for Linux' },
    { date: '2023-09-25', time: '10:15', device: 'Chrome for Android' },
    { date: '2023-09-20', time: '08:45', device: 'Safari for iOS' },
    { date: '2023-09-15', time: '16:20', device: 'Edge for Windows' },
    { date: '2023-09-10', time: '12:00', device: 'Chrome for Windows' },
    { date: '2023-09-05', time: '09:30', device: 'Firefox for Linux' },
    { date: '2023-08-30', time: '15:10', device: 'Chrome for Android' },
    { date: '2023-08-25', time: '11:45', device: 'Safari for iOS' },
    { date: '2023-08-20', time: '17:30', device: 'Edge for Windows' },
    { date: '2023-08-15', time: '13:20', device: 'Chrome for Windows' }
]);

const updateProfile = () => {
    if (user.value.password !== confirmPassword.value) {
        alert("Les mots de passe ne correspondent pas.");
        return;
    }
    console.log('Profil mis à jour:', user.value);
    // Ajoutez ici la logique pour mettre à jour le profil dans votre backend
};

const formatConnection = (connection) => {
    return `Connexion le ${connection.date} à ${connection.time} via ${connection.device}.`;
};

const logout = () => {
    console.log('Déconnexion');
    router.push('/'); // Remplacez '/' par le chemin de votre page d'accueil
};

const goBack = () => {
    router.push('/home'); // Remplacez '/home' par le chemin de votre page d'accueil
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
    height: 100%;
    min-height: 98vh;
    /* Utiliser toute la hauteur de la vue */
    background: linear-gradient(135deg, #ffffff, #bebebe);
    /* Dégradé blanc plus subtil */
}

/* Barre de navigation */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 25px;
    /* Plus d'espace pour la barre de navigation */
    border-bottom: 3px solid #ccc;
    /* Bordure plus épaisse */
    background: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    /* Ombre légère */
}

.logo {
    display: flex;
    align-items: center;
}

.logo-img {
    height: 50px;
    /* Ajustez la hauteur selon vos besoins */
    width: auto;
}

.icons {
    display: flex;
    gap: 20px;
    /* Plus d'espace entre les icônes */
    align-items: center;
}

.icon {
    font-size: 34px;
    /* Icônes plus grandes */
    cursor: pointer;
    color: #252525;
    transition: color 0.3s;
}

.icon:hover {
    color: #000;
    opacity: 0.7;
}

.logout-btn {
    background: #252525;
    color: #fff;
    border: none;
    border-radius: 8px;
    /* Coins plus arrondis */
    padding: 10px 20px;
    cursor: pointer;
    transition: background 0.3s, transform 0.3s;
}

.logout-btn:hover {
    background: #444;
    transform: scale(1.05);
    /* Effet de zoom */
}

/* Contenu principal */
.content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    /* Plus d'espace entre les éléments */
    padding: 20px;
    /* Plus de padding pour le contenu */
}

/* Section Profil */
.profile-section {
    width: 60%;
    background: #fff;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    /* Ombre plus prononcée */
    text-align: center;
}

.profile-section h2 {
    font-size: 28px;
    /* Augmenter la taille de la police */
    margin-bottom: 20px;
}

.profile-section label {
    display: block;
    margin: 15px 0 5px;
    font-size: 18px;
}

.profile-section input {
    width: 100%;
    padding: 10px;
    font-size: 18px;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.profile-section .btn {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 18px;
}

/* Section Historique de Connexion */
.history-section {
    width: 60%;
    background: #fff;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    /* Ombre plus prononcée */
}

.history-section h2 {
    font-size: 28px;
    /* Augmenter la taille de la police */
    text-align: center;
    margin-bottom: 20px;
}

.history-section ul {
    list-style: none;
    padding: 0;
}

.history-section li {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    font-size: 18px;
}
</style>
