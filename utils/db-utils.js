const mssql = require('mssql');

/**
 * Méthode pour créer une connexion vers la DB
 * @returns {Promise<mssql.ConnectionPool} La connexion pool
 */
const createDbConnection = async () => {
    const db = await mssql.connect(process.env.DB_CONNECTIONSTRING);
    return db;
};

/**
 * Méthode pour tester la connexion vers la DB
 */
const testDbConnection = async () => {
    try {
        const db = await createDbConnection();
        db.close();
        console.log('Connection DB - OK');
    }
    catch (error) {
        console.log('Connection DB - Error');
        console.error(error.message);
    }
};

module.exports = {
    createDbConnection,
    testDbConnection
};