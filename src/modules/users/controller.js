const model = require("./model");
const { hashPassword, comparePassword } = require("../../utils/bcrypt");
const { SIGN, VERIFY } = require("../../utils/jwt");
module.exports = {
  REGISTER: async (req, res) => {
    try {
      const { fullname, phone, username, password, interestedCategory } =
        req.body;

      let filename = "";
      if (req.file) {
        filename = req.file.filename;
      }

      if (!fullname || !phone || !username || !password || !interestedCategory)
        return res.status(400).json({ message: "Invalid values !" });

      const hashpassword = await hashPassword(password);
      const newUser = await model.newUser(
        fullname,
        phone,
        username,
        hashpassword,
        interestedCategory,
        filename || null
      );
      if (!newUser)
        return res.status(400).json({ message: "User not created !" });
      const token = SIGN({ userId: newUser.id });
      res.status(200).json({
        message: "Succesfully createdn !",
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error !" });
    }
  },
  LOGIN: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password)
        return res.status(400).json({ message: "Invalid values !" });
      const findUser = await model.findUser(username);
      if (!findUser)
        return res.status(400).json({ message: "User not found !" });
      const comparepassword = await comparePassword(
        password,
        findUser.password
      );
      if (!comparepassword)
        return res.status(400).json({ message: "Password is incorrect !" });
      const token = SIGN({ userId: findUser.id });
      res.status(200).json({
        message: "Succesfully entering !",
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error !" });
    }
  },
  DELETE_USER: async (req, res) => {
    try {
      const { deleteUserId } = req.body;
      if (!deleteUserId)
        return res.status(400).json({ message: "Invalid values !" });
      const deleteUser = await model.deleteUser(deleteUserId);
      if (!deleteUser)
        return res
          .status(400)
          .json({ message: "there is no user like this id !" });
      res.status(200).json({
        message: "Succesfully deleted !",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error !" });
    }
  },
  UPDATE_USER: async (req, res) => {
    try {
      const { token } = req.headers;
      const { userId } = VERIFY(token);
      const { fullname, phone, username, password, interestedCategory } =
        req.body;
      let filename = "";
      if (req.file) {
        filename = req.file.filename;
      }
      if (
        !userId ||
        (!fullname && !phone && !username && !password && !interestedCategory)
      )
        return res.status(400).json({ message: "Invalid values !" });
      const findUpdate = await model.findUpdate(userId);
      if (!findUpdate)
        return res.status(400).json({ message: "updating user not found !" });
      const hashpassword = await hashPassword(password);
      const updateUser = await model.updateUser(
        fullname || findUpdate.fullname,
        phone || findUpdate.phone,
        username || findUpdate.username,
        hashpassword || findUpdate.password,
        filename || findUpdate.avatar,
        interestedCategory || findUpdate.interestedcategory,
        userId
      );
      if (!updateUser)
        return res.status(400).json({ message: "User not created !" });
      const newToken = SIGN({ userId });
      res.status(200).json({
        message: "Succesfully created !",
        token: newToken,
        updateUser,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error !" });
    }
  },
  GET_USER: async (req, res) => {
    try {
      const allUsers = await model.allUsers();
      if (!allUsers)
        return res.status(400).json({ message: "There is no any users !" });
      res.status(200).json({ message: "All users !", data: allUsers });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error !" });
    }
  },
};
