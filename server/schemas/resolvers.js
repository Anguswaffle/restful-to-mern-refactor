const { AuthenticatinError, AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Retrieves the logged in user 
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!')
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect email or password!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect email or password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    // Maybe rewrite this later
    saveBook: async (parent, body, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: body } },
          {
            new: true,
            runValidators: true
          }
        );
      }

      // Throws error if there is no context
      throw new AuthenticationError('You need to be logged in!');
    },

    // Maybe rewrite this later
    removeBook: async (parent, bookId, context) => {
      if(context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id},
          { $pull: {savedBooks: {bookId: bookId}}},
          {new: true}
        );
      }

      // Throws error if there is no context
      throw new AuthenticationError('You need to be logged in!')
    }    
  }

}

module.exports = resolvers;