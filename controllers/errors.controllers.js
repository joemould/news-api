exports.customErr400 = () =>
  Promise.reject({ status: 400, msg: 'Bad Request' });
exports.customErr404 = () => Promise.reject({ status: 404, msg: 'Not Found' });

exports.handleRouteNotFound = (req, res, next) => {
  next({ status: 404, msg: `Not Found` });
};

exports.handleMethodNotAllowed = (req, res, next) => {
  next({ status: 405, msg: 'Method Not Allowed' });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handlePSQLErrors = (err, req, res, next) => {
  if (err.code === '22P02' || err.code === '42703') {
    res.status(400).send({ msg: 'Bad Request' });
  } else if (err.code === '23503') {
    res.status(404).send({ msg: 'Not Found' });
  } else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
};
