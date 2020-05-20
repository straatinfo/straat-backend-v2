const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    reportType (id: ID, code: String): ReportType
    reportTypes: [ReportType!]!
  }

  # extend type Mutation {
  #   signUp(email: String!, username: String!, name: String): User
  # }

  type ReportType {
    id: ID!
    _id: String!
    name: String!
    code: String!
    description: String
    mainCategories (hostId: String): [MainCategory!]!
    createdAt: String
    updatedAt: String
  }
`;