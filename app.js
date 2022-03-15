const express = require('express');

// Variable de config
const port = 8080;
const mode = 'dev';

// Génération du serveur web
const app = express();

// Configuration du moteur de vue
app.set('view engine', 'ejs');
app.set('views', './views');

// TODO Ajouter le systeme de router (Repas avant :p)

// Demarrage du serveur
app.listen(port, () => {
    console.log(`Server up on port ${port} [${mode}]`);
});