var fs = require("fs");
var path = require("path");
var schedule = require("node-schedule");

module.exports = {
    dir: "scheduled",
    getCompleteDir: function () {
        return path.join(__dirname, "../" + this.dir);
    },
    init: function () {
        fs.readdirSync(this.getCompleteDir()).forEach(function (file) {
            var task = require("../" + this.dir + "/" + file);
            schedule.scheduleJob(task.schedule, task.job);
            console.log("Scheduled job " + task.name);
        });
    }
}
