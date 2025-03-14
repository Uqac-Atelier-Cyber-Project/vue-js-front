<template>
    <div class="container">
        <!-- Barre de navigation -->
        <nav class="navbar">
            <div class="logo">
                <img src="../assets/logo.png" alt="Logo" class="logo-img" />
            </div>
            <div class="icons">
                <span @click="goBack" class="icon">↩️</span>
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
            <!-- Sidebar : Liste des rapports -->
            <div class="history">
                <h2>Historique des rapports</h2>
                <ul>
                    <li v-for="(rapport, index) in rapports" :key="index" @click="selectRapport(rapport)"
                        :class="{ active: selectedRapport === rapport }">
                        {{ rapport }}
                    </li>
                </ul>
            </div>

            <!-- PDF Viewer -->
            <div class="pdf-viewer">
                <iframe v-if="selectedRapport" :src="pdfPath" width="100%" height="100%"></iframe>
                <p v-else>Veuillez sélectionner un rapport</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HistoryComponent',
    data() {
        return {
            userID: this.$route.query.userID,
            rapports: [],
            selectedRapport: null,
            pdfPath: "",
            notifications: this.$route.query.notification || [],
            showNotifications: false,
            intervalId: null,
            api_url: 'http://192.168.2.111:8090'
        };
    },
    mounted() {
        // Démarrer la vérification périodique des notifications
        this.fetchNotifications();
        this.startNotificationCheck();
        // Récupérer la liste des rapports PDF au montage du composant
        this.fetchRapports();
    },
    beforeUnmount() {
        // Arrêter la vérification périodique lorsque le composant est détruit
        this.stopNotificationCheck();
    },
    methods: {
        /*async fetchRapports() {
            try {
                const response = await fetch(`${this.api_url}/rapports`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userID: this.userID
                    })
                });
                const data = await response.json();
                this.rapports = data;
            } catch (error) {
                console.error('Erreur lors de la récupération des rapports:', error);
            }
        },*/

        //Simuler la récupération des rapports
        fetchRapports() {
            this.rapports = ["Questions.pdf", "25_02_2025.pdf",];
        },


        /*async fetchNotifications() {
            try {
                const response = await fetch(`${this.api_url}/notifications`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userID: this.userID
                    })
                });
                const data = await response.json();
                this.notifications = data;
            } catch (error) {
                console.error('Erreur lors de la récupération des notifications:', error);
            }
        },*/

        //Simuler la récupération des notifications
        fetchNotifications() {
            this.notifications = ['Notification 1', 'Notification 2', 'Notification 3'];
        },

        startNotificationCheck() {
            this.intervalId = setInterval(this.fetchNotifications, 5000);
        },
        stopNotificationCheck() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
        },
        toggleNotifications() {
            this.showNotifications = !this.showNotifications;
        },

        async selectRapport(rapport) {
            this.selectedRapport = rapport;
            this.pdfPath = `/pdf/${rapport}`; // Assurez-vous que les fichiers PDF sont dans "public/pdfs/"

            // Envoyer une notification au serveur indiquant que le PDF a été lu
            try {
                await fetch(`${this.api_url}/report-read`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userID: this.userID,
                        report: rapport
                    })
                });
            } catch (error) {
                console.error('Erreur lors de l\'envoi de la notification de lecture:', error);
            }
        },

        goBack() {
            console.log('Home');
            this.$router.push({ path: '/home', query: { userID: this.userID } });
        },
        profile() {
            console.log('Profile');
            this.$router.push({ path: '/profile', query: { userID: this.userID } });
        },
        handleNotificationClick() {
            console.log('Supprimer la notification');
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
    min-height: 98vh;
    height: 100%;
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
    color: #333;
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
    padding: 20px;
    /* Plus de padding pour le contenu */
}

/* Sidebar : Liste des rapports */
.history {
    width: 25%;
    background: #fff;
    border-right: 3px solid #ccc;
    /* Bordure plus épaisse */
    padding: 30px;
    /* Plus de padding */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    /* Ombre plus prononcée */
    overflow-y: auto;
}

.history h2 {
    text-align: center;
    font-size: 24px;
    /* Augmenter la taille de la police */
}

.history ul {
    list-style: none;
    padding: 0;
}

.history li {
    padding: 15px;
    /* Plus de padding */
    cursor: pointer;
    border-bottom: 2px solid #f0f0f0;
    /* Bordure plus épaisse */
    font-size: 20px;
    /* Augmenter la taille de la police */
    transition: background 0.3s;
}

.history li:hover,
.history .active {
    background: #ddd;
}

/* PDF Viewer */
.pdf-viewer {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: #f9f9f9;
    border-left: 3px solid #ccc;
    /* Bordure plus épaisse */
}

.pdf-viewer h2 {
    font-size: 24px;
    /* Augmenter la taille de la police */
}

.pdf-viewer iframe {
    border: none;
}
</style>