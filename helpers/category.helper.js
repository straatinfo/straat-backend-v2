const MainCategory = require('../models/MainCategory');
const SubCategory = require('../models/SubCategory');
const ReportType = require('../models/ReportType');

// main category helpers
const getMainCategories = (_host) => {
  return new Promise((resolve, reject) => {
    MainCategory.find({'_host': _host})
    .populate('_host', [
      '_id', 'hostName', 'email', 'houseNumber',
      'streetName', 'city', 'state', 'country',
      'postalCode', 'long', 'lat', '_role'
    ])
    .populate('subCategories')
    .populate('_reportType')
    .exec(function (err, mainCategories) {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, mainCategories: mainCategories});
    });
  });
};

const getMainCategoryById = (_id) => {
  return new Promise((resolve, reject) => {
    MainCategory.findById(_id)
    .populate('_host', [
      '_id', 'hostName', 'email', 'houseNumber',
      'streetName', 'city', 'state', 'country',
      'postalCode', 'long', 'lat', '_role'
    ])
    .populate('subCategories')
    .populate('reportType')
    .exec((err, mainCategory) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, mainCategory: mainCategory});
    });
  });
}

const getMainCategoriesByReportType = (_reportType) => {
  return new Promise((resolve, reject) => {
    MainCategory.find({'_reportType': _reportType})
    .populate('subCategories')
    .populate('_reportType')
    .populate('_host')
    .exec((err, mainCategories) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, mainCategories: mainCategories});
    });
  });
};

const createMainCategory = (input) => {
  return new Promise((resolve, reject) => {
    const newMainCategory = new MainCategory(input);
    newMainCategory.save((err, mainCategory) => {
      if (err) {
        return resolve({err: err});
      }
      ReportType.findByIdAndUpdate(input._reportType,
      { '$addToSet': { 'mainCategories': mainCategory._id } },
      { 'new': true, 'upsert': true },
      async(err, reportType) => {
        try {
          const getMC = await getMainCategoryById(mainCategory._id);
          if (getMC.err) {
            return resolve({err: getMC.err});
          }
          resolve({err: null, mainCategory: getMC.mainCategory});
        }
        catch (e) {
          reject(e);
        }
      });
    });
  });
};

const updateMainCategory = (_id, input) => {
  return new Promise((resolve, reject) => {
    MainCategory.findByIdAndUpdate(_id, input, async(err, mainCategory) => {
      if (err) {
        return resolve({err: err});
      }
      try {
        const getMC = await getMainCategoryById(mainCategory._id);
        if (getMC.err) {
          return resolve({err: getMC.err});
        }
        resolve({err: null, mainCategory: getMC.mainCategory});
      }
      catch (e) {
        reject(e);
      }
    });
  });
};

const deleteMainCategory = (_id) => {
  return new Promise((resolve, reject) => {
    MainCategory.findByIdAndRemove(_id, (err, mainCategory) => {
      if (err) {
        return resolve({err: err});
      }
      ReportType.findByIdAndUpdate(mainCategory._reportType,
      { '$pop': { 'mainCategories': mainCategory._id } },
      (err, reportType) => {
        SubCategory.find({'_mainCategory': _id})
        .remove((err) => {
          if (err) {
            return resolve({err: err});
          }
          resolve({err: null, mainCategory: mainCategory});
        });
      });
    });
  });
};

// subCategory helpers
const getSubCategories = (_mainCategory) => {
  return new Promise((resolve, reject) => {
    SubCategory.find({'_mainCategory': _mainCategory})
    .populate('_mainCategory')
    .exec((err, subCategories) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, subCategories: subCategories});
    })
  });
};

const getSubCategoryById = (_id) => {
  return new Promise((resolve, reject) => {
    SubCategory.findById(_id)
    .populate('_mainCategory')
    .exec((err, subCategory) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, subCategory: subCategory});
    });
  });
}

const createSubcategory = (input) => {
  return new Promise((resolve, reject) => {
    const newSubCategory = new SubCategory(input);
    newSubCategory.save((err, subCategory) => {
      if (err) {
        return resolve({err: err});
      }
      MainCategory.findByIdAndUpdate(input._mainCategory,
      { '$addToSet': { 'subCategories': subCategory._id } },
      { 'new': true, 'upsert': true },
      async (err, mainCategory) => {
        try {
          const getSC = await getSubCategoryById(subCategory._id);
          if (getSC.err) {
            return resolve({err: getSC.err});
          }
          resolve({err: null, subCategory: getSC.subCategory});
        }
        catch (e) {
          reject(e);
        }
      });
    });
  });
};

const updateSubCategory = (_id, input) => {
  return new Promise((resolve, reject) => {
    SubCategory.findByIdAndUpdate(_id, input, async(err, subCategory) => {
      if (err) {
        return resolve({err: err});
      }
      try {
        const updateSC = await getSubCategoryById(subCategory._id);
        if (updateSC.err) {
          return resolve({err: updateSC.err});
        }
        resolve({err: null, subCategory: updateSC.subCategory});
      }
      catch (e) {
        reject(e);
      }
    });
  });
};

const deleteSubCategory = (_id) => {
  return new Promise((resolve, reject) => {
    SubCategory.findByIdAndRemove(_id, (err, subCategory) => {
      if (err) {
        return resolve({err: err});
      }
      MainCategory.findByIdAndUpdate(subCategory._mainCategory,
      { '$pop': { 'subCategories': subCategory._id } },
      (err) => {
        if (err) {
          return resolve({err: err});
        }
        resolve({err: null, subCategory: subCategory});
      });
    });
  });
};

module.exports = {
  getMainCategories: getMainCategories,
  getMainCategoryById: getMainCategoryById,
  createMainCategory: createMainCategory,
  updateMainCategory: updateMainCategory,
  deleteMainCategory: deleteMainCategory,
  getSubCategories: getSubCategories,
  createSubcategory: createSubcategory,
  updateSubCategory: updateSubCategory,
  deleteSubCategory: deleteSubCategory,
  getMainCategoriesByReportType: getMainCategoriesByReportType
};
