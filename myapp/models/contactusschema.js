var mongoose = require('mongoose');
var dotenv = require('dotenv');

dotenv.config();
const URI = process.env.CONNECTIONURL;

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true/*, useFindAndModify: false,
useCreateIndex: true*/
})

const contactSchema = new mongoose.Schema({
    Fullname: String,
    Mobile: String,
    Email: String,
    Message: String,
    Date: {
        type: Date,
        default: Date.now
    }

});

const contactModel = mongoose.model('contactmessages', contactSchema);

module.exports = contactModel;