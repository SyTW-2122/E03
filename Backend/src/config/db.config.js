const MONGO_DB_URI = {
    HOST: '172.16.134.3',
    DB: 'CINEMART',
    USER: 'admin',
    PASSWORD: 'admin',
    PORT: 27017,
    entry: 'mongodb'
}
const MONGO_DB_URI_TEST = {
    HOST: '172.16.134.3',
    DB: 'TEST',
    USER: 'admin',
    PASSWORD: 'admin',
    PORT: 27017,
    entry: 'mongodb'
}

const MONGO_DB_URI_TEST_CI = {
    HOST: 'cluster0.ti4oec1.mongodb.net/?retryWrites=true&w=majority',
    USER: 'dbUser',
    PASSWORD: 'cinemart',
    entry: 'mongodb+srv'
}

module.exports.MONGO_DB_URI = MONGO_DB_URI;
module.exports.MONGO_DB_URI_TEST = MONGO_DB_URI_TEST;
module.exports.MONGO_DB_URI_TEST_CI = MONGO_DB_URI_TEST_CI;