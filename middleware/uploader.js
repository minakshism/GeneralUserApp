const path = require("path");
var multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
      },
      filename: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        console.log(ext);
        cb(null, Date.now() + ext);
      }
});

var upload = multer({ 
    storage: storage
})

module.exports = upload;