var express = require('express');
const { route } = require('../app.js');
var router = express.Router();

var contactModel = require('../models/contactusschema.js')
var voterModel = require('../models/voterregistrationschema');
var candidateModel = require('../models/candidatesschema');
var signupModel = require('../models/signupschema');
var bcrypt = require('bcryptjs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', msg: '' });
});
//Middleware 
const checkExistingMobileInDataBase = (req, res, next) => {
  const getExistingMobileData = signupModel.findOne({Mobile: req.body.mobile});
  getExistingMobileData.exec((err, existingMobileData) => {
    if(err) throw err;
    if(existingMobileData != null) {
      res.render('index', { title: 'Express', msg: 'This Mobile is Already Registered, Try Another One!' });
    } else {
      next();
    }
  });
}
const checkExistingEmailInDataBase = (req, res, next) => {
  const getExistingEmailData = signupModel.findOne({Email: req.body.email});
  getExistingEmailData.exec((err, existingEmailData) => {
    if(err) throw err;
    if(existingEmailData != null) {
      res.render('index', { title: 'Express', msg: 'This Email is Already Registered, Try Another One!' });
    } else {
      next();
    }
  });
}

const checkExistingUsernameInDataBase = (req, res, next) => {
  const getExistingUsernameData = signupModel.findOne({UserName: req.body.username});
  getExistingUsernameData.exec((err, existingData) => {
    if(err) throw err;
    if(existingData != null) {
      res.render('index', { title: 'Express', msg: 'Username Not Available' });
    } else {
      next();
    }
  });
}
//sign up
router.post('/signup', checkExistingMobileInDataBase, checkExistingEmailInDataBase, checkExistingUsernameInDataBase, (req, res, next) => {

  const password = req.body.password;
  const confirmPassword = req.body.confirmpassword;

  const hashedPassword = bcrypt.hashSync(password, 12)
  if(password != confirmPassword || password == '' || confirmPassword == '') {
    res.render('index', { title: 'Express', msg: 'Passwords Not Matched! Try Again!' });
  } else {
    var signupDetails = new signupModel({
      FirstName: req.body.firstname,
      LastName: req.body.lastname,
      Mobile: req.body.mobile,
      Email: req.body.email,
      UserName: req.body.username,
      Password: hashedPassword
    });
    signupDetails.save((err) => {
      if(err) {
        res.render('index', { title: 'Express', msg: 'Something Wrong! Try Again!' });
      } 
      res.render('index', { title: 'Express', msg: 'Sign Up Successful, You may Sign in now!' });
    });
  }  
});

router.get('/signup', (req, res, next) => {

  res.render('index', { title: 'Express', msg: '' });
})






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


router.post('/signin', function(req, res, next) {
  var username = req.body.emailorusername;
  var password = req.body.password;

  var getUserData = signupModel.findOne({UserName: username})
  getUserData.exec((err, userData) => {
    if (err) throw err;
    if(userData != null) {      
      //get password
      //password compare
      //sign in using req.session
      //redirect to 
      var getPassword = userData.Password; //password from database
      if(bcrypt.compareSync(password, getPassword)) {
        req.session.userLoginUsername = username;
        //res.redirect('/dashbaord');
        res.render('dashboard', { title: 'Express', msg: '', logInUser: req.session.userLoginUsername });
      } else {
        res.render('index', { title: 'Express', msg: 'Wrong Password', logInUser: ''});
      }
    } else {
      res.render('index', { title: 'Express', msg: 'Invalid Username',logInUser: '' });
    }
  });
  //res.render('index', { title: 'Express', msg: '' });
});

//Sign out
router.post("/signout", function(req, res, next) {
  req.session.destroy(function(err) {
    if(err) {
      res.redirect('/');
    } else {
      res.render('index', { title: 'Project Interview', msg:'Signed Out Succesfully! See You Soon' });

    } 
  });   
  })

  router.get('/signout', function(req, res, next) {
    res.render('index', { title: 'Express', msg: ''});
  });
module.exports = router;
