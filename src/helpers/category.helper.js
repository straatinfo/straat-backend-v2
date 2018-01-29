const db = require('../models');

// mainCategoryHelpers
const getMainCategories = (hostId) => {
  return new Promise(async(resolve, reject) => {
    try {
      const mainCategories = await db.mainCategory.findAll({
        where: {hostId},
        include: [
          { model: db.user, as: 'host',
            attributes: ['id', 'lname', 'fname', 'institutionName', 'email', 'lat', 'long', 'username'] 
          },
          { model: db.subCategory },
          { model: db.reportType }
        ]
      });
      resolve({err: null, mainCategories: mainCategories});
    }
    catch (e) {
      reject(e);
    }
  });
};

const createMainCategory = (hostId, name, description, reportTypeId) => {
  return new Promise(async(resolve, reject) => {
    try {
      const createMainCategory = await db.mainCategory.create({hostId, name, description, reportTypeId});
      if (!createMainCategory) {
        resolve({err: 'Invalid Input'});
        return;
      }
      const mainCategory = await db.mainCategory.findOne({
        where: {id: createMainCategory.id},
        include: [
          { model: db.user, as: 'host',
            attributes: ['id', 'lname', 'fname', 'institutionName', 'email', 'lat', 'long', 'username'] 
          },
          { model: db.subCategory },
          { model: db.reportType }
        ]
      });
      resolve({err: null, mainCategory: mainCategory});
    }
    catch (e) {
      reject(e);
    }
  });
};

const updateMainCategory = (mainCategoryId, name, description) => {
  return new Promise(async(resolve, reject) => {
    try {
      const updatedMainCategory = await db.mainCategory.update({name, description}, {
        where: { id: mainCategoryId }, returning: true
      });
      if (!updatedMainCategory[1][0]) {
        resolve({err: `Main Category ID: ${mainCategoryId} does not exist`});
        return;
      }
      const mainCategory = await db.mainCategory.findOne({
        where: {id: updatedMainCategory[1][0].id},
        include: [
          { model: db.user, as: 'host',
            attributes: ['id', 'lname', 'fname', 'institutionName', 'email', 'lat', 'long', 'username'] 
          },
          { model: db.subCategory },
          { model: db.reportType },
          { model: db.reportType }
        ]
      });
      resolve({err: null, mainCategory: mainCategory});
    }
    catch (e) {
      reject(e);
    }
  });
};

const deleteMainCategory = (mainCategoryId) => {
// WARNING this method can delete all the associated sub categories
  return new Promise(async(resolve, reject) => {
    try {
      const deletedMainCategory = await db.mainCategory.destroy({
        where: {id: mainCategoryId}, individualHooks: true
      });
      if (deletedMainCategory === 0) {
        resolve({err: `Main Category ID: ${mainCategoryId} does not exist`});
        return;
      }
      resolve({err: null, affectedRows: deletedMainCategory});
    }
    catch (e) {
      reject(e);
    }
  });
};

// sub Category helpers
const getSubCategories = (mainCategoryId) => {
  return new Promise(async(resolve, reject) => {
    try {
      const getSubCategories = await db.subCategory.findAll({
        where: {mainCategoryId},
        include: [
          {
            model: db.mainCategory,
            include: [
              { model: db.reportType }
            ]
          }
        ]
      });
      resolve({err: null, subCategories: getSubCategories});
    }
    catch (e) {
      reject(e);
    }
  });
};

const createSubCategory = (mainCategoryId, name, description) => {
  return new Promise(async(resolve, reject) => {
    try {
      const createSubCategory = await db.subCategory.create({mainCategoryId, name, description});
      if (!createSubCategory) {
        resolve({err: 'Invalid Input'});
        return;
      }
      const subCategory = await db.subCategory.findOne({
        where: {id: createSubCategory.id},
        include: [
          {
            model: db.mainCategory,
            include: [
              { model: db.reportType }
            ]
          }
        ]
      });
      resolve({err: null, subCategory: subCategory});
    }
    catch (e) {
      reject(e);
    }
  });
};

const updateSubCategory = (subCategoryId, name, description) => {
  return new Promise(async(resolve, reject) => {
    try {
      const updatedSubCategory = await db.subCategory.update({name, description},{
        where: {id: subCategoryId}, returning: true
      });
      if (!updatedSubCategory) {
        resolve({err: `Sub Category ID: ${subCategoryId} does not exist`});
        return;
      }
      const subCategory = await db.subCategory.findOne({
        where: {id: updatedSubCategory[1][0].id},
        include: [
          {
            model: db.mainCategory,
            include: [
              { model: db.reportType }
            ]
          }
        ]
      });
      resolve({err: null, subCategory: subCategory});
    }
    catch (e) {
      reject(e);
    }
  });
};

const deleteSubCategory = (subCategoryId) => {
  return new Promise(async(resolve, reject) => {
    try {
      const deletedSubCategory = await db.subCategory.destroy({where: {id: subCategoryId}});
      if (deletedSubCategory === 0) {
        resolve({err: `Sub Category ID: ${subCategoryId} does not exist`});
        return;
      }
      resolve({err: null, affectedRows: deletedSubCategory});
    }
    catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getMainCategories: getMainCategories,
  updateMainCategory: updateMainCategory,
  createMainCategory: createMainCategory,
  deleteMainCategory: deleteMainCategory,
  getSubCategories: getSubCategories,
  createSubCategory: createSubCategory,
  updateSubCategory: updateSubCategory,
  deleteSubCategory: deleteSubCategory
};
