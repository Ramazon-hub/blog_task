const { sign, verify } = require("jsonwebtoken");
const { JWT_KEY } = require("../config/index");
const SIGN = (data) => {
  try {
    return sign(data, JWT_KEY);
  } catch (err) {
    console.log(err);
  }
};
const VERIFY = (data) => {
  try {
    return verify(data, JWT_KEY);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  SIGN,
  VERIFY,
};
