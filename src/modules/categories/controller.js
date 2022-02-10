const { VERIFY } = require("../../utils/jwt");
const model = require("./model");
module.exports = {
  POST: async (req, res) => {
    try {
      const { categoryName, adminId } = req.body;

      if (!categoryName)
        return res.status(400).json({ message: "Invalid values !" });
      const newCategory = await model.newCategory(categoryName, adminId);
      if (!newCategory)
        return res.status(400).json({ message: "Category not created !" });
      res.status(200).json({
        message: "Category Succesfully created !",
        newCategory,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error !" });
    }
  },
  UPDATE_CATEGORY: async (req, res) => {
    try {
      const { categoryName, categoryId, adminId } = req.body;
      if (!categoryName)
        return res.status(400).json({ message: "Invalid values !" });
      const findCategory = await model.findCategory(categoryId, adminId);
      if (!findCategory)
        return res
          .status(400)
          .json({ message: "siz bu categoryni o'chira olmaysiz !" });
      const updateCategory = await model.updateCategory(
        categoryName,
        categoryId
      );
      if (!updateCategory)
        return res.status(400).json({ message: "Category not updated !" });
      res.status(200).json({
        message: "Category Succesfully updated !",
        updateCategory,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error !" });
    }
  },
  DELETE_CATEGORY: async (req, res) => {
    try {
      const { categoryId } = req.body;
      if (!categoryId)
        return res.status(400).json({ message: "Invalid values !" });
      const deleteCategory = await model.deleteCategory(categoryId);
      if (!deleteCategory)
        return res
          .status(400)
          .json({ message: "there is no category like this id !" });
      res.status(200).json({
        message: "Succesfully deleted !",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error !" });
    }
  },
  ALL_CATEGORY: async (req, res) => {
    try {
      if (req.headers.token) {
        const { token } = req.headers;
        const { adminId } = VERIFY(token);
        const allAdminCategories = await model.allAdminCategory(adminId);
        if (!allAdminCategories)
          return res
            .status(400)
            .json({ message: "There is no any categories !" });
        res
          .status(200)
          .json({ message: "All categories !", data: allAdminCategories });
      } else {
        const allCategories = await model.allCategory();
        if (!allCategories)
          return res
            .status(400)
            .json({ message: "There is no any categories !" });
        res
          .status(200)
          .json({ message: "All categories !", data: allCategories });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error !" });
    }
  },
};
