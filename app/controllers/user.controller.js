
const db = require("../models");
const User = db.user;
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };

  exports.deleteUser = (req, res) => {
    User.destroy({
      where: {
         id: req.params.id //this will be your id that you want to delete
      }
    
     }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
       if(rowDeleted === 1){
        return res.status(200).send({message: "successfully deleted User"});
      }else{
         return res.status(404).send({message: "User is already deleted"});
      }
     }, function(err){
       console.log(err); 
     });
    }