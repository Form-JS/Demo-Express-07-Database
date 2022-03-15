const messageController = require('../controllers/message-controller');
const messageRouter = require('express').Router();


messageRouter.get('/message', messageController.index);

messageRouter.get('/message/:id([0-9]+)', messageController.detail);

messageRouter.get('/message/new', messageController.messageFormGET);
messageRouter.post('/message/new', messageController.messageFormPOST);

// Alternative avec la méthode route et les 2 méthodes d'envoi
/*
messageRouter.route('/message/new')
    .get(messageController.messageFormGET)
    .post(messageController.messageFormPOST);
*/

module.exports = messageRouter;