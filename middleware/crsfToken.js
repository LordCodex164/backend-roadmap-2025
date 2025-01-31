const createCrsfToken = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  req.session.csrfToken = res.locals.csrfToken;
  next();
}

module.exports = createCrsfToken;