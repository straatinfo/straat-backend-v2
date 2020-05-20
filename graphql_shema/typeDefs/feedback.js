const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    feedback (id: ID): Feedback
    feedbacks (userId: String): [Feedback!]!
  }

  # extend type Mutation {
  #   signUp(email: String!, username: String!, name: String): User
  # }

  type Feedback {
    id: ID!
    _id: String!
    
    _user: String
    user: User
    message: String
    device: String

    createdAt: String
    updatedAt: String
  }
`;