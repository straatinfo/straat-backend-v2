const mongoose = require('mongoose');

async function _validateParams (req) {
  const { mainCategoryId } = req.body;
  let error = {
    status: 'ERROR',
    statusCode: 102,
    httpCode: 400,
    message: 'Invalid Parameter: Main Category ID'
  };

  if (!mongoose.isValidObjectId(mainCategoryId)) {
    throw error;
  }

  const mainCategory = await req.db.MainCategory.findById(mainCategoryId);
  if (!mainCategory) {
    throw error;
  }


  req.$scope.mainCategory = mainCategory;

  return req;
}

async function _createSubCategory (req) {
  const { mainCategoryId, name, dutchName, description } = req.body;
  const oldSubCategory = await req.db.MainCategory.findOne({
    _mainCategory: mainCategoryId,
    name: name
  });

  let newSubCategory;

  if (oldSubCategory) {
    newSubCategory = await req.db.SubCategory.findByIdAndUpdate(oldSubCategory._id, {
      translations: [
        { code: 'en', word: name },
        { code: 'nl', word: dutchName }
      ]
    });
  } else {
    newSubCategory = await req.db.SubCategory.create({
      name: name,
      _mainCategory: mainCategoryId,
      description: description,
      translations: [
        { code: 'en', word: name },
        { code: 'nl', word: dutchName }
      ]
    });
  }

  req.$scope.subCategory = newSubCategory;
  return req;
}

async function _deleteSubCategory (req) {
  const { id } = req.body;
  let error = {
    status: 'ERROR',
    statusCode: 102,
    httpCode: 400,
    message: 'Invalid Parameter: Sub Category ID'
  };
  if (!mongoose.isValidObjectId(id)) {
    throw error;
  }
  
  const checkIfHasReports = await req.db.Report.findOne({ _subCategory: id });
  let deletedSC;
  if (checkIfHasReports) {
    deletedSC = await req.db.SubCategory.findByIdAndUpdate(id, { softRemoved: true });
  } else {
    deletedSC = await req.db.SubCategory.findByIdAndDelete(id);
  }

  req.subCategory = deletedSC;
  return req;
}

module.exports = {
  _validateParams,
  _createSubCategory,
  _deleteSubCategory
};
