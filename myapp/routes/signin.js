var express = require('express');
const { route } = require('../app.js');
var router = express.Router();
/*
var contactModel = require('../models/contactusschema.js')
var voterModel = require('../models/voterregistrationschema');
var candidateModel = require('../models/candidatesschema');
*/
var signupModel = require('../models/signupschema');
var bcrypt = require('bcryptjs');
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.userLoginUsername) {
    res.redirect('dashboard')
  } else {
    res.render('signin', { title: 'Express', msg: '' });

  }
  });


module.exports = router;