var mongoose = require('mongoose');
var dotenv = require('dotenv');

dotenv.config();
const URI = process.env.CONNECTIONURL;

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true/*, useFindAndModify: false,
useCreateIndex: true*/
})

const signupSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    Mobile: String,
    Email: String,
    UserName: String,
    Password: String,   
    Date: {
        type: Date,
        default: Date.now
    }
});

const signupModel = mongoose.model('registeredusers', signupSchema);

module.exports = signupModel;