var express = require('express');
const { route } = require('../app.js');
var router = express.Router();

var contactModel = require('../models/contactusschema.js')
var voterModel = require('../models/voterregistrationschema');
var candidateModel = require('../models/candidatesschema');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', msg: '' });
});

//Contact us form Create
router.post('/contact', (req, res, next) => {

  const contactDetail = new contactModel({
    Fullname: req.body.fullname,
    Mobile: req.body.mobile,
    Email: req.body.email,
    Message: req.body.message
  });
  contactDetail.save((err) => {
    if(err) {
      res.render('index', {title: 'Express', msg: 'Sorry Error Occured! Try Again'})
    }
    res.render('index', {title: 'Express', msg: 'Detail Submitted Successfully! We will contact you Soon! Cheers!'})
  });

  //res.render('index', {title: 'Express'})
} );

router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Express', msg: ''});
});

//Delete contact by particular id
router.get('/delete/:id', (req, res, next) => {
  var id = req.params.id;
  contactModel.findByIdAndDelete(id, (err) => {
    if(err) {
      //res.redirect('viewallcontacts');
      res.render('viewallcontacts', { title: 'Express', msg: 'Can Not Delete, Please Try Again!', contactData: '' });

    }
    res.redirect('index');
    //res.render('viewallcontacts', { title: 'Express', msg: 'Deleted Successfully', contactData: '' });

  });
});



//Register Voter form Create
router.post('/registervoter', (req, res, next) => {

  const voterDetail = new voterModel({
    Fullname: req.body.fullname,
    Age: req.body.age,
    Mobile: req.body.mobile,
    Email: req.body.email,
    VoterId: req.body.voterid
  });
  voterDetail.save((err) => {
    if(err) {
      res.render('index', {title: 'Express', msg: 'Sorry Error Occured! Try Again'})
    }
    res.render('index', {title: 'Express', msg: 'Voter Registered Successfully!'})
  });

  //res.render('index', {title: 'Express'})
} );

router.get('/registervoter', function(req, res, next) {
  res.render('index', { title: 'Express', msg: ''});
});


//Register Voter form Create
router.post('/registercandidate', (req, res, next) => {

  const candidateDetail = new candidateModel({
    Fullname: req.body.fullname,
    Age: req.body.age,
    Mobile: req.body.mobile,
    Email: req.body.email,
    VoterId: req.body.voterid
  });
  candidateDetail.save((err) => {
    if(err) {
      res.render('index', {title: 'Express', msg: 'Sorry Error Occured! Try Again'})
    }
    res.render('index', {title: 'Express', msg: 'Candidate Registered Successfully!'})
  });

  //res.render('index', {title: 'Express'})
} );

router.get('/registercandidate', function(req, res, next) {
  res.render('index', { title: 'Express', msg: ''});
});


module.exports = router;
