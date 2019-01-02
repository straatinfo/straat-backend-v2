const Language = require('../models/Language');
const _ = require('lodash');


async function getTranslation (baseWord) {
  try {
    const translation = await Language.findOne({'baseWord': baseWord.toLowerCase()});
    if (translation) {
      return Promise.resolve(translation);
    }
    const newTranslation = new Language({
      baseWord: baseWord.toLowerCase(),
      translations: [{
        code: 'en',
        word: baseWord.toLowerCase()
      }]
    });
    const createTranslation = await newTranslation.save();
    return Promise.resolve(newTranslation);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function addTranslation (baseWord, code, word) {
  try {
    const translation = await Language.findOne({'baseWord': baseWord.toLowerCase()});
    if (translation) {
      const update = await Language.update({'_id': translation._id}, {'$addToSet': { translations: { code: code.toLowerCase(), word: word.toLowerCase() }}});
    } else {
      const newLanguage = new Language({
        baseWord: baseWord.toLowerCase(),
        translations: [
          { code: 'en', word: baseWord.toLowerCase() },
          { code: code.toLowerCase(), word: word.toLowerCase() }
        ]
      });
      const createTranslation = await newLanguage.save();
    }
    const getTranslations = await Language.findOne({'baseWord': baseWord.toLowerCase()});
    const getUnique = _.uniqBy(getTranslations.translations, (t) => { return t.code.toLowerCase(); });
    const updatedTranslations = await Language.update({'_id': translation._id}, {'translations': getUnique});
    const updatedTranslation = await Language.findOne({'baseWord': baseWord.toLowerCase()});
    return Promise.resolve(updatedTranslation);
  }
  catch(e) {
    return Promise.reject(e);
  }
}

async function editTranslation (baseword, codeToEdit, newWord) {
  try {
    const language = await Language.findOne({'baseWord': baseword.toLowerCase()});
    if (!language) {
      return Promise.reject({
        code: 0,
        statusCode: 404,
        error: 'WORD_NOT_FOUND',
        message: 'Cannot find specified word'
      });
    }
    const oldTranslation = _.find(language.translations, (t) => {
      return t.code.toLowerCase() === codeToEdit.toLowerCase();
    });
    let newTranslations;
    if (oldTranslation) {
      newTranslations = language.translations.map((c) => {
        if (c.code.toLowerCase() === codeToEdit.toLowerCase()) {
          return {
            code: codeToEdit.toLowerCase(),
            word: newWord.toLowerCase()
          };
        } else {
          return c;
        }
      });
    } else {
      newTranslations = [...language.translations, { code: codeToEdit.toLowerCase(), word: newWord.toLowerCase() }];
    }
    const updateLanguage = await Language.findByIdAndUpdate(language._id, { translations: newTranslations });
    const updatedLang = await Language.findOne({'_id': language._id});
    return Promise.resolve(updatedLang);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function translate (baseWord, language) {
  try {
    const translation = await Language.findOne({'baseWord': baseWord.toLowerCase()})
    if (translation) {
      const words = translation.translations.find(trans => trans.code === language) // get only in by code
      if (words && words.word) {
        return Promise.resolve(words.word)
      }
    }
    console.log('no trans for: ', baseWord) 
    return Promise.resolve(baseWord)
  }
  catch (e) {
    return Promise.reject(e);
  }
}

module.exports = {
  getTranslation,
  addTranslation,
  editTranslation,
  translate
};
