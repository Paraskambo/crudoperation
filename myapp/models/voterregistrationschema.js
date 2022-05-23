var mongoose = require('mongoose');
var dotenv = require('dotenv');

dotenv.config();
const URI = process.env.CONNECTIONURL;

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true/*, useFindAndModify: false,
useCreateIndex: true*/
})

const voterRegistrationSchema = new mongoose.Schema({
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

const voterRegistrationModel = mongoose.model('Voters', voterRegistrationSchema);

module.exports = voterRegistrationModel;