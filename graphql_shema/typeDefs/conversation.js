const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    conversation (id: ID): Conversation
    conversations (userId: String): [Conversation!]!
  }

  extend type Mutation {
    # sendMessage(email: String!, username: String!, name: String):
    joinConversation (id: String!, userId: String!): Response
  }

  type Conversation {
    id: ID!
    _id: String!
    
    _profilePic: String
    profilePic: MediaUpload
    participants: [User!]!
    messages: [Message!]!

    createdAt: String
    updatedAt: String
  }
`;