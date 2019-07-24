exports.error = (err, req, res, next) => {
  res.status(400).json({
    success: false,
    message: err.message
  });
};

// akan dibuat handling error per type errornya
// mangat BE !!!!