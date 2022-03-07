const { AuthenticatinError } = require('apollo-server-express');
const { Book, User } = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {

};

module.exports = resolvers;