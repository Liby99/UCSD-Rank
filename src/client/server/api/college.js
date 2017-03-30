class College {
    constructor(obj) {
        for (var entry in obj) {
            this[entry] = obj[entry];
        }
    }
}

var _cache = {};

module.exports = {
    UNKNOWN_ERROR: 1100,
    get(collegeId, callback) {
        var self = this;
        
        // Check the cache first
        if (_cache[collegeId]) {
            callback(0, _cache[collegeId]);
            return;
        }
        
        // If not, then get the college information
        CollegeDb.getCollege(collegeId, function (collegeInfo) {
            if (collegeInfo) {
                var college = new College(collegeInfo);
                _cache[collegeId] = college;
                callback(0, college);
            }
            else {
                callback(self.UNKNOWN_ERROR, null);
            }
        });
    }
}
