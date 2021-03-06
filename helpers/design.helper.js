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
    .populate('_profilePic')
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
      'colorFour': input.colorFour,
      '_profilePic': input._profilePic
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
    .populate('_profilePic')
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
      User.findByIdAndUpdate(design._host,
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

const flatDesign = (d) => {
  return new Promise(async(resolve, reject) => {
    try {
      const flattenDesign = {
        _id: d._id || null,
        designName: d.designName || null,
        updatedAt: d.updatedAt || null,
        createdAt: d.createdAt || null,
        colorOne: d.colorOne || null,
        colorTwo: d.colorTwo || null,
        colorThree: d.colorThree || null,
        colorFour: d.colorFour || null,
        '_host._id': (d._host && d._host._id) ? d._host._id : null,
        '_host.hostName': (d._host && d._host.hostName) ? d._host.hostName : null,
        '_host.email': (d._host && d._host.email) ? d._host.email: null,
        '_profilePic._id': (d._profilePic && d._profilePic._id) ? d._profilePic._id : null,
        '_profilePic.url': (d._profilePic && d._profilePic.url) ? d._profilePic.url : null,
        '_profilePic.secure_url': (d._profilePic && d._profilePic.secure_url) ? d._profilePic.secure_url : null,
        '_profilePic.public_id': (d._profilePic && d._profilePic.public_id) ? d._profilePic.public_id : null
      };
      resolve({err: null, design: flattenDesign});
    }
    catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getDesigns: getDesigns,
  createDesign: createDesign,
  getDesignById: getDesignById,
  updateDesign: updateDesign,
  deleteDesign: deleteDesign,
  getGeneralDesign: getGeneralDesign,
  setActiveDesign: setActiveDesign,
  flatDesign: flatDesign
};
