const ReporterHelper = require('../helpers/reporter.helper');
const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');
const TeamHelper = require('../helpers/team.helper');
const TeamInviteHelper = require('../helpers/teamInvite.helper');
const _ = require('lodash');

const getReporters = async (req, res, next) => {
  try {
    const getR = await ReporterHelper.getReporters();
    if (getR.err) {
      return ErrorHelper.ClientError(res, {error: getR.err}, 400);
    }

    const updatedReporters = await Promise.all(getR.reporters.map(async(r) => {
      let reporter = r, status2;
      const findActiveTeam = await TeamHelper.findActiveTeam(r._id);
      const getPendingInvite = await TeamInviteHelper.getRequestListByUser(r._id, true);
      const invite = _.find(getPendingInvite.teamInvites, (i) => {
        return i._team === (findActiveTeam.activeTeam) ? findActiveTeam.activeTeam._id : 'asdf';
      });
      // set status1
      let status1;
      if (r.isBlocked) {
        status1 = 'BLOCK';
      } else if (invite && invite.isRequest) {
        status1 = 'WAITING';
      } else if (!invite && r.isBlocked === false) {
        status1 = 'ACTIVE'
      } else {
        status1 = '';
      }

      //set status2
      status2 = (findActiveTeam.teamLeader) ? 'LEADER' : (findActiveTeam.teamMember) ? 'MEMBER' : 'INDIVIDUAL';
      const data = {...r.toObject(), activeTeam: findActiveTeam.activeTeam, status1: status1, status2: status2 };
      return data;
    }));

    if(req.query.flat) {
      const data = updatedReporters;
      req.reporters = data;
      return next();
    }

    SuccessHelper.success(res, updatedReporters);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const getReporterById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getRBI = await ReporterHelper.getReporterById(id);
    if (getRBI.err) {
      return ErrorHelper.ClientError(res, {error: getRBI.err}, 400);
    }
    if (!getRBI.reporter) {
      return SuccessHelper.success(res, null);
    }
    let r = getRBI.reporter, status2;
    const findActiveTeam = await TeamHelper.findActiveTeam(r._id);
    const getPendingInvite = await TeamInviteHelper.getRequestListByUser(r._id, true);
    const invite = _.find(getPendingInvite.teamInvites, (i) => {
      return i._team === (findActiveTeam.activeTeam) ? findActiveTeam.activeTeam._id : 'asdf';
    });
    // set status1
    let status1;
    if (r.isBlocked) {
      status1 = 'BLOCK';
    } else if (invite && invite.isRequest) {
      status1 = 'WAITING';
    } else if (!invite && r.isBlocked === false) {
      status1 = 'ACTIVE'
    } else {
      status1 = '';
    }

    //set status2
    status2 = (findActiveTeam.teamLeader) ? 'LEADER' : (findActiveTeam.teamMember) ? 'MEMBER' : 'INDIVIDUAL';
    const data = {...r.toObject(), activeTeam: findActiveTeam.activeTeam, status1: status1, status2: status2 };
    if (req.query.flat === 'true') {
      const reporter = await ReporterHelper.flatReporter(data);
      if (reporter.err) {
        return ErrorHelper.ClientError(res, {error: reporter.err}, 400);
      }
      return SuccessHelper.success(res, reporter.reporter);
    }
    SuccessHelper.success(res, data);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const getReportersByHost = async (req, res, next) => {
  const { hostId } = req.params;
  try {
    const getRBH = await ReporterHelper.getReportersByHost(hostId);
    if (getRBH.err) {
      return ErrorHelper.ClientError(res, {error: getRBH.err}, 400);
    }
    const updatedReporters = await Promise.all(getRBH.reporters.map(async(r) => {
      let reporter = r, status2;
      const findActiveTeam = await TeamHelper.findActiveTeam(r._id);
      const getPendingInvite = await TeamInviteHelper.getRequestListByUser(r._id, true);
      const invite = _.find(getPendingInvite.teamInvites, (i) => {
        return i._team === (findActiveTeam.activeTeam) ? findActiveTeam.activeTeam._id : 'asdf';
      });
      // set status1
      let status1;
      if (r.isBlocked) {
        status1 = 'BLOCK';
      } else if (invite && invite.isRequest) {
        status1 = 'WAITING';
      } else if (!invite && r.isBlocked === false) {
        status1 = 'ACTIVE'
      } else {
        status1 = '';
      }

      //set status2
      status2 = (findActiveTeam.teamLeader) ? 'LEADER' : (findActiveTeam.teamMember) ? 'MEMBER' : 'INDIVIDUAL';
      const data = {...r.toObject(), activeTeam: findActiveTeam.activeTeam, status1: status1, status2: status2 };
      return data;
    }));

    if(req.query.flat) {
      const data = updatedReporters;
      req.reporters = data;
      return next();
    }

    SuccessHelper.success(res, updatedReporters);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const blockReporter = async (req, res, next) => {
  const { id } = req.params;
  try {
    const blockR = await ReporterHelper.blockReporter(id);
    if (blockR.err) {
      return ErrorHelper.ClientError(res, {error: blockR.err}, 400);
    }
    SuccessHelper.success(res, blockR.reporter, `User ID: ${id} has been blocked`);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const unBlockReporter = async (req, res, next) => {
  const { id } = req.params;
  try {
    const unblockR = await ReporterHelper.unBlockReporter(id);
    if (unblockR.err) {
      return ErrorHelper.ClientError(res, {error: unblockR.err}, 400);
    }
    SuccessHelper.success(res, unBlockR.reporter, `User ID: ${id} has been unblocked`);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const deleteReporter = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteR = await ReporterHelper.deleteReporter(id);
    if (deleteR.err) {
      return ErrorHelper.ClientError(res, {error: deleteR.err}, 400);
    }
    SuccessHelper.success(res, deleteR.reporter);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  getReporters: getReporters,
  getReporterById: getReporterById,
  blockReporter: blockReporter,
  unBlockReporter: unBlockReporter,
  getReportersByHost: getReportersByHost,
  deleteReporter: deleteReporter
};
