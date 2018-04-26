const LanguageHelper = require('../helpers/language.helper');

const getTranslation = async (req, res, next) => {
  try {
    const { baseWord } = req.query;
    const traslation = await LanguageHelper.getTranslation(baseWord);
    res.status(200).send({
      code: 1,
      payload: traslation,
      message: 'Successfully fetch translations',
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
};

const editTranslation = async (req, res, next) => {
  try {
    const { baseWord } = req.query;
    const { code, word } = req.body;
    const traslation = await LanguageHelper.editTranslation(baseWord, code , word);
    res.status(200).send({
      code: 1,
      payload: traslation,
      message: 'Successfully edited translation',
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
};

const addTranslation = async (req, res, next) => {
  try {
    const { baseWord } = req.query;
    const { code, word } = req.body;
    const traslation = await LanguageHelper.addTranslation(baseWord, code , word);
    res.status(200).send({
      code: 1,
      payload: traslation,
      message: 'Successfully added translation',
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
};

module.exports = {
  addTranslation,
  editTranslation,
  getTranslation
};
