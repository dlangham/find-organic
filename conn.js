const conn = {};

//check if conn-dev.js exists (ie. on local dev env)
if ( require('fs').existsSync('./conn-dev.js') ) {

    const connDev = require('./conn-dev') || {};
    
    conn.development = {
        // //url to be used in link generation
        // url: 'http://my.site.com',
        
        db: {
            host: connDev.host,
            name: connDev.dbname,
            user: connDev.user,
            pass: encodeURIComponent(connDev.password)
        },
        server: {
            host: 'localhost',
            port: '3000'
        }
        
    };
} else { conn.development = {}; }

conn.production = {
    // //url to be used in link generation
    // url: 'http://my.site.com',

    db: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: encodeURIComponent(process.env.DB_PASSWORD)
    },
    server: {
        host: process.env.IP,
        port: process.env.PORT || '3000'
    }

};

module.exports = conn;