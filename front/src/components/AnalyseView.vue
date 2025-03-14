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
            <div v-for="(option, index) in options" :key="index" class="option"
                :class="{ 'disabled-option': isOptionDisabled(option.name), 'grayed-out': isWifiOptionGrayedOut(option.name) }">
                <label>
                    <input type="checkbox" v-model="selectedOptions" :value="option.name" class="option-txt"
                        :disabled="isOptionDisabled(option.name)" @change="handleOptionChange(option.name)" />
                    {{ option.label }}
                </label>
                <div v-if="selectedOptions.includes(option.name)" class="details">
                    <label v-if="option.essid !== undefined">ESSID : <input type="text" v-model="option.essid"
                            placeholder="Entrez l'ESSID" /></label>
                    <label v-if="option.ip !== undefined">IP : <input type="text" v-model="option.ip"
                            placeholder="Entrez l'IP" /></label>
                    <label v-if="option.port !== undefined">Port : <input type="number" v-model="option.port"
                            placeholder="Entrez le port" /></label>
                </div>
            </div>
        </div>
        <div class="button">
            <button @click="showPasswordPopup = true" class="btn">OK</button>
        </div>

        <!-- Pop-up pour le mot de passe -->
        <div v-if="showPasswordPopup" class="popup-overlay">
            <div class="popup">
                <h2>Entrez votre mot de passe</h2>
                <h4>Ce mot de passe sera celui de votre rapport</h4>
                <label>
                    Mot de passe :
                    <input type="password" v-model="password" />
                </label>
                <label>
                    Confirmation :
                    <input type="password" v-model="confirmPassword" />
                </label>
                <div class="button-container">
                    <button @click="sendData" class="btn-pop-up">OK</button>
                    <button @click="showPasswordPopup = false" class="btn-pop-up">Annuler</button>
                </div>
            </div>
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
                { name: 'bruteForceWifi', label: 'Brute Force Wifi', essid: '' },
                { name: 'bruteForceSSH', label: 'Brute Force SSH', ip: '' },
                { name: 'scanPort', label: 'Scan de port', ip: '' },
                { name: 'detectionCVE', label: 'Détection CVE', ip: '', port: '' }
            ],
            selectedOptions: [],
            showNotifications: false,
            notifications: this.$route.query.notification || [],
            intervalId: null,
            api_url: 'http://192.168.2.111:8090',
            showPasswordPopup: false,
            password: '',
            confirmPassword: ''
        };
    },
    mounted() {
        this.fetchNotifications();
        this.startNotificationCheck();
    },
    beforeUnmount() {
        this.stopNotificationCheck();
    },
    methods: {
        fetchNotifications() {
            this.notifications = ['Notification 1', 'Notification 2', 'Notification 3'];
        },
        startNotificationCheck() {
            this.intervalId = setInterval(this.fetchNotifications, 30000);
        },
        stopNotificationCheck() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
        },
        async sendData() {
            if (this.password !== this.confirmPassword) {
                alert("Les mots de passe ne correspondent pas.");
                return;
            }

            const selectedData = this.options
                .filter(opt => this.selectedOptions.includes(opt.name))
                .map(opt => {
                    const data = { name: opt.name };

                    if (opt.ip !== undefined) {
                        data.ip = opt.ip;
                    }

                    if (opt.essid !== undefined) {
                        data.essid = opt.essid;
                    }

                    if (opt.port !== undefined) {
                        data.port = opt.port;
                    }

                    return data;
                });

            console.log('Données envoyées:', selectedData);

            try {
                const response = await fetch(`${this.api_url}/report/submitOptions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: this.userID,
                        options: selectedData,
                        password: this.password
                    })
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de l\'envoi des options sélectionnées');
                }

                console.log('Options envoyées avec succès');
                this.showPasswordPopup = false;
                this.goBack();
            } catch (error) {
                console.error('Erreur lors de l\'envoi des options sélectionnées:', error);
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
        toggleNotifications() {
            this.showNotifications = !this.showNotifications;
        },
        handleNotificationClick() {
            console.log('Redirection vers History via Notification');
            this.$router.push({ path: '/history', query: { userID: this.userID } });
        },
        handleOptionChange(optionName) {
            if (optionName === 'bruteForceWifi') {
                if (this.selectedOptions.includes(optionName)) {
                    this.selectedOptions = [optionName];
                }
            } else {
                this.selectedOptions = this.selectedOptions.filter(option => option !== 'bruteForceWifi');
            }
        },
        isOptionDisabled(optionName) {
            return this.selectedOptions.includes('bruteForceWifi') && optionName !== 'bruteForceWifi';
        },
        isWifiOptionGrayedOut(optionName) {
            return optionName === 'bruteForceWifi' && this.selectedOptions.length > 0 && !this.selectedOptions.includes('bruteForceWifi');
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
    background: linear-gradient(135deg, #ffffff, #bebebe);
    position: relative;
}

/* Barre de navigation */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 25px;
    border-bottom: 3px solid #ccc;
    background: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.logo {
    display: flex;
    align-items: center;
}

.logo-img {
    height: 50px;
    width: auto;
}

.icons {
    display: flex;
    gap: 20px;
    align-items: center;
}

.icon {
    font-size: 34px;
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
    align-items: center;
    gap: 40px;
    padding: 80px;
}

/* Options */
.option {
    width: 400px;
    background: #252525;
    color: #fff;
    padding: 30px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    cursor: pointer;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s, background 0.3s;
}

.option-txt {
    margin-right: 15px;
}

.option:hover {
    background: #444;
    transform: scale(1.05);
}

.option input[type="checkbox"] {
    appearance: none;
    width: 25px;
    height: 25px;
    border: 3px solid #fff;
    border-radius: 5px;
    background: #555;
    transition: background 0.3s, border 0.3s;
    cursor: pointer;
    margin-bottom: 10px;
    position: relative;
}

.option input[type="checkbox"]:checked {
    background: #007BFF;
    border-color: #005BB5;
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
}

.option label {
    font-size: 24px;
    margin-top: 10px;
    display: flex;
    align-items: center;
}

.details {
    display: flex;
    flex-direction: column;
    background: #fff;
    color: #000;
    width: 100%;
    padding: 20px;
    border-radius: 15px;
    margin-top: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.details label {
    font-size: 18px;
    margin-bottom: 10px;
}

/* Bouton OK */
.button {
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn {
    width: 200px;
    padding: 20px 40px;
    background: #252525;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s, transform 0.3s;
    margin-bottom: 200px;
}

.btn:hover {
    background: #444;
    transform: scale(1.05);
}

/* Pop-up */
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
}

.popup {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
}

.popup h2 {
    margin-bottom: 20px;
}

.popup label {
    display: block;
    margin-bottom: 10px;
    font-size: 18px;
}

.popup input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}

/* Conteneur pour les boutons */
.button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.btn-pop-up {
    width: 200px;
    padding: 20px 40px;
    background: #252525;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s, transform 0.3s;
    margin-bottom: 25px;
}

.btn-pop-up:hover {
    background: #444;
    transform: scale(1.05);
}

/* Style pour les options désactivées */
.disabled-option {
    opacity: 0.5;
    pointer-events: none;
}

/* Style pour griser la case Wifi */
.grayed-out {
    opacity: 0.5;
    pointer-events: none;
    background: #777;
}
</style>
