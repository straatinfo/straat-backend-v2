const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    teamMember (id: ID): TeamMember
    teamMembers (userId: String, teamId: String): [TeamMember!]!
  }

  extend type Mutation {
    setActiveTeam(userId: String!, teamId: String!): Response
    unJoinTeam(userId: String!, teamId: String!): Response
    joinTeam(userId: String!, teamId: String!): Response
    setAsMember(userId: String!, teamId: String!): Response
    setAsLeader(userId: String!, teamId: String!): Response
  }

  type TeamMember {
    id: ID!
    _id: String!
    
    _user: String
    user: User
    _team: String
    team: Team
    active: Boolean
    isLeader: Boolean
    isBlocked: Boolean

    createdAt: String
    updatedAt: String
  }
`;