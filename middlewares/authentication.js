const userAndAdmin = (req, res, next) => {
  next();
};

const adminOnly = (req, res, next) => {
  next();
};

module.exports = { userAndAdmin, adminOnly };
