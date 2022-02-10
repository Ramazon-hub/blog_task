const { hash, compare } = require("bcrypt");
const res = require("express/lib/response");
const hashPassword = async (password) => {
  try {
    return await hash(password, 10);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error !" });
  }
};
const comparePassword = async (password, hash) => {
  try {
    return await compare(password, hash);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error !" });
  }
};
module.exports = {
  hashPassword,
  comparePassword,
};
