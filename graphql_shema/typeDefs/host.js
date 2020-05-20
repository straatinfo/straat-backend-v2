const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    host (id: ID, email: String): Host
    hosts (softRemoved: Boolean): [Host!]!
  }

  extend type Mutation {
    setToSpecific (id: ID): Response
    setToGeneral (id: ID): Response
    activateHost (id: ID): Response
    deactivateHost (id: ID): Response
    updateHost (
      id: ID, email: String,
      houseNumber: String,
      streetName: String,
      state: String,
      country: String,
      postalCode: String,
      phoneNumber: String,
      hostAlternateName: String,
      hostPersonalEmail: String,
      long: Float,
      lat: Float,
      language: String
    ): Response
    softRemoveHost (id: ID): Response
  }

  type Host {
    id: ID!
    _id: String!
    email: String!
    hostPersonalEmail: String
    username: String!
    houseNumber: String
    streetName: String
    city: String
    state: String
    country: String
    postalCode: String
    phoneNumber: String
    long: Float
    lat: Float
    hostName: String!
    hostAlternateName: String
    language: String
    isVolunteer: Boolean
    isBlocked: Boolean
    isActivated: Boolean
    isSpecific: Boolean
    softRemoved: Boolean
    setting: Setting
    _role: String
    role: Role
    firebaseTokens: [FirebaseToken!]!
    geoLocation: GeoLocation
    _design: String
    design: Design
    createdAt: String
    updatedAt: String
  }
`;