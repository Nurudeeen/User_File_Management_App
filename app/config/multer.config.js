const res = require('express/lib/response');
const multer = require('multer');
const maxSize = 20000000
var storage = multer.memoryStorage()
var upload = multer({storage: storage, limits: { fileSize: maxSize }});
//if (!upload) return res.status(404).send({message: "please attach a valid file"})

module.exports = upload;