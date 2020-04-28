var accountDA = require('./accountDA');

exports.login = function (req, res) {
    try {
        accountDA.login(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.createCustomer = function (req, res) {
    try {
        accountDA.createCustomer(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.addCustomerNumber = function (req, res) {
    try {
        accountDA.addCustomerNumber(req, res);
    } catch (error) {
        console.log(error);
    }
}


exports.uploadBaseSingleImage = function (req, res) {
    try {
        accountDA.uploadBaseSingleImage(req, res);
    } catch (error) {
      console.log(error);
    }
  }
  exports.addCustomerImageName = function (req, res) {
    try {
        accountDA.addCustomerImageName(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.getCustomerDetails = function(req,res){
    try{
        accountDA.getCustomerDetails(req,res);
    }catch(error){
        console.log(error)
    }
}