var mongoose = require('mongoose');

const CustomerDetailsSchema = new mongoose.Schema({
    emailId: String,
    mobileNumber: Number,
    password: String,
    date: Date,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    location: String,
    gender: String,
    createdBy: String,
    lastLoginBy: String,
    
});
const Customerdetails = mongoose.model('customerAccount', CustomerDetailsSchema);
module.exports = Customerdetails;