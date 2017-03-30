var UserDb = require("../database/user");
var crypto = require("../module/crypto");
var fs = require("fs");
var path = require("path");

var AVATAR_PATH = path.join(__dirname, "../../public/img/avatar/");

class User {
    constructor(obj) {
        for (var entry in obj) {
            this[entry] = obj[entry];
        }
    }
    
    save(callback) {
        UserDb.update(_id, this);
    }
    
    setUsername(username) {
        this.username = username;
    }
    
    setPassword(password) {
        this.password = crypto.genEncrypted(password);
    }
    
    deleteAvatar() {
        fs.unlinkSync(AVATAR_PATH + this._id + ".jpg");
    }
    
    setAvatar(imgsrc) {
        
    }
    
    updateAvatar(imgsrc) {
        this.deleteAvatar();
        this.setAvatar(imgsrc);
    }
    
    setEnrollYear(year) {
        this.enrollYear = year;
    }
    
    setInternational(international) {
        this.international = international;
    }
    
    setCollege(collegeId) {
        this.collegeId = collegeId;
    }
    
    addMajor(majorId) {
        if (!this.majors) {
            this.majors = [];
        }
        this.majors.append(majorId);
    }
    
    removeMajor(majorId) {
        if (!this.majors) {
            this.majors = [];
            return;
        }
        var index = this.majors.indexOf(majorId);
        if (index >= 0) {
            this.majors.splice(index, 1);
        }
    }
    
    addMinor(minorId) {
        if (!this.minors) {
            this.minors = [];
        }
        this.minors.append(majorId);
    }
    
    removeMinor(minorId) {
        if (!this.minors) {
            return;
        }
        var index = this.minors.indexOf(majorId);
        if (index >= 0) {
            this.minors.splice(index, 1);
        }
    }
    
    addAP(apId) {
        if (!this.aps) {
            this.aps = [];
        }
        this.aps.append(apId);
    }
    
    removeAP(apId) {
        if (!this.minors) {
            return;
        }
        var index = this.aps.indexOf(apId);
        if (index >= 0) {
            this.aps.splice(index, 1);
        }
    }
    
    addTransferCourse() {
        
    }
}

function emailValid(email) {
    return true;
}

function usernameValid(username) {
    return true;
}

function passwordValid(password) {
    return true;
}

module.exports = {
    INVALID_EMAIL: 900,
    INVALID_USERNAME: 901,
    INVALID_PASSWORD: 902,
    EMAIL_EXISTS: 903,
    USERNAME_EXISTS: 904,
    USER_DOES_NOT_EXIST: 1000,
    WRONG_PASSWORD: 1001,
    UNKNOWN_ERROR: 1100,
    login: function (email, password, callback) {
        var self = this;
        if (!emailValid(email)) {
            callback(self.INVALID_EMAIL, null);
            return;
        }
        if (!passwordValid(password)) {
            callback(self.INVALID_PASSWORD, null);
            return;
        }
        UserDb.getUserByEmail(email, function (userInfo) {
            if (userInfo) {
                var user = new User(userInfo);
                if (crypto.match(password, user.password)) {
                    callback(0, user);
                }
                else {
                    callback(self.WRONG_PASSWORD, null);
                }
            }
            else {
                callback(self.USER_DOES_NOT_EXIST, null);
            }
        });
    },
    register: function (email, username, password, callback) {
        var self = this;
        if (!emailValid(email)) {
            callback(self.INVALID_EMAIL, null);
            return;
        }
        if (!usernameValid(username)) {
            callback(self.INVALID_USERNAME, null);
            return;
        }
        if (!passwordValid(password)) {
            callback(self.INVALID_PASSWORD, null);
            return;
        }
        UserDb.emailExists(email, function (exists) {
            if (exists) {
                callback(self.EMAIL_EXISTS, null);
            }
            UserDb.usernameExists(username, function (exists) {
                if (exists) {
                    callback(self.USERNAME_EXISTS, null);
                }
                UserDb.addUser(email, username, password, function (userInfo) {
                    if (userInfo) {
                        var user = new User(userInfo);
                        callback(0, user);
                    }
                    else {
                        callback(self.UNKNOWN_ERROR, null);
                    }
                });
            });
        });
    },
    getInfo: function (id, callback) {
        UserDb.getUserById(id, function (userInfo) {
            if (userInfo) {
                callback(0, new User(userInfo));
            }
            else {
                callback(self.UNKNOWN_ERROR, null);
            }
        });
    }
};
