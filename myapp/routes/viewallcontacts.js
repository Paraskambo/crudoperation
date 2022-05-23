var express = require('express');
var router = express.Router();

var contactModel = require('../models/contactusschema')
/* GET home page. */
//Read All Contacts
router.get('/', function(req, res, next) {
    var getAllContactsFromDataBase = contactModel.find();
    getAllContactsFromDataBase.exec((err, contactData) => {
        if(err) {
            res.render('viewallcontacts', { title: 'Express', msg: '', contactData: '' });
        }
        if(contactData != null) {
            res.render('viewallcontacts', { title: 'Express', msg: '', contactData: contactData });
        } else {
            res.render('viewallcontacts', { title: 'Express', msg: '', contactData: '' });
        }
    });
  //res.render('viewallcontacts', { title: 'Express' });
});


module.exports = router;
