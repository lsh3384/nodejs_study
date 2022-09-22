const Bcrypt = require('bcryptjs')

let exports = module.exports = {}

exports.hash = function(clearText) {
    return new Promise((resolve, reject) => {
        Bcrypt.genSalt(SecurityConstant.seedGenerationRound, (error, salt) => {
            if(error) {
                reject(error);
            } else {
                Bcrypt.hash(clearText, salt, (err, encrypted) => {
                    if(err) {
                        reject(err);
                    } else {
                        let retObj = {};
                        retObj.hash = encrypted;
                        retObj.salt = salt;
                        resolve(retObj);
                    }
                });
            }
        });
    });
}

exports.compareHash = function (clearText, hashedText) {
    return new Promise((resolve, reject) => {
        Bcrypt.compare(clearText, hashedText, (error, result) => {
            if(error) {
                reject(error);
            } else {
                if(result === true) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        });
    })
}