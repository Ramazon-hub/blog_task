const { VERIFY } = require("../../utils/jwt");
const model = require("./model");
module.exports = {
  POST: async (req, res) => {
    try {
      const { title, content, categoryId } = req.body;
      const { token } = req.headers;
      const { adminId } = VERIFY(token);
      if(!req.files.length)
      return res.status(400).json({message:"rasm kirgizish shart !"})
      const images = req.files.map((image) => image.filename);
      if (!title || !content || !images || !categoryId)
        return res.status(400).json({ message: "Invalid values !" });
      const newPost = await model.newPost(
        title,
        content,
        images,
        adminId,
        categoryId
      );
      if (!newPost)
        return res.status(400).json({ message: "Post not created !" });
      res.status(200).json({
        message: "Post Succesfully created !",
        newPost,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error !" });
    }
  },
  UPDATE_POST: async (req, res) => {
    try {
      const { postId, title, content, categoryId } = req.body;
      const { token } = req.headers;
      const { adminId } = VERIFY(token);
      const images = req.files.map((image) => image.filename);
      if (!postId || (!title && !content && !categoryId))
        return res.status(400).json({ message: "Invalid values !" });
      const findPost = await model.findPost(postId, adminId);
      if (!findPost)
        return res
          .status(400)
          .json({ message: "siz bu postni o'chira olmaysiz !" });
      const updatePost = await model.updatePost(
        title || findPost.title,
        content || findPost.content,
        images.length?images:findPost.images,
        categoryId || findPost.category,
        postId
      );
      if (!updatePost)
        return res.status(400).json({ message: "Post not updated !" });
      res.status(200).json({
        message: "Post Succesfully created !",
        updatePost,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error !" });
    }
  },
  DELETE_POST: async (req, res) => {
    try {
      const { postId } = req.body;
      if (!postId) return res.status(400).json({ message: "Invalid values !" });
      const deletePost = await model.deletePost(postId);
      if (!deletePost)
        return res
          .status(400)
          .json({ message: "there is no post like this id !" });
      res.status(200).json({
        message: "Succesfully deleted !",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error !" });
    }
  },
  ALL_POST: async (req, res) => {
    try {
      if (req.headers.token) {
        const { token } = req.headers;
        const { adminId } = VERIFY(token);
        const allAdminPosts = await model.allAdminPost(adminId);
        if (!allAdminPosts)
          return res.status(400).json({ message: "There is no any posts !" });
        res.status(200).json({ message: "All posts !", data: allAdminPosts });
      } else {
        const allPosts = await model.allPost();
        if (!allPosts)
          return res.status(400).json({ message: "There is no any posts !" });
        res.status(200).json({ message: "All Posts !", data: allPosts });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error !" });
    }
  },
  ALL_POST_BY_CATEGORY: async (req, res) => {
    try {
      const {categoryId}=req.params
        const allPosts = await model.allPostByCategory(categoryId);
        if (!allPosts)
          return res.status(400).json({ message: "There is no any posts !" });
        res.status(200).json({ message: "All Posts !", data: allPosts });
      
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error !" });
    }
  },
};
