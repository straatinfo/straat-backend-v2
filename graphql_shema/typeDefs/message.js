const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    message (id: ID): Message
    messages (conversationId: String, userId: String): [Message!]!
  }

  extend type Mutation {
    sendMessage(
      conversationId: String!,
      type: String!,
      reportId: String,
      teamId: String,
      body: String,
      attachments: [String!]): Response
    editMessage(messageId: String, body: String): Response
    deleteMessage(messageId: String): Response
    # readMessages(userId: String, conversationId: String): Response
    # readAllMessages(userId: String): Response
  }

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