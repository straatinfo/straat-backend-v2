const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    design (id: ID): Design
    designs (hostId: String): [Design!]!
  }

  extend type Mutation {
    addDesign (hostId: String, colorOne: String, colorTwo: String, colorThree: String, profilePic: String): Response
    updateDesign (id: ID, colorOne: String, colorTwo: String, colorThree: String, profilePic: String): Response
  }

  type Design {
    id: ID!
    _id: String!
    
    designName: String
    colorOne: String
    colorTwo: String
    colorThree: String
    colorFour: String
    _profilePic: String
    profilePic: MediaUpload
    _host: String
    host: Host

    createdAt: String
    updatedAt: String
  }
`;