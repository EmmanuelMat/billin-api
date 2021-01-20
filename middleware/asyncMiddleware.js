module.exports = (handler) => async (req, res, next) => {
  try {
    handler(req, res, next);
  } catch (ex) {
    next(ex);
  }
};
