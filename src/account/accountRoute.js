var accountMgr = require('./accountMgr');

module.exports = function (app) {

    //   Accounts Module

    app.route('/createcustomer') //  Customer Registration 
        .post(accountMgr.createCustomer);

    app.route('/customerlogin') //   Customer Login
        .post(accountMgr.login);

    app.route('/addCustomerNumber/:id') //  Customer Registration 
        .put(accountMgr.addCustomerNumber);

    app.route('/base64imagesingle/:id')
        .put(accountMgr.uploadBaseSingleImage);

    app.route('/storecustomerimagename/:id')
        .put(accountMgr.addCustomerImageName); //  Add customer Image Name
        
    app.route('/getCustomerDetails/:id')
        .get(accountMgr.getCustomerDetails)
}