let express = require('express');
let router = express.Router();
let upload = require('../config/multer.config.js');
const { authJwt } = require("../middleware");
//const controller = require("../controllers/user.controller");
const fileWorker = require('../controllers/file.controller.js');
 
router.post('/api/file/upload', [authJwt.verifyToken], upload.single("file"), fileWorker.uploadFile);
 
router.get('/api/file/info', [authJwt.verifyToken], fileWorker.listAllFiles, [authJwt.verifyToken]);
 
router.get('/api/file/:id',  [authJwt.verifyToken], fileWorker.downloadFile, [authJwt.verifyToken]);

router.delete('/api/file/:id',  [authJwt.verifyToken], fileWorker.deleteFile, [authJwt.verifyToken]);
 
module.exports = router;