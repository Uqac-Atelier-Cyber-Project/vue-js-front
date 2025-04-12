<template>
    <div class="container">
        <!-- Barre de navigation -->
        <nav class="navbar">
            <div class="logo">
                <img src="../assets/logo.png" alt="Logo" class="logo-img" />
            </div>
            <div class="icons">
                <button @click="logout" class="logout-btn">
                    <img src="../assets/deco.png" alt="Logo" class="logout-btn-img" />
                </button>
                <div class="notification-wrapper">
                    <span @click="toggleNotifications" class="icon notification-icon">🔔</span>
                    <span v-if="notifications.length" class="notification-badge">{{ notifications.length }}</span>
                </div>
                <span @click="profile" class="icon">👤</span>
            </div>
        </nav>

        <!-- Notifications -->
        <div v-if="showNotifications" class="notifications">
            <div v-for="(notification, index) in notifications" :key="index" class="notification-item"
                @click="handleNotificationClick(index)">
                {{ notification }}
            </div>
        </div>

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

<script>
export default {
    name: 'HomeComponent',
    data() {
        return {
            userID: this.$route.query.userID,
            showNotifications: false,
            notifications: this.$route.query.notification || [],
            intervalId: null,
            api_url: window.__ENV__?.API_URL || 'http://localhost:3000/api'
        };
    },
    mounted() {
        this.fetchNotifications();
        // Démarrer la vérification périodique des notifications
        this.startNotificationCheck();
    },
    beforeUnmount() {
        // Arrêter la vérification périodique lorsque le composant est détruit
        this.stopNotificationCheck();
    },
    methods: {
        async fetchNotifications() {
            try {
                const response = await fetch(`${this.api_url}/report/report-available`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: this.userID
                    })
                });
                const data = await response.json();
                this.notifications = data;
            } catch (error) {
                console.error('Erreur lors de la récupération des notifications:', error);
            }
        },
        startNotificationCheck() {
            this.intervalId = setInterval(this.fetchNotifications, 5000); // Vérifie toutes les 5 secondes
            console.log('Vérification des notifications démarrée');
        },
        stopNotificationCheck() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
        },
        toggleNotifications() {
            this.showNotifications = !this.showNotifications;
        },
        handleNotificationClick() {
            console.log('Redirection vers History via Notification');
            this.$router.push({ path: '/history', query: { userID: this.userID } });
        },
        goToAnalyse() {
            console.log('Redirection vers Analyse');
            this.$router.push({ path: '/analyse', query: { userID: this.userID } });
        },
        goToReportHistory() {
            console.log('Redirection vers Report History');
            this.$router.push({ path: '/history', query: { userID: this.userID } });
        },
        logout() {
            console.log('Déconnexion');
            this.$router.push({ path: '/' });
        },
        profile() {
            console.log('Profile');
            this.$router.push({ path: '/profile', query: { userID: this.userID } });
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
    /* Utiliser toute la hauteur de la vue */
    background: linear-gradient(135deg, #ffffff, #bebebe);
    /* Dégradé blanc plus subtil */
    position: relative;
    /* Pour positionner les notifications */
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

.logout-btn {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
}

.logout-btn:hover {
    opacity: 0.7;
    transform: scale(1.05);
}

.logout-btn-img {
    height: 40px;
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
    transform: scale(1.05);
}

.notification-wrapper {
    position: relative;
}

.notification-badge {
    position: absolute;
    top: -10px;
    right: -10px;
    background: red;
    color: white;
    border-radius: 50%;
    padding: 0 5px;
    font-size: 12px;
    font-weight: bold;
}

/* Notifications */
.notifications {
    position: absolute;
    top: 75px;
    /* Ajustez selon la hauteur de votre barre de navigation */
    right: 20px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    width: 300px;
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
    padding: 10px;
}

.notification-item {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    cursor: pointer;
}

.notification-item:hover {
    background: #f0f0f0;
}

.notification-item:last-child {
    border-bottom: none;
}

/* Contenu principal */
.content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px;
    /* Plus d'espace entre les cartes */
    padding: 60px;
    /* Plus de padding pour le contenu */
}

/* Cartes */
.card {
    width: 300px;
    /* Cartes plus larges */
    height: 300px;
    /* Cartes plus hautes */
    background: #252525;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    /* Coins plus arrondis */
    cursor: pointer;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    /* Ombre plus prononcée */
    transition: transform 0.3s, background 0.3s;
}

.card:hover {
    background: #444;
    transform: scale(1.05);
    /* Effet de zoom */
}

.card .icon {
    font-size: 60px;
    /* Icônes des cartes plus grandes */
    color: #fff;
}

p {
    font-size: 22px;
    /* Texte des cartes plus grand */
    margin-top: 15px;
    color: #fff;
}
</style>
