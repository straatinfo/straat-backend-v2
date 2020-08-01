const { gql } = require('apollo-server-express');
module.exports = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  type Subscription {
    _: String
  }

  input Sort {
    field: String,
    asc: Boolean
  }

  type Response {
    status: String
    statusCode: Int
    httpCode: Int
    message: String
    id: String
  }

`;