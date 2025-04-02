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
                <span @click="goBack" class="icon">↩️</span>
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
                    <li v-for="(connection, index) in connectionHistory.loginHistories" :key="index">
                        {{ formatConnection(connection) }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProfileComponent',
    data() {
        return {
            userID: this.$route.query.userID,
            showNotifications: false,
            notifications: this.notification || [],
            user: {
                email: '',
                password: ''
            },
            confirmPassword: '',
            connectionHistory: [],
            intervalId: null,
            api_url: process.env.VUE_APP_API
        };
    },
    mounted() {
        this.fetchNotifications();
        // Démarrer la vérification périodique des notifications
        this.startNotificationCheck();
        // Récupérer l'historique de connexion et l'email du client au montage du composant
        this.fetchConnectionHistory();
        this.fetchUserData();
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
            this.intervalId = setInterval(this.fetchNotifications, 5000);
        },
        stopNotificationCheck() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
        },


        // Récupération de l'historique de connexion
        async fetchConnectionHistory() {
            try {
                const response = await fetch(`${this.api_url}/auth/connectionHistory`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user: this.userID
                    })
                });
                const data = await response.json();
                this.connectionHistory = data;
                console.log(this.connectionHistory)
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'historique de connexion:', error);
            }
        },

        formatConnection(connection) {
            console.log(connection)
            const dateObj = new Date(connection.loginTime);
            const formattedDate = dateObj.toLocaleDateString('fr-FR');
            const formattedTime = dateObj.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }); // Format: 19:29

            return `Connexion le ${formattedDate} à ${formattedTime} sur ${connection.platform}.`;
        },


        // Récupération du mail de l'utilisateur
        async fetchUserData() {
            try {
                const response = await fetch(`${this.api_url}/auth/userData`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: this.userID
                    })
                });
                const data = await response.json();
                this.user.email = data.email;
            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur:', error);
            }
        },

        // Update des données d'utilisateur
        async updateProfile() {
            if (this.user.password !== this.confirmPassword) {
                alert("Les mots de passe ne correspondent pas.");
                return;
            }
            try {
                const response = await fetch(`${this.api_url}/auth/updateProfile`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: this.userID,
                        email: this.user.email,
                        password: this.user.password
                    })
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Erreur lors de la mise à jour du profil');
                }
                console.log('Profil mis à jour:', data);
            } catch (error) {
                console.error('Erreur lors de la mise à jour du profil:', error);
            }
        },

        toggleNotifications() {
            this.showNotifications = !this.showNotifications;
        },

        handleNotificationClick() {
            console.log('Redirection vers History via Notification');
            this.$router.push({ path: '/history', query: { userID: this.userID} });
        },
        logout() {
            console.log('Déconnexion');
            this.$router.push('/');
        },
        goBack() {
            console.log('Home');
            this.$router.push({ path: '/home', query: { userID: this.userID} });
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
    height: 100%;
    min-height: 98vh;
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
    transition: background 0.3s;
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
