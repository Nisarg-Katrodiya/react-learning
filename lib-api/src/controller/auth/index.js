/* eslint-disable no-unused-vars */
const sendResponse = require('../../helpers/sendResponse');
const login = require("./auth.post");

exports.login = (req,res,next) => {
  login.login(req)
  .then((result)=>{
      sendResponse(res,result);
  })
  .catch((e) => {
      sendResponse(res,e);
  });
};
