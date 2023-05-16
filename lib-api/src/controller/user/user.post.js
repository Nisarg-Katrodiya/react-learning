const bcrypt = require('bcrypt');
const { User } = require('../../models/user.model');
const makeMongoDbServiceUser = require('../../services/mongoDbService')({ model: User});
const message = require('../../utils/messages');
const responseCode = require('../../utils/responseCode');

// Create and Save a User
exports.create = async(req) => {
  try{
    const {email} = req.body;
    // Make sure this account doesn't already exist
    const user = await makeMongoDbServiceUser.getSingleDocumentByQuery({email});
    if (user) {
      return message.isAssociated(
        { 'Content-Type': 'application/json' },
        responseCode.conflict,
      );
    }
    const userData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email?.toLowerCase(),
      role: req.body.role ? req.body.role : 'user',
      password: req.body.password,
    };
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
    
    const newUser = await makeMongoDbServiceUser.createDocument(userData);
    const token = newUser.generateAuthToken();
    
    const select = ["firstname",  "lastname", "email", "role"];
    const response = await makeMongoDbServiceUser.getSingleDocumentById(newUser.id, select);
    const createdUser =  response.toJSON();
    
    const returnData = {
      ...createdUser,
      token,
    };

    return message.successResponse(
      { 'Content-Type': 'application/json' },
      responseCode.success,
      returnData
    );
  }
  catch(error) {
    console.log("🚀 ~ file: user.post.js ~ line 60 ~ exports.create=async ~ error", error);
    return message.failureResponse(
      { 'Content-Type': 'application/json' },
      responseCode.internalServerError,
    );
  }
};