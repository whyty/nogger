var crypto = require('crypto');
var fs = require('fs');
var path = require('path');
var salt = 'FRW#CTlIOPKcZoIrSiCNDm1hjNc2j7BaCp35J3E2qHD9F5*3Q#3AmhkOTyqhvqZC4IzE$JHp6$j!#FVnjMLTvaL2fhW0x^mLI6nr';
var pwPath = path.resolve(__dirname, '..', '.password');
function encrypt(password) {
    if (!password) return '';
    var encrypred;
    try {
        encrypred = crypto.createHmac('sha1', salt).update(password).digest('hex');
        return encrypred
    } catch (err) {
        return ''
    }
}

exports.isSet = function(callback){
    fs.exists(pwPath, callback);
};

exports.set = function(password, callback){
    fs.writeFile(pwPath, encrypt(password), 'utf8', callback);
};

exports.match = function(password, callback){
    fs.readFile(pwPath, {encoding: 'utf8'}, function(err, data){
        if(err){
            console.log(err);
            return;
        }
        callback(encrypt(password) === data);
    })
};
