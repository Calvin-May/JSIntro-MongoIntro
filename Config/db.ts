let mongoDBPath = "mongodb://localhost/webd6201";
let sessionSecret = "someSecret";

module.exports = {
    Path: mongoDBPath,
    Secret: sessionSecret
}

// Same as above... module.exports = {...}
//module.exports.DB = mongoDBPath;
//module.exports.Secret = sessionSecret;