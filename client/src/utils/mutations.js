import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!){
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token 
      user {
        _id
        username
      }
    }
  }`;

  // This doesn't look right maybe figure this out later
export const SAVE_BOOK = gql`
  mutation saveBook($book: BookInput){
    saveBook(book: $book) {
      _id
      username
      bookCount
      savedBooks{
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookID) {
      _id
      username
      bookCount
      savedBooks{
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }`;