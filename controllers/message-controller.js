const { messageSchema } = require('../data-validators/message-validator');
const { getErrorMessage } = require('../utils/error-utils');

const messageController = {

    index: (req, res) => {
        // Affichage de la liste des messages

        res.render('message/index', { title: 'Liste des messages' });
    },

    detail: (req, res) => {
        // Affichage le detail d'un message
        const { id } = req.params;

        res.render('message/detail', { title: `Detail du message ${id}` });
    },

    // GET
    messageFormGET: (req, res) => {
        // Permet d'afficher la page avec le formulaire

        res.render('message/newMessage', { title: 'Nouveau message', errors: null, data: {} });
    },

    // POST
    messageFormPOST: (req, res) => {
        // Permet de traiter les donnée du formulaire
        messageSchema.validate(req.body, { abortEarly: false })
            .then((data) => {
                console.log('data', data);
                // TODO Ajouter dans la DB 

                res.redirect('/message');
            })
            .catch((validationError) => {
                const errors = getErrorMessage(validationError);
                const data = validationError.value;

                res.render('message/newMessage', { title: 'Corrige ton message', errors, data });
            });
    }

};

module.exports = messageController;