const Post = require("../models/Postmodel");
const createPost = async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      desc: req.body.desc,
      date:  new Date(),
      image: req.file.filename,
    });

    const postData = await post.save();
    res.status(200).send({ success: true, msg: "Posted data", data: postData });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

// To view Posts

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).send({ success: true, msg: "Posted data", data: posts });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

// To Delete Posts
const deletePosts = async (req, res) => {
  try {
    const id = req.params.id;
    res.status(200).send({ success: true, msg: "Post Deleted Successfully" });

    await Post.deleteOne({ _id: id });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

//Update posts
const updatePost = async (req, res) => {
  try {
    if (req.file !== undefined) {
      var id = req.body.id;
      var title = req.body.title;
      var desc = req.body.desc;
      var date = new Date();
      var filename = req.file.filename;

      await Post.findByIdAndUpdate(
        { _id: id },
        { $set: { title: title, desc:desc, date: date, image: filename } }
      );
      res.status(200).send({ success: true, msg: "Post updated Successfully" });
    } else {
      var id = req.body.id;
      var title = req.body.title;
      var desc = req.body.desc;
      var date = new Date();

      await Post.findByIdAndUpdate(
        { _id: id },
        { $set: { title: title, desc:desc,date: date} }
      );
      res.status(200).send({ success: true, msg: "Post updated Successfully" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  deletePosts,
  updatePost,
};
