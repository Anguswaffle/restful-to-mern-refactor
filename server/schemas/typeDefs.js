const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  # Context functionality allows us to check a JWT and decode its data, which means we can use a query that will always find and return teh logged in user's data
  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String! password: String!): Auth
    login(email: String!, password: String!): Auth

    saveBook(book: BookInput): User
    removeBook(bookId: String): User
  }

  # input type defines BookInput in the saveBook mutation
  input BookInput {
    bookId: String!
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
  }
`;

module.exports = typeDefs;