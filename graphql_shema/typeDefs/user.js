const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    user (id: ID, email: String): User
    users (softRemoved: Boolean, hostId: String): [User!]!
  }

  extend type Mutation {
    # signUp(email: String!, username: String!, name: String): User
    blockUser (id: ID): Response
    unblockUser (id: ID): Response
    softRemoveUser (id: ID): Response
  }

  type Setting {
    isNotification: Boolean!
    vibrate: Boolean!
    radius: Int!
    isNotified: Boolean
  }

  type FirebaseToken {
    id: ID
    deviceId: String!
    platform: String
    token: String
  }

  type GeoLocation {
    type: String
    coordinates: [Float!]!
  }

  type User {
    id: ID!
    _id: String!

    email: String!
    username: String!
    fname: String
    lname: String
    gender: String
    houseNumber: String
    streetName: String
    city: String
    state: String
    country: String
    postalCode: String
    phoneNumber: String
    long: Float
    lat: Float
    language: String
    isVolunteer: Boolean
    isBlocked: Boolean
    isActivated: Boolean
    isSpecific: Boolean
    softRemoved: Boolean
    setting: Setting
    _host: String
    _role: String
    role: Role
    host: Host
    firebaseTokens: [FirebaseToken!]!
    geoLocation: GeoLocation
    teamMembers: [TeamMember!]!

    createdAt: String
    updatedAt: String
  }
`;