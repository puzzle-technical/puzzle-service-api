var multer  = require('multer')

module.exports.upload = (destination, filename) => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination)
    },
    filename: function (req, file, cb) {
      cb(null, filename)
    }
  })

  return multer({ storage })
}
