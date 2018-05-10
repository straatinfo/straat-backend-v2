/**
 * MessageV2.js
 * Created by: John Higgins M. Avila
 * Description: This module will hold message related apis
 * 
 */
// Dependencies
const MessageHelper = require('../helpers/messageV2.helper');

const getMessages = async function (req, res, next) {
  try {
    const { _message } = req.params;
    const { keyword, _conversation, page, count, _reporter } = req.query;
    let messages;
    if (keyword.toLowerCase() === 'byid' && _message) {
      messages = await MessageHelper.getMessage(keyword, _message);
    } else if (keyword) {
      messages = await MessageHelper.getMessage(keyword, _conversation, _reporter, page, count);
    }
    if (!messages) {
      res.status(400).send({
        status: 0,
        error: 'INVALID_MESSAGE_QUERY',
        message: 'Invalid query data given',
        statusCode: 400
      });
    } else {
      res.status(200).send({
        status: 1,
        payload: messages,
        message: 'Successfully fetched message(s)',
        statusCode: 200
      });
    }
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
}

const createMessage = async function (req, res, next) {
  try {
    const { _conversation } = req.query;
    const { _author, body } = req.body;
    const message = await MessageHelper.createMessage('', _conversation, _author, body);
    res.status(200).send({
      status: 1,
      payload: message,
      message: 'Successfully created new message',
      statusCode: 200
    });
  }
  catch (e) {
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
}

const updateMessage = async function (req,res, next) {
  try {
    const { _message } = req.params;
    const { body } = req.body;
    const updatedMessage = await MessageHelper.updateMessage('', _message, body);
    res.status(200).send({
      status: 1,
      payload: updatedMessage,
      message: 'Successfully updated message',
      statusCode: 200
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
}

const deleteMessage = async function (req, res, next) {
  try {
    const deletedMessage = await MessageHelper.deleteMessage('', req.params._message);
    res.status(200).send({
      status: 1,
      payload: deletedMessage,
      message: 'Successfully deleted the message',
      statusCode: 200
    });
  }
  catch (e) {
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
}

module.exports = {
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage
};
