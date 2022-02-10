const { VERIFY } = require("../utils/jwt");

module.exports = {
  AUTH_ADMIN: (req, res, next) => {
    try {
      const { token } = req.headers;
      const { adminId } = VERIFY(token);
      if (!adminId)
        return res.status(401).json({ message: "Siz admin emassiz !" });

      req.body.adminId = adminId;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Siz admin emassiz !" });
    }
  },
  AUTH_SUPER_ADMIN: (req, res, next) => {
    try {
      const { token } = req.headers;
      const { adminId, isSuper } = VERIFY(token);
      if (!isSuper)
        return res
          .status(401)
          .json({
            message:
              "Siz super admin emassiz afsuski admin ustida  amallar bajara olmaysiz !",
          });

      req.body.adminId = adminId;

      next();
    } catch (error) {
      return res
        .status(401)
        .json({
          message:
            "Siz super admin emassiz afsuski admin ustida  amallar bajara olmaysiz !",
        });
    }
  },
  AUTH_USER: (req, res, next) => {
    try {
      const { token } = req.headers;
      const { userId } = VERIFY(token);
      if (!userId)
        return res
          .status(401)
          .json({
            message:
              "Siz Userlar ro'yxatidan topilmadingiz, Login qilin yoki Registratsiyadan o'tin!",
          });

      req.body.userId = userId;

      next();
    } catch (error) {
      return res
        .status(401)
        .json({
          message:
            "Siz Userlar ro'yxatidan topilmadingiz, Login qilin yoki Registratsiyadan o'tin!",
        });
    }
  },
};
