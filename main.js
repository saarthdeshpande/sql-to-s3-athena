const { getTables, saveDbFiles } = require('./fetchFromDb');
const pushToS3 = require('./pushToS3');
const repairAthenaTables = require('./repairAthenaTables');

main = async() => {
    await saveDbFiles();
    const tables = await getTables();
    await pushToS3(tables);
    await repairAthenaTables(tables);
};

main()
    .then(() => process.exit(0))
