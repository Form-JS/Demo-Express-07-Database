const express = require('express');

// Chargement des variables d'environement
require('dotenv-flow').config();

// Variable de config
const { PORT, NODE_ENV } = process.env;

// Génération du serveur web
const app = express();

// Configuration du moteur de vue
app.set('view engine', 'ejs');
app.set('views', './views');

// TODO Ajouter le systeme de router (Repas avant :p)

// Demarrage du serveur
app.listen(PORT, () => {
    console.log(`Server up on port ${PORT} [${NODE_ENV}]`);
});