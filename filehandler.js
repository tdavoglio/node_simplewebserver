var fs = require('fs');

module.exports = function(filename, sucessFn, errorFn) {
    fs.readFile(filename, (err, data) => {
        if(err) {
            errorFn(err);
        } else {
            sucessFn(data);
        }
    })
}