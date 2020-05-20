const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    mediaUpload (id: ID): MediaUpload
    mediaUploads: [MediaUpload!]!
  }

  # extend type Mutation {
  #   signUp(email: String!, username: String!, name: String): User
  # }

  type MediaUpload {
    id: ID!
    _id: String!
    
    public_id: String
    mimetype: String
    url: String
    secure_url: String
    format: String
    etag: String
    width: Int
    height: Int

    createdAt: String
    updatedAt: String
  }
`;