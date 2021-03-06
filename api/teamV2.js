const TeamHelper = require('../helpers/teamV2.helper');
const MediaUploadHelper = require('../helpers/mediaUpload.helper');

const updateTeam = async (req, res, next) => {
  try {
    const {keyword, _user, _team} = req.query;
    let processTeam;
     // ma backtic tayo dito
    if (keyword.toLowerCase() === 'setactiveteam') {
      processTeam = await TeamHelper.setActiveTeam(_user, _team);
    } else if (keyword.toLowerCase() === 'setleader') {
      processTeam = await TeamHelper.setAsLeader(_user, _team);
    } else if (keyword.toLowerCase() === 'setmember') {
      processTeam = await TeamHelper.setAsMember(_user, _team);
    } else if (keyword.toLowerCase() === 'join') {
      processTeam = await TeamHelper.joinTeam(_user, _team);
    } else if (keyword.toLowerCase() === 'unjoin') {
      processTeam = await TeamHelper.unJoinTeam(_user, _team);
    } else {
      return res.status(404).send({
        status: 0,
        statusCode: 404,
        error: 'KEYWORD_NOT_FOUND',
        message: 'No key word or invalid keyword'
      });
    }
    res.status(200).send({
      status: 1,
      statusCode: 200,
      message: 'Successfully proccessed request',
      data: processTeam
    });
  }
  catch (e) {
    console.log(e);
    if (e.statusCode) {
      return res.status(e.statusCode).send(e);
    }
    res.status(500).send({
      status: 0,
      error: 'SERVER_ERROR',
      message: 'Internal Server Error',
      statusCode: 500
    });
  }
};

const createTeam = async (req, res, next) => {
  try {
    const { _host, _user } = req.query;
    const {
      teamName, teamEmail, description,
      isVolunteer, creationMethod
    } = req.body;
    // failed when creating team if no pic
  
    let _profilePic = {}

    const saveMedia = req.file ? await MediaUploadHelper.createMediaUpload(req.file) : null
    if (saveMedia && saveMedia.err) {
      throw new Error('There is an expected problem in saving file');
    }

    if (saveMedia) {
      _profilePic = { _profilePic: saveMedia.mediaUpload._id }
    }

    const createNewTeam = await TeamHelper.createTeam(_user, _host, {...req.body, _host: _host, createdBy: _user, ..._profilePic});
    res.status(200).send({
      status: 1,
      statusCode: 200,
      message: 'Successfully created new team',
      data: createNewTeam
    });
  }
  catch (e) {
    console.log(e);
    if (e.statusCode) {
      return res.status(e.statusCode).send(e);
    }
    res.status(500).send({
      status: 0,
      error: 'SERVER_ERROR',
      message: 'Internal Server Error',
      statusCode: 500
    });
  }
};

const deleteTeam = async (req, res, next) => {
  try {
    const deleteT = await TeamHelper.deleteTeam(req.query._team);
    res.status(200).send({
      status: 1,
      statusCode: 200,
      message: 'Successfully deleted team',
      data: {}
    });
  }
  catch (e) {
    console.log(e);
    if (e.statusCode) {
      return res.status(e.statusCode).send(e);
    }
    res.status(500).send({
      status: 0,
      error: 'SERVER_ERROR',
      message: 'Internal Server Error',
      statusCode: 500
    });
  }
};

module.exports = {
  updateTeam,
  createTeam,
  deleteTeam
};
