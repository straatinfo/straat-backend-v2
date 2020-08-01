const mongoose = require('mongoose');
const pWaterfall = require('p-waterfall');
const { gql } = require('apollo-server-express');
const { 
  Report,
  User,
  ReportType,
  MediaUpload,
  Host,
  MainCategory,
  SubCategory,
  Team,
  Conversation
} = require('../../models');

const {
  nearReports,
  publicReports,
  sendReport,
  updateReport,
  authorization } = require('../helpers');

module.exports = {
  Query: {
    reports: (root, arg, context, info) => {
      const query = {};
      if (arg.softRemoved) {
        query.softRemoved = arg.softRemoved;
      }
      if (arg.hostId) {
        query._host = arg.hostId;
      }

      if (arg.teamId) {
        query._team = arg.teamId;
      }

      if (arg.isPublic) {
        query.isPublic = arg.isPublic;
      }

      if (arg.code) {
        const code = arg.code && arg.code.toUpperCase();
        return ReportType.findOne({ code })
          .then((reportType) => {
            if (!reportType || !reportType._id) return [];

            query._reportType = reportType._id;
            return Report.find(query);
          });
      }
      let reportQuery = Report.find(query);
      if (arg.sort && arg.sort.field) {
        const order = arg.sort && arg.sort.asc ? 1 : -1;
        const field = arg.sort.field;
        reportQuery = reportQuery.sort([field, order]);
      }

      return reportQuery;
    },
    publicReports: async (root, arg, context, info) => {
      context.req.body = arg;

      try {
        const req = await pWaterfall([
          authorization._isAuthenticated,
          publicReports._verifyReporter,
          publicReports._getReports
        ], context.req);
        return req.$scope.reports || [];
      } catch (e) {
        context.req.log.error(e, 'Public Reports Query Error');
        return []
      }
    },
    nearReports: async (root, arg, context, info) => {
      context.req.body = arg;

      try {
        const req = await pWaterfall([
          authorization._isAuthenticated,
          nearReports._getReports
        ], context.req);
        return req.$scope.reports || [];
      } catch (e) {
        context.req.log.error(e, 'Near Reports Query Error');
        return [];
      }
    },
    report: (root, {id, generatedReportId}, context, info) => {
      const query = {};
      let hasQ = false;
      if (id) {
        if (mongoose.Types.ObjectId.isValid(id)) { 
          hasQ = true
          query._id = id;
        } else {
          hasQ = true
          query.generatedReportId = id;
        }
      }

      if (generatedReportId) {
        hasQ = true
        query.generatedReportId = generatedReportId;
      }

      if (hasQ) {
        return Report.findOne(query);
      } else {
        return null;
      }

    }
  },
  Report: {
    attachments: async (report, arg, context, info) => {
      const r = await Report.findById(report._id).populate('attachments');
      return r.attachments;
    },
    reporter: (report, arg, context, info) => User.findById(report._reporter),
    reportType: (report, arg, context, info) => ReportType.findById(report._reportType),
    host: (report, arg, context, info) =>  Host.findById(report._host),
    mainCategory: (report, arg, context, info) => MainCategory.findById(report._mainCategory),
    subCategory: (report, arg, context, info) => SubCategory.findById(report._subCategory),
    team: (report, arg, context, info) => Team.findById(report._team),
    teams: async (report, arg, context, info) => {
      const r = await Report.findById(report._id).populate('teams');
      return r.teams;
    },
    conversation: (report, arg, context, info) => Conversation.findById(report._conversation)
  },
  Mutation: {
    sendReportTypeA: async (root, arg, context, info) => {
      context.req.body = arg;
      context.req.body.reportTypeCode = 'A';

      try {
        const req = await pWaterfall([
          sendReport._getReportType,
          sendReport._checkTeamValidity,
          sendReport._createReport,
          sendReport._populateReport,
          sendReport._sendReportTypeADeepLink
        ], context.req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully created a report',
          id: req.$scope.report && req.$scope.report.generatedReportId
        };
      } catch (e) {
        context.req.log.error(e, 'Create report type A');
        if (e && e.status && e.httpCode) {
          return e;
        }
        return {
          status: 'ERROR',
          statusCode: 100,
          httpCode: 500,
          message: 'Internal server error'
        };
      }
    },
    sendReportTypeB: async (root, arg, context, info) => {
      context.req.body = arg;
      context.req.body.reportTypeCode = 'B';

      try {
        const req = await pWaterfall([
          sendReport._getReportType,
          sendReport._checkTeamValidity,
          sendReport._createReport,
          sendReport._populateReport,
          sendReport._sendReportTypeBNotification
        ], context.req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully created a report',
          id: req.$scope.report && req.$scope.report.generatedReportId
        };
      } catch (e) {
        context.req.log.error(e, 'Create report type A');
        if (e && e.status && e.httpCode) {
          return e;
        }
        return {
          status: 'ERROR',
          statusCode: 100,
          httpCode: 500,
          message: 'Internal server error'
        };
      }
    },
    sendReportTypeC: async (root, arg, context, info) => {
      context.req.body = arg;
      context.req.body.reportTypeCode = 'C';

      try {
        const req = await pWaterfall([
          sendReport._getReportType,
          sendReport._createReportC,
          sendReport._populateReport,
          sendReport._sendReportTypeCNotification
        ], context.req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully created a report',
          id: req.$scope.report && req.$scope.report.generatedReportId
        };
      } catch (e) {
        context.req.log.error(e, 'Create report type C');
        if (e && e.status && e.httpCode) {
          return e;
        }
        return {
          status: 'ERROR',
          statusCode: 100,
          httpCode: 500,
          message: 'Internal server error'
        };
      }
    },
    updateReport: async (root, arg, context, info) => {
      context.req.body = arg;
      try {
        const req = await pWaterfall([
          updateReport._getReport,
          updateReport._validateBody,
          updateReport._updateReport
        ], context.req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully created a report',
          id: req.$scope.report && req.$scope.report.generatedReportId
        };
      } catch (e) {
        context.req.log.error(e, 'Update Report Error');
        if (e && e.status && e.httpCode) {
          return e;
        }
        return {
          status: 'ERROR',
          statusCode: 100,
          httpCode: 500,
          message: 'Internal server error'
        };
      }
    }
  }
};
