//TODO update database name to match project requirements

module.exports = {
    PORT: 3000,
    DB_CONNECTION_STRING: 'mongodb://localhost:27017/tutorials',
    TOKEN_SECRET: 'this is very secure',
    COOKIE_NAME: 'SESSION_TOKEN'
}