const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    teamInvite (id: ID): TeamInvite
    teamInvites (teamId: String, userId: String): [TeamInvite!]!
  }

  # extend type Mutation {
  #   signUp(email: String!, username: String!, name: String): User
  # }

  type TeamInvite {
    id: ID!
    _id: String!
    
    _team: String
    _user: String
    team: Team
    user: User
    isRequested: Boolean

    createdAt: String
    updatedAt: String
  }
`;