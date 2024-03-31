const responseSuccess = (message, data, res) => {
  res.json({
    status: "success",
    data,
    message,
  });
};

const responseError = (message, res) => {
  res.json({
    status: "Error",
    message,
  });
};

module.exports = { responseSuccess, responseError };
