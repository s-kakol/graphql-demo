const { ApolloServer, gql } = require('apollo-server');
const authors = require('./data/authors');
const books = require('./data/books');

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
    allBooks(author: String): [Book!]!
    allAuthors: [Author!]!
  }
`;

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    booksCount: () => books.length,
    allBooks: (_root, args) => {
      if (args.author) {
        return books.filter(book => book.author === args.author);
      }
      return books;
    },
    allAuthors: () => authors,
  },

  Author: {
    booksCount: root => {
      return books.filter(book => book.author === root.name).length;
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
