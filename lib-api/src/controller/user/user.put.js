const { User } = require('../../models/user.model');
const makeMongoDbServiceUser = require('../../services/mongoDbService')({ model: User});
const message = require('../../utils/messages');
const responseCode = require('../../utils/responseCode');

// Update a User identified by the id in the request
exports.update = async(req) => {
  try{

    const id = req.params.id;
    
    const userExistingData = await makeMongoDbServiceUser.getSingleDocumentById(id);
    if(!userExistingData) {
      return message.recordNotFound(
        { 'Content-Type': 'application/json' },
        responseCode.notFound,
      );
    }

    // Find user and update it with the request body
    let userData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email?.toLowerCase(),
      role: req.body.role ? req.body.role : 'user',
    };

    await makeMongoDbServiceUser.updateDocument(id, userData);
    const select = ["firstname",  "lastname", "email", "role"];
    const finalData = await makeMongoDbServiceUser.getSingleDocumentById(id, select);

    return message.successResponse(
      { 'Content-Type': 'application/json' },
      responseCode.success,
      finalData
    );

  }
  catch(error) {
    console.log("🚀 ~ file: user.put.js ~ line 61 ~ exports.update=async ~ error", error);
    return message.failureResponse(
      { 'Content-Type': 'application/json' },
      responseCode.internalServerError,
    );
  }
};