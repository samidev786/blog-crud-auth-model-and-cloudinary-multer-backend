const { default: mongoose } = require("mongoose");
let { blogModel } = require("../models/blog");
const { uploadImage } = require("../services/multer");

exports.createBlog = async (req, res) => {
  try {
    let { title, description } = req.body;
    const blogImage = req.file;
    if (!title || !description || !blogImage) {
      return res.status(400).json({
        message: "title, image and description cant be empty",
      });
    }
    let { id: authorId } = req.user;
    if (!authorId) {
      return res.status(400).json({
        message: "author id not found",
      });
    }
    let image = await uploadImage(blogImage.path);
    if(!image){
        return res.status(400).json({
            message:"image upload failed!"
        })
    }
    image = image.split("upload/")[1]
    console.log("image", image);

    let blogInstance = new blogModel({
      title,
      description,
      authorId,
      image,
    });
    await blogInstance.save();
    return res.status(201).json({
      message: "blog uploaded successfully...!",
      data: blogInstance,
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      error: err.message,
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    let blogs = await blogModel.find({ isDelete: false });
    return res.status(200).json({
      message: "All blogs returned....!",
      data: blogs,
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

exports.getBlog = async (req, res) => {
  try {
    let {id} = req.params;
    let blog = await blogModel.findOne({ isDelete: false,_id:id });
    if(!blog){
    return res.status(404).json({
      message: "blog not found....!",
    });
    }
    return res.status(200).json({
      message: "Blog returned successfully....!",
      data: blog,
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    let { id: blogId } = req.params;
    if (!blogId || !mongoose.isValidObjectId(blogId)) {
      return res.status(400).json({
        message: "bad request, blog id not found!",
      });
    }
    let { id: userId } = req.user;
    if (!userId) {
      return res.status(400).json({
        message: "bad request, author id not found",
      });
    }
    let blog = await blogModel.findById(blogId);
    if (userId.toString() !== blog.authorId.toString()) {
      return res.status(401).json({
        message: "unauthorized, only author can delete...!",
      });
    }
    blog.isDelete = true; //soft delete
    blog.save();
    return res.status(200).json({
      message: "blog deleted successfully...!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server erorr, failed to delete!",
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    let { id: blogId } = req.params;
    if (!blogId) {
      return res.status(400).json({
        message: "id not found, bad request",
      });
    }
    let { title, description } = req.body;
    if (!title && !description) {
      return res.status(400).json({
        message: "nothing to update",
      });
    }
    let { id: userId } = req.user;
    if (!userId) {
      return res.status(400).json({
        message: "author id not found!",
      });
    }
    let blog = await blogModel.findOne({ _id: blogId, isDelete: false });
    if (!blog) {
      return res.status(404).json({
        message: "blog not found",
      });
    }
    if (blog.authorId.toString() !== userId.toString()) {
      return res.status(401).json({
        message: "unauthorized, only author can update...!",
      });
    }
    blog.title = title === undefined || title.trim() == "" ? blog.title : title;
    blog.description =
      description === undefined || description.trim() == ""
        ? blog.description
        : description;
    await blog.save();
    return res.status(200).json({
      message: "blog updated...",
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server erorr, failed to update!",
      error: err.message,
    });
  }
};
