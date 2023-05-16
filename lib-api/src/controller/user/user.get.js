const { User } = require('../../models/user.model');
const makeMongoDbService = require('../../services/mongoDbService')({ model: User});
const message = require('../../utils/messages');
const responseCode = require('../../utils/responseCode');

// Retrieve and return all users from the database.
exports.findAll = async (req) => {

  try{
    let meta = {};
    const {pageNumber, pageSize} = req.query;
    let query = {_id: { $ne: req.user ? req.user._id :  req.admin._id}};

    const select = ["firstname",  "lastname", "email", "role"];
    let createdUser = [];
    if (pageSize && pageNumber) {
      createdUser = await makeMongoDbService.getDocumentByQueryPopulate(
        query,
        select,
        population,
        pageNumber,
        pageSize
      );
      const userCount = await makeMongoDbService.getCountDocumentByQuery(query);
      meta = {
        pageNumber,
        pageSize,
        totalCount: userCount,
        prevPage: parseInt(pageNumber) === 1 ? false : true,
        nextPage:
          parseInt(userCount) / parseInt(pageSize) <= parseInt(pageNumber)
            ? false
            : true,
        totalPages: Math.ceil(parseInt(userCount) / parseInt(pageSize)),
      };
    } else {
      createdUser = await makeMongoDbService.getDocumentByQueryPopulate(
        query,
        select,
        population
      );
      meta.totalCount = createdUser.length;
    }
    return message.successResponse(
      { 'Content-Type': 'application/json' },
      responseCode.success,
      createdUser,
      meta
    );
  }
  catch(error) {
    if (error.name === 'ValidationError'){
      return message.inValidParam(
        { 'Content-Type': 'application/json' },
        responseCode.validationError,
        error.message
      );
    }
    return message.failureResponse(
      { 'Content-Type': 'application/json' },
      responseCode.internalServerError,
      error.message
    );
  }

};

exports.findById = async(req) => {
  try{
    const {id} = req.params;
    const query = {_id: id};
    const select = ["firstname",  "lastname", "email", "role"];
    let getUser = await makeMongoDbService.getSingleDocumentByQuery(query, select);

    return message.successResponse(
      { 'Content-Type': 'application/json' },
      responseCode.success,
      getUser
    );
  }
  catch(error) {
    if(error.kind === 'ObjectId') {
      return message.recordNotFound(
        { 'Content-Type': 'application/json' },
        responseCode.notFound,
      );
    }
    return message.failureResponse(
      { 'Content-Type': 'application/json' },
      responseCode.internalServerError,
    ); 
  }
};


// Find by email
exports.findByEmail = async (req) => {
	
  try{
    const email = req.params.email;
    const query = {email};
    const select = ["firstname",  "lastname", "email", "role"];
    const createdUser = await makeMongoDbService.getSingleDocumentByQuery(query, select);

    return message.successResponse(
      { 'Content-Type': 'application/json' },
      responseCode.success,
      createdUser
    );
  }
  catch(error) {
    if(error.kind === 'ObjectId') {
      return message.recordNotFound(
        { 'Content-Type': 'application/json' },
        responseCode.notFound,
      );
    }
    return message.failureResponse(
      { 'Content-Type': 'application/json' },
      responseCode.internalServerError,
    );
  }
};