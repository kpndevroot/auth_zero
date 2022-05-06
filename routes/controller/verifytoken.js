const jwt = require("jsonwebtoken");
import config from "../../config/config";
module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send({status:false, msg:"access denied"});
  try {
    const verified = jwt.verify(token, config[config.ENV].PRIVATEKEY);
    req.user = verified;
    next();
  } catch (err) {
    next(err);
  }
};
