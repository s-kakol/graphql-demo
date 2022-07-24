const { ApolloServer, gql } = require('apollo-server');
const { v1: uuid } = require('uuid');
let authors = require('./data/authors');
let books = require('./data/books');

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    booksCount: Int!
  }

  type Query {
    authorCount: Int!
    booksCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
  }
`;

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    booksCount: () => books.length,
    allBooks: (_root, args) => {
      let result = books;
      if (args.author) {
        result = result.filter(book => book.author === args.author);
      }
      if (args.genre) {
        result = result.filter(book => book.genres.includes(args.genre));
      }
      return result;
    },
    allAuthors: () => authors,
  },

  Author: {
    booksCount: root => {
      return books.filter(book => book.author === root.name).length;
    },
  },

  Mutation: {
    addBook: (_root, args) => {
      const newBook = { ...args, id: uuid() };
      books = books.concat(newBook);
      return newBook;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
