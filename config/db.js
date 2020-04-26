const dotenv = require("dotenv");
dotenv.config();
module.exports = {
    dbConnect : process.env.DB_CONNECT,
    port : process.env.PORT,
    tokenScret  : process.env.TOKENSCRET
}
