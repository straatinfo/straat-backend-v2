const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    subCategory (id: ID): SubCategory
    subCategories (mainCategoryId: String): [SubCategory!]!
  }

  extend type Mutation {
    addSubCategory (
      mainCategoryId: String!,
      name: String!,
      dutchName: String!,
      description: String
    ): Response
    deleteSubCategory (id: ID): Response
  }


  type SubCategory {
    id: ID!
    _id: String!
    name: String!
    translations: [CategoryTranslation!]!
    softRemoved: Boolean
    description: String
    _mainCategory: String
    mainCategory: MainCategory
    createdAt: String
    updatedAt: String
  }
`;