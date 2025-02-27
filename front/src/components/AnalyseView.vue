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
            <div v-for="(option, index) in options" :key="index" class="option">
                <label>
                    <input type="checkbox" v-model="selectedOptions" :value="option.name" class="option-txt" />
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
    name: 'AnalyseComponent',
    data() {
        return {
            userID: this.$route.query.userID,
            options: [
                { name: 'bruteForceWifi', label: 'Brute Force Wifi', ip: '', port: '' },
                { name: 'bruteForceSSH', label: 'Brute Force SSH', ip: '', port: '' },
                { name: 'scanPort', label: 'Scan de port', ip: '', port: '' },
                { name: 'detectionCVE', label: 'Détection CVE', ip: '', port: '' }
            ],
            selectedOptions: [],
            showNotifications: false,
            notifications: this.$route.query.notification || [],
            intervalId: null,
            api_url: process.env.VUE_APP_API_URL
        };
    },
    mounted() {
        // Démarrer la vérification périodique des notifications
        this.startNotificationCheck();
    },
    beforeUnmount() {
        // Arrêter la vérification périodique lorsque le composant est détruit
        this.stopNotificationCheck();
    },
    methods: {
        /*async fetchNotifications() {
            try {
                const response = await fetch(`${this.api_url}/notifications`, {
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

        // Simuler la récupération des notifications
        fetchNotifications() {
            this.notifications = ['Notification 1', 'Notification 2', 'Notification 3'];
        },

        startNotificationCheck() {
            this.intervalId = setInterval(this.fetchNotifications, 30000); // Vérifie toutes les 30 secondes
        },
        stopNotificationCheck() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
        },

        async submit() {
            const selectedData = this.options
                .filter(opt => this.selectedOptions.includes(opt.name))
                .map(opt => ({
                    name: opt.name,
                    ip: opt.ip,
                    port: opt.port
                }));

            console.log('Données envoyées:', selectedData);

            try {
                const response = await fetch(`${this.api_url}/submit-options`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(selectedData)
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de l\'envoi des options sélectionnées');
                }

                console.log('Options envoyées avec succès');
            } catch (error) {
                console.error('Erreur lors de l\'envoi des options sélectionnées:', error);
            }
        },
        goBack() {
            console.log('Home');
            this.$router.push({ path: '/home', query: { userID: this.userID, notification: this.notifications } });
        },
        profile() {
            console.log('Profile');
            this.$router.push({ path: '/profile', query: { userID: this.userID, notification: this.notifications } });
        },
        toggleNotifications() {
            this.showNotifications = !this.showNotifications;
        },
        handleNotificationClick() {
            console.log('Redirection vers History via Notification');
            this.$router.push({ path: '/history', query: { userID: this.userID, notification: this.notifications } });
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
    flex-direction: row;
    justify-content: flex-start;
    /* Aligner les éléments au début */
    align-items: center;
    gap: 40px;
    /* Plus d'espace entre les éléments */
    padding: 80px;
    /* Plus de padding pour le contenu */
}

/* Options */
.option {
    width: 400px;
    /* Éléments plus larges */
    background: #252525;
    color: #fff;
    padding: 30px;
    /* Plus de padding */
    border-radius: 15px;
    /* Coins plus arrondis */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    cursor: pointer;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    /* Ombre plus prononcée */
    transition: transform 0.3s, background 0.3s;
}

.option-txt {
    margin-right: 15px;
    /* Espace entre la case à cocher et le texte */
}

.option:hover {
    background: #444;
    transform: scale(1.05);
    /* Effet de zoom */
}

/* Style des cases à cocher */
.option input[type="checkbox"] {
    appearance: none;
    /* Supprimer le style par défaut */
    width: 25px;
    /* Taille plus grande */
    height: 25px;
    border: 3px solid #fff;
    /* Bordure blanche */
    border-radius: 5px;
    /* Coins arrondis */
    background: #555;
    /* Couleur de fond */
    transition: background 0.3s, border 0.3s;
    cursor: pointer;
    margin-bottom: 10px;
    /* Espace en dessous de la case à cocher */
    position: relative;
    /* Ajout pour positionner la coche */
}

.option input[type="checkbox"]:checked {
    background: #007BFF;
    /* Couleur de fond lorsque coché */
    border-color: #005BB5;
    /* Couleur de la bordure lorsque coché */
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
    opacity: 1;
    /* Afficher le signe de coche lorsque coché */
}

.option label {
    font-size: 24px;
    /* Augmenter la taille de la police */
    margin-top: 10px;
    /* Espace au-dessus du texte */
    display: flex;
    align-items: center;
    /* Centrer verticalement le texte avec la case à cocher */
}

.details {
    display: flex;
    flex-direction: column;
    background: #fff;
    color: #000;
    width: 100%;
    padding: 20px;
    /* Plus de padding */
    border-radius: 15px;
    margin-top: 15px;
    /* Plus d'espace au-dessus des détails */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    /* Ombre pour les détails */
}

.details label {
    font-size: 18px;
    /* Taille de la police des étiquettes */
    margin-bottom: 10px;
    /* Espace en dessous des étiquettes */
}

/* Bouton OK */
.button {
    display: flex;
    justify-content: center;
    /* Centrer le bouton horizontalement */
    align-items: center;
    /* Centrer le bouton verticalement */
}

.btn {
    width: 200px;
    /* Bouton plus large */
    padding: 20px 40px;
    /* Plus de padding */
    background: #252525;
    color: #fff;
    font-size: 24px;
    /* Augmenter la taille de la police du bouton */
    font-weight: bold;
    border: none;
    border-radius: 10px;
    /* Coins plus arrondis */
    cursor: pointer;
    transition: background 0.3s, transform 0.3s;
    margin-bottom: 200px;
}

.btn:hover {
    background: #444;
    transform: scale(1.05);
    /* Effet de zoom */
}
</style>