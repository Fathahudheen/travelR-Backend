const express = require("express");
const postRoute = express();

const bodyPasrser = require("body-parser");
postRoute.use(bodyPasrser.json());
postRoute.use(bodyPasrser.urlencoded({ extended: true }));

const multer = require("multer");
const path = require("path");

postRoute.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/postImages"), (error, success) => {
      if (error) {
        console.log(error);
      }
    });
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name, (error, success) => {
      if (error) {
        console.log(error);
      }
    });
  },
});

const upload = multer({ storage: storage });

const postcontroller = require("../controllers/Postcontroller");

postRoute.post(
  "/createpost",
  upload.single("image"),
  postcontroller.createPost
);

//  To view Posts

postRoute.get("/getposts", postcontroller.getPosts);

// To delete Posts
postRoute.get("/deletepost/:id", postcontroller.deletePosts);

//update posts
postRoute.post(
  "/updatepost",
  upload.single("image"),
  postcontroller.updatePost
);

module.exports = postRoute;
