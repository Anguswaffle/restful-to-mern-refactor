const { AuthenticatinError, AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  // Retrieves a single user 
  Query: {
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId })
    },

    me: async (parent, args, context) => {
      if(context.user) {
        return Profile.findOne({_id: context.user._id});
      }
      throw new AuthenticationError('You need to be logged in!')
    }
  },


}

module.exports = resolvers;