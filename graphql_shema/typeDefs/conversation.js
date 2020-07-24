const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    conversation (id: ID): Conversation
    conversations (userId: String): [Conversation!]!
  }

  # extend type Mutation {
  #   sendMessage(email: String!, username: String!, name: String): 
  # }

  type Conversation {
    id: ID!
    _id: String!
    
    _profilePic: String
    profilePic: MediaUpload
    participants: [User!]!
    messages (receiverId: String): [Message!]!

    createdAt: String
    updatedAt: String
  }
`;