const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    report (id: ID, generatedReportId: String): Report
    reports (
      userId: String,
      hostId: String,
      softRemoved: Boolean,
      teamId: String,
      code: String,
      isPublic: Boolean,
      sort: Sort
    ): [Report!]!

    publicReports (
      code: String,
      hostId: String,
      sort: Sort
    ): [Report!]!

    nearReports (
      hostId: String,
      long: Float!,
      lat: Float!,
      radius: Float!,
      userId: String,
      sort: Sort
    ): [Report!]!
  }

  # extend type Mutation {
  #   signUp(email: String!, username: String!, name: String): User
  # }

  type Report {
    id: ID!
    _id: String!
    
    generatedReportId: String!
    title: String
    description: String
    location: String
    long: Float
    lat: Float
    note: String
    status: String
    isUrgent: Boolean
    isPublic: Boolean
    isInMap: Boolean
    isVehicleInvolved: Boolean
    vehicleInvolvedCount: Int
    vehicleInvolvedDescription: String
    isPeopleInvolved: Boolean
    peopleInvolvedCount: Int
    peopleInvolvedDescription: String
    finishedDate: String
    causeOfFinished: String
    geoLocation: GeoLocation
    attachments: [MediaUpload!]!
    _reporter: String
    reporter: User
    _host: String
    host: Host
    _reportType: String
    reportType: ReportType
    _mainCategory: String
    mainCategory: MainCategory
    _subCategory: String
    subCategory: SubCategory
    _team: String
    team: Team
    teams: [Team!]!
    _conversation: String
    conversation: Conversation

    createdAt: String
    updatedAt: String
  }

  extend type Mutation {
    sendReportTypeA (
      title: String,
      description: String,
      location: String,
      long: Float,
      lat: Float,
      mainCategoryId: String,
      subCategoryId: String,
      isUrgent: Boolean,
      reporterId: String,
      hostId: String,
      teamId: String,
      attachments: [String!]!
    ): Response

    sendReportTypeB (
      title: String,
      description: String,
      location: String,
      long: Float,
      lat: Float,
      mainCategoryId: String,
      isUrgent: Boolean,
      reporterId: String,
      hostId: String,
      teamId: String,
      attachments: [String!]!
      isVehicleInvolved: Boolean!,
      vehicleInvolvedCount: Int,
      vehicleInvolvedDescription: String,
      isPeopleInvolved: Boolean!,
      peopleInvolvedCount: Int,
      peopleInvolvedDescription: String
    ): Response

    sendReportTypeC (
      title: String,
      description: String,
      location: String,
      long: Float,
      lat: Float,
      mainCategoryId: String,
      isUrgent: Boolean,
      reporterId: String,
      hostId: String,
      teamId: String,
      isInMap: Boolean,
      attachments: [String!]!,
      teamList: [String!]!
    ): Response

    updateReport (
      id: String!
      isPublic: Boolean
      note: String
      status: String
    ): Response
  }
`;