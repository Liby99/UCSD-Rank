/**
 * data.js for getting json data from the file system stored in server/data/
 */

module.exports = {
    getData: function (name) {
        return require("../data/" + name + ".json");
    }
}
