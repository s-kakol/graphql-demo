const { ApolloServer, gql } = require('apollo-server');
const authors = require('./data/authors');
const books = require('./data/books');

const typeDefs = gql`
  type Query {
    authorCount: Int!
    booksCount: Int!
  }
`;

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    booksCount: () => books.length,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
