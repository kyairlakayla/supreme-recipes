const express = require('express');
const { ApolloServer } = require('apollo-server-express');
//const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
    // create a new Apollo server and pass our schema data
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    // start Apollo server
    await server.start();
    // integrate our Apollo server with the Express application as middleware
    server.applyMiddleware({ app });
    // log where we can go to test our GQL API 
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

startServer();

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
});