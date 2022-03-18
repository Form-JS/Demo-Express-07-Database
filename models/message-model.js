const mssql = require('mssql');
const { createDbConnection } = require('../utils/db-utils');
const { messageMapper } = require('./mappers/message-mapper');

const messageModel = {

    getAll: async () => {
        const db = await createDbConnection();
        const result = await db.query('SELECT * FROM Message ORDER BY CreateDate DESC');
        db.close();

        return result.recordset.map(row => messageMapper(row));
    },

    getById: async (id) => {
        let db;
        try {
            db = await createDbConnection();

            // Requete SQL parametré
            const querySQL = 'SELECT * FROM Message WHERE MessageId = @Id;';

            const request = new mssql.Request(db);
            request.input('Id', mssql.BigInt, id);

            // Execution de la requete
            const result = await request.query(querySQL);

            if (result.recordset.length !== 1) {
                return null;
            }
            return messageMapper(result.recordset[0]);
        }
        finally {
            db?.close();
        }
    },

    insert: async ({ pseudo, content }) => {
        let db;
        try {
            db = await createDbConnection();

            // Protection contre l'injection SQL => Pas de concatenation !
            const querySQL = 'INSERT INTO Message (Pseudo, Content, CreateDate)'
                + ' OUTPUT inserted.MessageId'
                + ' VALUES (@pseudo, @content, @createDate)';

            // Requete sécurisé: Ajout de parametres pour envoyer les données sensible
            const request = new mssql.Request(db);
            request.input('pseudo', mssql.NVarChar, pseudo);
            request.input('content', mssql.NVarChar, content);
            request.input('createDate', mssql.DateTime2, new Date());

            const result = await request.query(querySQL);
            console.log(result);

            return result.recordset[0]['MessageId'];
        }
        finally {
            db?.close();   // if(db) { db.close(); }
        }
    }

};

module.exports = messageModel;