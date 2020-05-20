const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    mainCategory (id: ID): MainCategory
    mainCategories (hostId: String, reportTypeId: String, reportTypeCode: String): [MainCategory!]!
  }

  extend type Mutation {
    addMainCategory (
      hostId: String,
      reportTypeCode: String!,
      name: String!,
      dutchName: String!,
      description: String
    ): Response
    deleteMainCategory (id: ID): Response
  }

  type CategoryTranslation {
    code: String,
    word: String
  }

  type MainCategory {
    id: ID!
    _id: String!
    name: String!
    translations: [CategoryTranslation!]!
    softRemoved: Boolean
    description: String
    _host: String
    host: Host
    _reportType: String
    reportType: ReportType
    createdAt: String
    updatedAt: String
    subCategories: [SubCategory!]!
  }
`;