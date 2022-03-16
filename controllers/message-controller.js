const { messageSchema } = require('../data-validators/message-validator');
const messageModel = require('../models/message-model');
const { getErrorMessage } = require('../utils/error-utils');

const messageController = {

    index: (req, res) => {
        // Affichage de la liste des messages
        messageModel.getAll()
            .then(messages => {
                res.render('message/index', { title: 'Liste des messages', messages });
            });
    },

    detail: (req, res) => {
        // Affichage le detail d'un message
        const { id } = req.params;

        // TODO Recup les datas

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
                messageModel.insert({
                    pseudo: data.pseudo,
                    content: data.msg
                }).then(id => {
                    console.log(`Message ${id}`);
                });

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