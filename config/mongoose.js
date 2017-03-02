var config = require("./config");
var mongoose = require("mongoose");
var configJson = require('./env/config-json');

module.exports = function() {
    var db = mongoose.connect(configJson.DB_STRING);
    var conn = mongoose.connection;
    conn.on('error', console.error.bind(console, "Connection Error: "));
    conn.once('open', function(callback) {
        // Nothing needs to go here
    });
    require("../app/models/tournament");
    require("../app/models/user");
    require("../app/models/tournament-director");
    require("../app/models/player");
    require("../app/models/team");
    require("../app/models/game");
    require("../app/models/registration");
    return db;
}
