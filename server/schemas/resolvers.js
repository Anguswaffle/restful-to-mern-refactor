const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Retrieves the logged in user 
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!')
    }
  },
  Mutation: {
    // Adds a new user to the db, returns an auth object
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    // Logs in a user, returns an auth object
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
    // Accepts a book object, identifies a user from the context, and stores the book in the user's savedBooks array
    saveBook: async (parent, { book }, context) => {
      if (context.user) {
        const user = User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book } },
          {
            new: true,
            runValidators: true
          }
        );
        return user;
      }

      // Throws error if there is no context
      throw new AuthenticationError('You need to be logged in!');
    },
    // Accepts a bookId, identifies a user from the context, and removes the book from the user's savedBooks array
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        );
      }

      // Throws error if there is no context
      throw new AuthenticationError('You need to be logged in!')
    }
  }
}

module.exports = resolvers;