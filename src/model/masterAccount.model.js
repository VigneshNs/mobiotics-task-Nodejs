var mongoose = require('mongoose');

const AccountDetailsSchema = new mongoose.Schema({
    emailId: String,
    mobileNumber: Number,
    password: String,
    userId: String,
    customerImageName: String
});
const AccountDetails = mongoose.model('masterAccount', AccountDetailsSchema);
module.exports = AccountDetails;