// const req = require('express/lib/request');
// const res = require('express/lib/response');
var stream = require('stream');

const db = require("../models");
const File = db.files;

exports.uploadFile = (req, res) => {
	//if (req.file.mimetype ==  undefined) return res.status(404).send({message: "please attach a valid file"});
	File.create({
		type: req.file.mimetype,
		name: req.file.originalname,
		data: req.file.buffer
	}).then(() => {
		res.json({msg:'File uploaded successfully! -> filename = ' + req.file.originalname});
	}).catch(err => {
		console.log(err);
		return res.status(404).send({message: "please attach a valid file"})
		//res.json({msg: 'Error', detail: err});
	});
}

exports.listAllFiles = (req, res) => {
	File.findAll({attributes: ['id', 'name']}).then(files => {
		if (files[0]== null) return res.status(409).send({message: "You have not uploaded any file yet"});
	  res.json(files);
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}

exports.downloadFile = (req, res) => {
	File.findByPk(req.params.id).then(file => {
		if (!file) return res.status(404).send({message: "File not found"})
		var fileContents = Buffer.from(file.data, "base64");
		var readStream = new stream.PassThrough();
		readStream.end(fileContents);
		
		res.set('Content-disposition', 'attachment; filename=' + file.name);
		res.set('Content-Type', file.type);

		readStream.pipe(res);
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}
exports.deleteFile = (req, res) => {
	File.destroy({
		where: {
		   id: req.params.id //this will be your id that you want to delete
		}
	
	 }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
	   if(rowDeleted === 1){
		  return res.status(200).send({message: "successfully deleted image"});
		}else{
		   return res.status(404).send({message: "File is already deleted"});
		}
	 }, function(err){
		 console.log(err); 
	 });
  }