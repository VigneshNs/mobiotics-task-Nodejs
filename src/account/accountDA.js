var masterAccount = require('../model/masterAccount.model');
var customerDetails = require('../model/customerAccount.model');
var s3 = require('../config/s3.config');
var env = require('../config/s3.env');
const AWS = require('aws-sdk');


exports.login = function (req, res) {
    masterAccount.find({
        'emailId': req.body.emailId,
        'password': req.body.password
    }).select().exec(function (err, loginData) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(loginData);
        }
    })
}


exports.createCustomer = function (req, res) {
    customerDetails.find({
        'emailId': req.body.emailId
    }).select().exec(function (err, findData) {
        if (err) {
            res.status(500).json(err);
        } else {
            if (findData.length !== 0) {
                res.status(200).send({
                    "result": "Already exist"
                })
            } else {
                var currentDate = new Date();
                var date = currentDate.getDate();
                var month = currentDate.getMonth() + 1;
                var year = currentDate.getFullYear();
                var todayDate = month + '/' + date + '/' + year;
                var create = new customerDetails();
                create.emailId = req.body.emailId;
                create.mobileNumber = req.body.mobileNumber;
                create.password = req.body.password;
                create.date = todayDate;
                create.publish = true;
                create.createdBy = req.body.createdBy;
                create.lastLoginBy = req.body.lastLoginBy;
                create.save(function (err, customerData) {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        var createMaster = new masterAccount();
                        createMaster.emailId = req.body.emailId;
                        createMaster.mobileNumber = req.body.mobileNumber;
                        createMaster.password = req.body.password;
                        createMaster.userId = customerData._id;
                        createMaster.save(function (err, masterData) {
                            if (err) {
                                res.status(500).json(err);
                            } else {
                                res.status(200).json(masterData);
                            }
                        })
                    }
                })
            }
        }
    })
}


exports.addCustomerNumber = function (req, res) {
    masterAccount.findOne({
        '_id': req.params.id
    }).select().exec(function (err, findData) {
        if (err) {
            res.status(500).json(err);
        } else {
           findData.mobileNumber = req.body.mobileNumber;
            findData.save(function (err, Data) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    masterAccount.findOne({
                        '_id': req.params.id
                    }).select().exec(function (err, data) {
                        if (err) {
                            res.status(500).json(err);
                        } else {
                            res.status(200).json(data);
                        }
                    })
                }
            })
        }
    })
}

exports.uploadBaseSingleImage = function (req, res) {
    const base64Data = Buffer.from(req.body.customerImageName.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    const type = req.body.customerImageName.split(';')[0].split('/')[1]
    const params = {
      Bucket: env.Bucket + '/' + 'images' + '/' + 'customerImages' + '/' + req.params.id, // create a folder and save the image
      Key: req.body.customerName,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      Body: base64Data,
      ContentType: `image/${type}`
    };
  
    s3.upload(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(data);
      }
    });
  }

    exports.addCustomerImageName = function(req, res) {
        masterAccount.findOne({'_id': req.params.id}).select().exec(function(err, findData) {
            if(err) {
                res.status(500).json(err);
            } else {
                findData.customerImageName = req.body.customerImageName;
                findData.save(function(err, data) {
                    if(err) {
                        res.status(500).json(err);
                    } else {
                        masterAccount.findOne({'_id': req.params.id}).select().exec(function(err, secondData) {
                            if(err) {
                                res.status(500).json(err);
                            } else {
                                secondData.customerImageName = env.ImageServerPath + 'customerImages' + '/' + req.params.id + '/' + secondData.customerImageName;
                                res.status(200).json(secondData);
                            }
                        })
                    }
                })
            }
        })
    }
    
    exports.getCustomerDetails = function(req,res){
        masterAccount.findOne({'_id':req.params.id}).select().exec(function(err,data){
            if(err){
                req.status(500).json(err);
            }else{
                res.status(200).json(data)
            }
        })
    }