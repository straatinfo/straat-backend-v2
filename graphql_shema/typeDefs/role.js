const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    role (id: ID, code: String): Role
    roles: [Role!]!
  }

  # extend type Mutation {
  #   signUp(email: String!, username: String!, name: String): User
  # }

  type Role {
    id: ID!
    _id: String!
    name: String!
    code: String!
    accessLevel: Int!
    description: String
    createdAt: String
    updatedAt: String
  }
`;