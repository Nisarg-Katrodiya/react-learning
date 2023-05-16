/* eslint-disable no-unused-vars */
const sendResponse = require('../../helpers/sendResponse');
const userGet = require('./user.get');
const userCreate = require('./user.post');
const userUpdate = require('./user.put');
const userDelete = require('./user.delete');

exports.create = (req,res,next) => {
  userCreate.create(req)
  .then((result)=>{
      sendResponse(res,result);
  })
  .catch((e) => {
      sendResponse(res,e);
  });
};

exports.findAll = (req, res, next) => {
    userGet.findAll(req)
    .then((result)=>{
        sendResponse(res,result);
    })
    .catch((e) => {
        sendResponse(res,e);
    });
};

exports.findById = (req, res, next) => {
  userGet.findById(req)
    .then((result)=>{
        sendResponse(res,result);
    })
    .catch((e) => {
        sendResponse(res,e);
    });
};

exports.findByIds = (req, res, next) => {
  userCreate
    .findByIds(req)
    .then((result) => {
      sendResponse(res, result);
    })
    .catch((e) => {
      sendResponse(res, e);
    });
};

exports.findByEmail = (req, res, next) => {
  userGet.findByEmail(req)
    .then((result)=>{
        sendResponse(res,result);
    })
    .catch((e) => {
        sendResponse(res,e);
    });
};

exports.findByPhone = (req, res, next) => {
  userGet.findByPhone(req)
    .then((result)=>{
        sendResponse(res,result);
    })
    .catch((e) => {
        sendResponse(res,e);
    });
};

exports.update = (req, res, next) => {
  userUpdate.update(req)
    .then((result)=>{
        sendResponse(res,result);
    })
    .catch((e) => {
        sendResponse(res,e);
    });
};

exports.updateNotificationFlag = (req, res, next) => {
  userUpdate.updateNotificationFlag(req)
    .then((result)=>{
        sendResponse(res,result);
    })
    .catch((e) => {
        sendResponse(res,e);
    });
};

exports.verifyUser = (req, res, next) => {
  userUpdate.verifyUser(req)
    .then((result)=>{
        sendResponse(res,result);
    })
    .catch((e) => {
        sendResponse(res,e);
    });
};

exports.banUser = (req, res, next) => {
  userUpdate.banUser(req)
    .then((result)=>{
        sendResponse(res,result);
    })
    .catch((e) => {
        sendResponse(res,e);
    });
};

exports.blockUser = (req, res, next) => {
  userUpdate.blockUser(req)
    .then((result)=>{
        sendResponse(res,result);
    })
    .catch((e) => {
        sendResponse(res,e);
    });
};

exports.delete = (req, res, next) => {
  userDelete.delete(req)
    .then((result)=>{
        sendResponse(res,result);
    })
    .catch((e) => {
        sendResponse(res,e);
    });
};