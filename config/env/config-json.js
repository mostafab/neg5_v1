const fs = require('fs');
const path = require('path');

try {
    module.exports = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../config.json'), 'utf8'));
} catch (err) {
    module.exports = {
        DB_STRING: process.env.DB_STRING,
        port: process.env.PORT,
    }
}