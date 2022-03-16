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

        res.render('message/newMessage', { title: 'Nouveau message', errors: null });
    },

    // POST
    messageFormPOST: (req, res) => {
        // Permet de traiter les donnée du formulaire

        res.sendStatus(501);
    }

};

module.exports = messageController;