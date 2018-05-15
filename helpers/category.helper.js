const MainCategory = require('../models/MainCategory');
const SubCategory = require('../models/SubCategory');
const ReportType = require('../models/ReportType');
const User = require('../models/User');
const HostHelper = require('./host.helper');
const ReportTypeHelper = require('./reportType.helper');

// main category helpers
const getMainCategories = (_host, code) => {
  return new Promise((resolve, reject) => {
    ReportType.findOne({'code': code}, (err, reportType) => {
      if (err) {
        return resolve({err: err});
      }
      MainCategory.find({'_reportType': reportType._id, '_host': _host})
      .populate('_host', [
        '_id', 'hostName', 'email', 'houseNumber',
        'streetName', 'city', 'state', 'country',
        'postalCode', 'long', 'lat', '_role',
        'lname', 'fname', 'hostPersonalEmail'
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
  });
};

const getMainCategoryById = (_id) => {
  return new Promise((resolve, reject) => {
    MainCategory.findById(_id)
    .populate('_host', [
      '_id', 'hostName', 'email', 'houseNumber',
      'streetName', 'city', 'state', 'country',
      'postalCode', 'long', 'lat', '_role',
      'lname', 'fname', 'hostPersonalEmail'
    ])
    .populate('subCategories')
    .populate('_reportType')
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
      (err, reportType) => {
        User.findByIdAndUpdate(input._host,
        { '$addToSet': { 'mainCategories': mainCategory._id } },
        { 'new': true, 'upsert': true },
        async(err, user) => {
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
    SubCategory.findByIdAndRemove(_id, async(err, subCategory) => {
      try {
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
      }
      catch (e) {
        reject(e);
      }
    });
  });
};

const updateMainCategoryReport = (_mainCategory, _report) => {
  return new Promise((resolve, reject) => {
    MainCategory.findByIdAndUpdate(_mainCategory,
    { '$addToSet': { 'reports': _report } },
    { 'new': true, 'upsert': true },
    (err, mainCategory) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, mainCategory: mainCategory});
    });
  });
};

const updateSubCategoryReport = (_subCategory, _report) => {
  return new Promise((resolve, reject) => {
    SubCategory.findByIdAndUpdate(_subCategory,
    { '$addToSet': { 'reports': _report } },
    { 'new': true, 'upsert': true },
    (err, subCategory) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, subCategory: subCategory});
    });
  });
};
// un used: changes in fb app 03/31/18
const getMainCategoryByHostWithFreeHost = (_host) => {
  return new Promise(async(resolve, reject) => {
    try {
      const freeHost = await HostHelper.getFreeHost();
      if (freeHost.err) {
        return resolve({err: freeHost.err});
      }
      if (!freeHost) {
        return resolve({err: 'Cannot fetch freehost data'});
      }
      MainCategory.find({$or: [
        {'_host': _host},
        {'_host': freeHost.host._id}
      ]})
      .populate('_host', [
        '_id', 'hostName', 'email', 'houseNumber',
        'streetName', 'city', 'state', 'country',
        'postalCode', 'long', 'lat', '_role',
        'lname', 'fname', 'hostPersonalEmail'
      ])
      .populate('subCategories')
      .populate('_reportType')
      .exec(function (err, mainCategories) {
        if (err) {
          return resolve({err: err});
        }
        resolve({err: null, mainCategories: mainCategories});
      });
    }
    catch(e) {
      reject(e);
    }
  });
};

// remove all un used fields
const getMainCategoriesByHost = (_host) => {
  return new Promise(async(resolve, reject) => {
    try { 
      MainCategory
      .minify({'_host': _host}, true)
      .exec(function (err, mainCategories) {
        if (err) {
          return resolve({err: err});
        }
        resolve({err: null, mainCategories: mainCategories});
      });
    }
    catch(e) {
      reject(e);
    }
  });
};

const getMainCategoriesGeneral = (language) => {
  return new Promise(async(resolve, reject) => {
    try {
      const freeHost = await HostHelper.getFreeHost()
      if (freeHost.err) {
        return resolve({err: freeHost.err})
      }
      if (!freeHost) {
        return resolve({err: 'Cannot fetch freehost data'})
      }
      MainCategory
      // .minifyOne('5af3527ec38e980014415ea0', true)
      .minify({'_host': freeHost.host._id}, true)
      .exec(async function (err, mainCategories) {
        if (err) {
          return resolve({err: err});
        }
        return resolve({err: null, mainCategories: mainCategories})
      })
    } catch (e) {
      reject(e)
    }
  })
}

const flatMainCategory = (m) => {
  return new Promise(async(resolve, reject) => {
    try {
      const flatMC = {
        _id: m._id || null,
        name: m.name || null,
        createdAt: m.createdAt || null,
        updatedAt: m.updatedAt || null,
        '_host._id': (m._host && m._host._id) ? m._host._id : null,
        '_host.hostName': (m._host && m._host.hostName) ? m._host.hostName : null,
        '_reportType._id': (m._reportType && m._reportType._id) ? m._reportType._id : null,
        '_reportType.code': (m._reportType && m._reportType.code) ? m._reportType.code : null,
        '_reportType.name': (m._reportType && m._reportType.name) ? m._reportType.name : null,
        subCategories: m.subCategories || [],
        translations: m.translations || []
      };

      resolve({err: null, mainCategory: flatMC});
    }
    catch (e) {
      reject(e);
    }
  });
};

const flatSubCategory = (s) => {
  return new Promise(async(resolve, reject) => {
    try {
      const flatSC = {
        _id: s._id || null,
        name: s.name || null,
        createdAt: s.createdAt || null,
        updatedAt: s.updatedAt || null,
        '_mainCategory._id': (s._mainCategory && s._mainCategory._id) ? s._mainCategory._id : null,
        '_mainCategory.name': (s._mainCategory && s._mainCategory.name) ? s._mainCategory.name : null,
        translations: s.translations || []
      };
      resolve({err: null, subCategory: flatSC});
    }
    catch (e) {
      reject(e);
    }
  });
};

const getGeneralMainCategoriesByReportTypeCode = (code) => {
  return new Promise(async(resolve, reject) => {
    try {
      const getFH = await HostHelper.getFreeHost();
      if (getFH.err) { return resolve({err: getFH.err}); }
      if (!getFH.host) { return resolve({err: 'Cannot get Free host at this time'}); }
      ReportType.findOne({'code': code}, (err, reportType) => {
        if (err) {
          return resolve({err: err});
        }
        MainCategory.find({'_reportType': reportType._id, '_host': getFH.host._id})
        .populate('_host', [
          '_id', 'hostName', 'email', 'houseNumber',
          'streetName', 'city', 'state', 'country',
          'postalCode', 'long', 'lat', '_role',
          'lname', 'fname', 'hostPersonalEmail'
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
    }
    catch (e) {
      reject(e);
    }
  });
}

const createMainCategoryForGeneralDesign = ({name, code, description}) => {
  return new Promise(async(resolve, reject) => {
    try {
      const getFH = await HostHelper.getFreeHost();
      if (getFH.err) { return resolve({err: getFH.err}); }
      if (!getFH.host) { return resolve({err: 'Cannot get Free host at this time'}); }
      ReportType.findOne({'code': code}, (err, reportType) => {
        if (err) { return resolve({err: err}); }
        if (!reportType) { return resolve({err: 'Invalid Report Type Code'}); }
        const newMainCategory = new MainCategory({name, description, '_reportType': reportType._id, '_host': getFH.host._id});
        newMainCategory.save((err, mainCategory) => {
          if (err) {
            return resolve({err: err});
          }
          ReportType.findByIdAndUpdate(reportType._id,
          { '$addToSet': { 'mainCategories': mainCategory._id } },
          { 'new': true, 'upsert': true },
          (err, reportType) => {
            User.findByIdAndUpdate(getFH.host._id,
            { '$addToSet': { 'mainCategories': mainCategory._id } },
            { 'new': true, 'upsert': true },
            async(err, user) => {
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
      });
    }
    catch (e) {
      reject(e);
    }
  });
}

const createMainCategoryForHost = ({name, code, description}, _host) => {
  return new Promise(async(resolve, reject) => {
    try {
      const checkHost = await HostHelper.getHostById(_host);
      if (checkHost.err || !checkHost.host) { return resolve({err: 'Invalid Host ID'}); }
      ReportType.findOne({'code': code}, (err, reportType) => {
        if (err) { return resolve({err: err}); }
        if (!reportType) { return resolve({err: 'Invalid Report Type Code'}); }
        const newMainCategory = new MainCategory({name, description, '_reportType': reportType._id, '_host': _host});
        newMainCategory.save((err, mainCategory) => {
          if (err) {
            return resolve({err: err});
          }
          ReportType.findByIdAndUpdate(reportType._id,
          { '$addToSet': { 'mainCategories': mainCategory._id } },
          { 'new': true, 'upsert': true },
          (err, reportType) => {
            User.findByIdAndUpdate(_host,
            { '$addToSet': { 'mainCategories': mainCategory._id } },
            { 'new': true, 'upsert': true },
            async(err, user) => {
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
      });
    }
    catch (e) {
      reject(e);
    }
  });
}

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
  getMainCategoriesByReportType: getMainCategoriesByReportType,
  updateMainCategoryReport: updateMainCategoryReport,
  updateSubCategoryReport: updateSubCategoryReport,
  getMainCategoryByHostWithFreeHost: getMainCategoryByHostWithFreeHost,
  flatMainCategory: flatMainCategory,
  flatSubCategory: flatSubCategory,
  getGeneralMainCategoriesByReportTypeCode: getGeneralMainCategoriesByReportTypeCode,
  createMainCategoryForGeneralDesign: createMainCategoryForGeneralDesign,
  createMainCategoryForHost: createMainCategoryForHost,
  getMainCategoriesGeneral,
  getMainCategoriesByHost
};
