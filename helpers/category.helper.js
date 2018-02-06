const MainCategory = require('../models/MainCategory');
const SubCategory = require('../models/SubCategory');

// main category helpers
const getMainCategories = (_host) => {
  return new Prmise((resolve, reject) => {
    MainCategory.find({'_host': _host})
    .populate('_host', [
      '_id', 'hostName', 'email', 'houseNumber',
      'streetName', 'city', 'state', 'country',
      'postalCode', 'long', 'lat', '_role'
    ])
    .populate('subCategory')
    .populate('reportType')
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
    .populate('subCategory')
    .populate('reportType')
    .exec((err, mainCategory) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, mainCategory: mainCategory});
    });
  });
}

const createMainCategory = (input) => {
  return new Promise((resolve, reject) => {
    const newMainCategory = new MainCategory(input);
    newMainCategory.save(async(err, mainCategory) => {
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
      resolve({err: null, mainCategory: mainCategory});
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
    newSubCategory.save(async(err, subCategory) => {
      if (err) {
        return resolve({err: err});
      }
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
      resolve({err: null, subCategory: subCategory});
    });
  });
};

module.exports = {
  getMainCategories: getMainCategories,
  createMainCategory: createMainCategory,
  updateMainCategory: updateMainCategory,
  deleteMainCategory: deleteMainCategory,
  getSubCategories: getSubCategories,
  createSubcategory: createSubcategory,
  updateSubCategory: updateSubCategory,
  deleteSubCategory: deleteSubCategory
};
