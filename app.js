const express = require('express');
const homeRouter = require('./routes/home-router');
const messageRouter = require('./routes/message-router');

// Chargement des variables d'environement
require('dotenv-flow').config();

// Variable de config
const { PORT, NODE_ENV } = process.env;

// Génération du serveur web
const app = express();

// Configuration du moteur de vue
app.set('view engine', 'ejs');
app.set('views', './views');

// Ajout des dossiers statiques
app.use(express.static('public'));

// Ajout le systeme de router
app.use(homeRouter);
app.use(messageRouter);

// Erreur 404 custom (Après les routes !!!)
app.use((req, res) => {
    res.status(404).send('Perdu ? :o');
});

// Demarrage du serveur
app.listen(PORT, () => {
    console.log(`Server up on port ${PORT} [${NODE_ENV}]`);
});