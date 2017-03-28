var MongoClient = require('mongodb').MongoClient;
var { getData } = require("./data.js");

module.exports = {
    DEFAULT_PORT: 27017,
    _config: undefined,
    _db: undefined,
    initConfig: function () {
        if (!this._config) {
            this._config = getData("mongo");
        }
    },
    getAuthentication: function () {
        if (this._config.username) {
            return this.config.username + ":" + this.config.password + "@";
        }
        return "";
    },
    getPort: function () {
        return port = this._config.port ? this._config.port : this.DEFAULT_PORT;
    },
    getUrl: function () {
        return "mongodb://" + this.getAuthentication() + this._config.host + ":" + this.getPort() + "/" + this._config.database;
    },
    init: function (callback) {
        var self = this;
        initConfig();
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.error("Connection to database " + this._config.database + " failed:");
                throw err;
            }
            self._db = db;
        });
    },
    getDB: function () {
        if (!this._db) {
            throw new Error("Database not yet initiated");
        }
        return this._db;
    }
}
