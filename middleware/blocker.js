// Part1, defining blacklisted NISN, NIP, IP address
var BLACKLIST = [];

// Part2, Geting client IP
var getClientIp = function (req) {
  var ipAddress = req.connection.remoteAddress;
  if (!ipAddress) {
    return '';
  }
  // convert from "::ffff:192.0.0.1"  to "192.0.0.1"
  if (ipAddress.substr(0, 7) == '::ffff:') {
    ipAddress = ipAddress.substr(7);
  }
  return ipAddress;
};

exports.isBlacklist = (req, res, next) => {
  var ipAddress = getClientIp(req);
  var ipIsBlocked = BLACKLIST.indexOf(ipAddress) !== -1;
  var usernameIsBlocked = BLACKLIST.indexOf(req.body.username) !== -1;

  if (ipIsBlocked || usernameIsBlocked) {
    res.status(403).json({
      success: false,
      message: 'You are blocked'
    });
  } else {
    next();
  }
};