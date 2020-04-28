var account = require('./account/accountRoute');

exports.loadRoutes =function(app){
    account(app);
}