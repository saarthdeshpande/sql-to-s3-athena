const connection = require('./init/mysql');
const { mkDir } = require('./directoryFns');
const fs = require('fs');

getTables = async () => {
    const query = 'SHOW TABLES;'
    return await new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) return reject(err);
            let tables = [];
            results.forEach(result => tables.push(result[`Tables_in_${process.env.SQL_DB_NAME}`]));
            return resolve(tables);
        })
    })
};

getData = async (tables) => {
    let data = {};
    for (const table of tables) {
        const query = `SELECT * FROM ${table};`;
        await new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) reject(err);
                data[table] = results;
                resolve(results);
            })
        })
    }
    return data;
};

saveDbFiles = async () => {
    mkDir();
    const tables = await getTables();
    const data = await getData(tables);
    for (const table of tables) {
        const formattedJson = data[table].map(entry => JSON.stringify(entry));
        fs.writeFileSync(`./data/${table}.json`, formattedJson.join(",\n"));
    }
};

module.exports = { getTables, saveDbFiles };
