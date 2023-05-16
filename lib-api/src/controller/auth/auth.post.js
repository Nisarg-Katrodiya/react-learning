const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../../models/user.model');
const makeMongoDbServiceUser = require('../../services/mongoDbService')({ model: User});
const message = require('../../utils/messages');
const responseCode = require('../../utils/responseCode');

// login 
exports.login = async(req) => {
  try{
    const { email, password } = req.body;
    if(!req.body) return message.badRequest(
      { 'Content-Type': 'application/json' },
      responseCode.badRequest,
    );

    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    let query = {};
    if (emailRegexp.test(email)) {
      query = {email: email?.toLowerCase()};
    }
    const user = await makeMongoDbServiceUser.getSingleDocumentByQuery(query);
    if(!user) return message.passwordEmailWrong(
      { 'Content-Type': 'application/json' },
      responseCode.badRequest,
      );

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) {
      return message.passwordEmailWrong(
        { 'Content-Type': 'application/json' },
        responseCode.badRequest,
      );
    } else {
      const token = user.generateAuthToken();

      const createdUser =  user.toJSON();

      const returnData = {
        token,
        ...createdUser,
      };
      
      return message.loginSuccess(
        { 'Content-Type': 'application/json' },
        responseCode.success,
        _.pick(returnData, ["id","firstname","lastname","email","role", "token"]),
      );
    }
  }
  catch(error) {
    console.log("🚀 ~ file: auth.post.js ~ line 72 ~ exports.login=async ~ error", error);
    return message.failureResponse(
      { 'Content-Type': 'application/json' },
      responseCode.internalServerError,
    );
  }
};