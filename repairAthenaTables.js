const athena = require('./init/athena')

repairTables = async (tables) => {
    for (const table of tables) {
        const query = `MSCK REPAIR TABLE ${table};`;
        let params = {
            QueryString: query,
            ResultConfiguration: { OutputLocation: process.env.ATHENA_OUTPUT_LOCATION },
            QueryExecutionContext: { Database: process.env.ATHENA_DB }
        };
        await new Promise((resolve, reject) => {
            athena.startQueryExecution(params, (err, results) => {
                if (err) reject(err);
                resolve(console.log("Repaired table: ", table, results));
            });
        });
    }
};

module.exports = repairTables;
