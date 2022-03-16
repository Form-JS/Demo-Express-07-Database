const mssql = require('mssql');
const { createDbConnection } = require('../utils/db-utils');


const messageModel = {

    getAll: async () => {
        const db = await createDbConnection();
        const result = await db.query('SELECT * FROM Message ORDER BY CreateDate DESC');
        db.close();

        return result.recordset;
    },

    insert: async ({ pseudo, content }) => {
        let db;
        try {
            db = await createDbConnection();

            const querySQL = 'INSERT INTO Message (Pseudo, Content)'
                + ' OUTPUT inserted.MessageId'
                + ' VALUES (@pseudo, @content)';

            // ↓ Requete sécurisé : Pas d'injection SQL possible !
            const request = new mssql.Request();
            request.input('pseudo', mssql.NVarChar, pseudo);
            request.input('content', mssql.NVarChar, content);

            const result = await request.query(querySQL);

            return result.recordset[0].MessageId;
        }
        finally {
            db?.close();   // if(db) {db.close()}
        }
    }

};

module.exports = messageModel;