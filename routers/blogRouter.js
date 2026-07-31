let express = require("express");
const {
  createBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
  getBlog
} = require("../controllers/blogController");
let blogRouter = express.Router();
const { multerHandler } = require("../services/multer");

console.log(multerHandler.single);
blogRouter.post("/create", multerHandler.single("blogImage"), createBlog);
blogRouter.delete("/delete/:id", deleteBlog);
blogRouter.get("/get", getAllBlogs);
blogRouter.get("/get/:id", getBlog);
blogRouter.put("/update/:id", updateBlog);

module.exports = { blogRouter };
