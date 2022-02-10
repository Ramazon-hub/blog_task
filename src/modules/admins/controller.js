const model = require("./model");
const { hashPassword, comparePassword } = require("../../utils/bcrypt");
const { SIGN, VERIFY } = require("../../utils/jwt");
module.exports = {
  REGISTER: async (req, res) => {
    try {
      const { fullname, username, password } = req.body;
      let filename = "";
      if (req.file) {
        filename = req.file.filename;
      }
      if (!fullname || !username || !password)
        return res.status(400).json({ message: "Invalid values !" });
      const hashpassword = await hashPassword(password);
      const newAdmin = await model.newAdmin(
        fullname,
        username,
        hashpassword,
        filename || null
      );
      if (!newAdmin)
        return res.status(400).json({ message: "Admin not created !" });
      const token = SIGN({ adminId: newAdmin.id, isSuper: newAdmin.issuper });
      res.status(200).json({
        message: "Succesfully createdn !",
        token,
        newAdmin,
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
      const findAdmin = await model.findAdmin(username);
      if (!findAdmin)
        return res.status(400).json({ message: "Admin not found !" });
      const comparepassword = await comparePassword(
        password,
        findAdmin.password
      );
      if (!comparepassword)
        return res.status(400).json({ message: "Password is incorrect !" });
      const token = SIGN({ adminId: findAdmin.id, isSuper: findAdmin.issuper });
      res.status(200).json({
        message: "Succesfully entering !",
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error !" });
    }
  },
  DELETE_ADMIN: async (req, res) => {
    try {
      const { deleteAdminId } = req.body;
      if (!deleteAdminId)
        return res.status(400).json({ message: "Invalid values !" });
      const deleteAdmin = await model.deleteAdmin(deleteAdminId);
      if (!deleteAdmin)
        return res
          .status(400)
          .json({ message: "there is no admin like this id !" });
      res.status(200).json({
        message: "Succesfully deleted !",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error !" });
    }
  },
  UPDATE_ADMIN: async (req, res) => {
    try {
      const { token } = req.headers;
      const { adminId } = VERIFY(token);
      const { fullname, username, password } = req.body;
      let filename = "";
      if (req.file) {
        filename = req.file.filename;
      }
      if (!adminId || (!fullname && !username && !password))
        return res.status(400).json({ message: "Invalid values !" });
      const findUpdate = await model.findUpdate(adminId);
      console.log(fullname, username, password);
      if (!findUpdate)
        return res.status(400).json({ message: "updating admin not found !" });
      console.log(findUpdate);
      const hashpassword = await hashPassword(password);
      const updateAdmin = await model.updateAdmin(
        fullname || findUpdate.fullname,
        username || findUpdate.username,
        hashpassword || findUpdate.password,
        filename || findUpdate.avatar,
        adminId
      );
      if (!updateAdmin)
        return res.status(400).json({ message: "Admin not created !" });
      const newToken = SIGN({ adminId, isSuper: updateAdmin.issuper });
      res.status(200).json({
        message: "Succesfully createdn !",
        token: newToken,
        updateAdmin,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error !" });
    }
  },
  GET_ADMIN: async (req, res) => {
    try {
      const allAdmins = await model.allAdmins();
      console.log(allAdmins);
      if (!allAdmins)
        return res.status(400).json({ message: "There is no any admins !" });
      res.status(200).json({ message: "All admins !", data: allAdmins });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error !" });
    }
  },
};
