const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    message (id: ID): Message
    messages (conversationId: String, userId: String): [Message!]!
  }

  # extend type Mutation {
  #   signUp(email: String!, username: String!, name: String): User
  # }

  type Message {
    id: ID!
    _id: String!
    
    _author: String
    author: User
    body: String
    attachments: [MediaUpload!]!
    _conversation: String
    conversation: Conversation

    createdAt: String
    updatedAt: String
  }
`;