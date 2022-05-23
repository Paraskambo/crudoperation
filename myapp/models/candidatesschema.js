var mongoose = require('mongoose');
var dotenv = require('dotenv');

dotenv.config();
const URI = process.env.CONNECTIONURL;

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true/*, useFindAndModify: false,
useCreateIndex: true*/
})

const candidateRegistrationSchema = new mongoose.Schema({
    Fullname: String,
    Age: String,
    Mobile: String,
    Email: String,
    VoterId: String,
    Date: {
        type: Date,
        default: Date.now
    }

});

const candidateRegistrationModel = mongoose.model('candidates', candidateRegistrationSchema);

module.exports = candidateRegistrationModel;