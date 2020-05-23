const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    team (id: ID): Team
    teams (softRemoved: Boolean, hostId: String, isVolunteer: Boolean): [Team!]!
    unJoinedTeams (hostId: String!, userId: String!): [Team!]!
  }

  extend type Mutation {
    createTeam(teamName: String!, teamEmail: String!, isVolunteer: Boolean!, hostId: String!, creationMethod: String, profilePic: String, reporterId: String): Response
    updateTeam(id: ID!, teamName: String, teamEmail: String, profilePic: String): Response
    softRemoveTeam(id: String!): Response
  }

  type Team {
    id: ID!
    _id: String!
    
    teamName: String
    teamEmail: String
    description: String
    isVolunteer: Boolean
    isApproved: Boolean
    isDeclined: Boolean
    softRemoved: Boolean
    createdBy: String
    creationMethod: String
    _host: String
    host: Host
    _profilePic: String
    profilePic: MediaUpload
    _conversation: String
    conversation: Conversation
    teamMembers: [TeamMember!]!
    teamInvites: [TeamInvite!]!

    createdAt: String
    updatedAt: String
  }
`;