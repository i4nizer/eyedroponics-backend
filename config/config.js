require('dotenv').config()


const config = {

    port: process.env.PORT,
    dbPassword: process.env.DB_PASSWORD,

    tokenLife: 900,
    accessKey: process.env.ACCESS_KEY,
    refreshKey: process.env.REFRESH_KEY,

}


module.exports = config