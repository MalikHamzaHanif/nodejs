const mongo = require("mongoose")
function connectDataBase(url) {
    return mongo.connect(url);
}

module.exports = connectDataBase;