const DesignHelper = require('../helpers/design.helper');
const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');

const getFlatDesigns = async (req, res, next) => {
  try {
    if (!req.designs) {
      return ErrorHelper.ClientError(res, {error: 'No Designs'}, 400);
    }
    const flatDesigns = await Promise.all(req.designs.map(async(d) => {
      const flatD = await DesignHelper.flatDesign(d);
      try {
        if (flatD.design)
          return flatD.design;
      }
      catch (e) {

      }
    }));
    SuccessHelper.success(res, flatDesigns);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  getFlatDesigns: getFlatDesigns
};
