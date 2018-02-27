const Design = require('../models/Design');
const User = require('../models/User');

const getDesigns = (_host) => {
  return new Promise((resolve, reject) => {
    Design.find({'_host': _host})
    .populate('_host', [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode', 'username',
      'phoneNumber', 'long', 'lat', 'isPatron', 'email',
      'lname', 'fname', 'hostPersonalEmail'
    ])
    .exec((err, designs) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, designs: designs});
    });
  });
};

const createDesign = (_host, input) => {
  return new Promise((resolve, reject) => {
    const newDesign = new Design({
      '_host': _host,
      'designName': input.designName,
      'colorOne': input.colorOne,
      'colorTwo': input.colorTwo,
      'colorThree': input.colorThree,
      'colorFour': input.colorFour
    });
    newDesign.save((err, design) => {
      if (err) {
        return resolve({err: err});
      }
      User.findByIdAndUpdate(_host,
      { '$addToSet': { 'designs': design._id } },
      { 'new': true, 'upsert': true },
      (err) => {
        if (err) {
          return resolve({err: err});
        }
        resolve({err: null, design: design});
      });
    });
  });
};

const getDesignById = (_id) => {
  return new Promise((resolve, reject) => {
    Design.findById(_id)
    .populate('_host', [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode', 'username',
      'phoneNumber', 'long', 'lat', 'isPatron', 'email',
      'lname', 'fname', 'hostPersonalEmail'
    ])
    .exec((err, design) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, design: design});
    });
  });
};

const updateDesign = (_id, input) => {
  return new Promise((resolve, reject) => {
    Design.findByIdAndUpdate(_id, input, (err, design) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, design: design});
    });
  });
};

const deleteDesign = (_id) => {
  return new Promise((resolve, reject) => {
    Design.findByIdAndRemove(_id, (err, design) => {
      if (err) {
        return resolve({err: err});
      }
      User.findByIdAndRemove(design._host,
      { '$pop': { 'designs': design._id } },
      (err) => {
        if (err) {
          return resolve({err: err});
        }
        resolve({err: null, design: design});
      });
    });
  });
};

const getGeneralDesign = () => {
  return new Promise((resolve, reject) => {
    Design.findOne({'designName': 'General Design'}, (err, design) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, design: design});
    });
  });
};

const setActiveDesign = (_host, _design) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(_host, {'_activeDesign': _design}, (err, host) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, user: host, host: host});
    });
  });
};

module.exports = {
  getDesigns: getDesigns,
  createDesign: createDesign,
  getDesignById: getDesignById,
  updateDesign: updateDesign,
  deleteDesign: deleteDesign,
  getGeneralDesign: getGeneralDesign,
  setActiveDesign: setActiveDesign
};
