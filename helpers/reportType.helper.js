const ReportType = require('../models/ReportType');
const MainCategory = require('../models/MainCategory');
const CategoryHelper = require('./category.helper');

const getReportTypes = () => {
  return new Promise((resolve, reject) => {
    ReportType.find({})
    .populate({
      path: 'mainCategories',
      populate: {
        path: 'subCategories'
      }
    })
    .exec((err, reportTypes) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, reportTypes: reportTypes});
    });
  });
};

const getReportTypeById = (_id) => {
  return new Promise((resolve, reject) => {
    ReportType.findById(_id)
    .populate({
      path: 'mainCategories',
      populate: {
        path: 'subCategories'
      }
    })
    .exec((err, reportType) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, reportType: reportType});
    });
  });
};

const createReportType = (input) => {
  return new Promise((resolve, reject) => {
    const reportTypeSchema = new ReportType(input);
    reportTypeSchema
    .save((err, reportType) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, reportType: reportType});
    });
  });
};

const updateReportType = (_id, input) => {
  return new Promise((resolve, reject) => {
    ReportType.findByIdAndUpdate(_id, input, async(err, reportType) => {
      if (err) {
        return resolve({err: err});
      }
      try {
        const getRT = await getReportTypeById(reportType._id);
        if (getRT.err) {
          return rsolve({err: getRT.err});
        }
        resolve({err: null, reportType: getRT.reportType});
      }
      catch (e) {
        reject(e);
      } 
    });
  });
};

const deleteReportType = (_id) => {
  return new Promise((resolve, reject) => {
    ReportType.findByIdAndRemove(_id, (err, reportType) => {
      if (err) {
        return resolve({err: err});
      }
      MainCategory.find({'_reportType': _id}, async(err, mainCategories) => {
        try {
          const deleteMainCategories = await Promise.all(mainCategories.map(async(m) => {
            const deleteM = await CategoryHelper.deleteMainCategory(d._id);
            return;
          }));
          resolve({err: null, reportType: reportType});
        }
        catch (e) {
          reject(e);
        }
      });
    });
  });
};

module.exports = {
  getReportTypes: getReportTypes,
  createReportType: createReportType,
  updateReportType: updateReportType,
  deleteReportType: deleteReportType,
  getReportTypeById: getReportTypeById
};
