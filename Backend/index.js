// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: "50mb" }));

// mongoose
//   .connect("mongodb://localhost:27017/modak")
//   .then(() => console.log("Database Connection Successful"))
//   .catch((err) => console.error("Database Connection Error:", err.message));

// // Blog Schema
// const blogSchema = mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "users",
//       required: true,
//     },
//     title: { type: String, required: true },
//     imgLink: { type: String, required: true },
//     content: { type: String, required: true }, // Store full Quill Delta
//   },
//   { timestamps: true }
// );

// // User Schema
// const userSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
//     role: { // <-- add role
//         type: String,
//         enum: ["user", "Manager","admin"],
//         default: "user",
//         required: true,
//     },
//   },
//   { timestamps: true }
// );

// const postModel = mongoose.model("blogpost", blogSchema);
// const userModel = mongoose.model("users", userSchema);

// // Routes
// app.post("/register", async (req, res) => {
//   try {
//     const existingUser = await userModel.findOne({ email: req.body.email });
//     if (existingUser) {
//       return res.status(400).send({ message: "Email already exists" });
//     }
//     const newUser = await userModel.create(req.body);
//     res
//       .status(201)
//       .send({ message: "User Registered Successfully", user: newUser });
//   } catch (err) {
//     res.status(500).send({ message: "Server error" });
//   }
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await userModel.findOne({ email });
//     if (!user) return res.status(404).send({ message: "User not found" });
//     if (user.password !== password)
//       return res.status(401).send({ message: "Incorrect password" });
//     res.send({ message: "Login successful", user });
//   } catch (err) {
//     res.status(500).send({ message: "Server error" });
//   }
// });

// app.get("/posts", async (req, res) => {
//   try {
//     const posts = await postModel.find();
//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(500).send({ error: "Error fetching posts" });
//   }
// });

// // app.post("/upPosts", async (req, res) => {
// //   const { title, imgLink, content } = req.body;
// //   if (!content || typeof content !== 'object') {
// //     return res.status(400).json({ message: "Invalid content format" });
// //   }
// //   try {
// //     const post = await postModel.create({ title, imgLink, content });
// //     res.status(201).json({ message: "Post created successfully", data: post });
// //   } catch (err) {
// //     res.status(500).json({ message: "Failed to create post", error: err.message });
// //   }
// // });
// app.post("/upPosts", async (req, res) => {
// //   const { title, imgLink, content } = req.body;
// const { userId, title, imgLink, content } = req.body;


//   // Ensure that content is a valid string (HTML content)
//   if (!content || typeof content !== "string") {
//     return res
//       .status(400)
//       .json({ message: "Invalid content format, HTML expected" });
//   }

//   try {
//     const post = await postModel.create({ userId,title, imgLink, content });
//     res.status(201).json({ message: "Post created successfully", data: post });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Failed to create post", error: err.message });
//   }
// });

// app.delete("/post/:id", async (req, res) => {
//   try {
//     await postModel.deleteOne({ _id: req.params.id });
//     res.send({ message: "Post Deleted" });
//   } catch (err) {
//     res.send({ message: "Some Problem" });
//   }
// });

// app.put("/posts/:id", async (req, res) => {
//   try {
//     await postModel.updateOne({ _id: req.params.id }, req.body);
//     res.send({ message: "Post Updated" });
//   } catch (err) {
//     res.send({ message: "Some Problem" });
//   }
// });

// // Get a specific post by ID
// app.get("/blog/:id", async (req, res) => {
//   try {
//     const post = await postModel.findOne({ _id: req.params.id });
//     res.status(200).json(post);
//   } catch (error) {
//     res.status(500).send({ error: "Error fetching posts" });
//   }
// });



// app.get("/post/:userid", async (req, res) => {
//     let userid = req.params.userid;
//     try {
//         let posts = await postModel.find({ userId: userid }).populate("userId");
//         res.send(posts);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({ message: "Some Problem in getting the food" });
//     }
// });

// app.listen(8000, () => {
//   console.log("Server Up and running");
// });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

mongoose
  .connect("mongodb://localhost:27017/modak")
  .then(() => console.log("Database Connection Successful"))
  .catch((err) => console.error("Database Connection Error:", err.message));

// Blog Schema
const blogSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: { type: String, required: true },
    imgLink: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

// User Schema
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "Manager", "admin"],
      default: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("blogpost", blogSchema);
const userModel = mongoose.model("users", userSchema);

// Routes
app.post("/register", async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = await userModel.create(req.body);
    res.status(201).json({ message: "User Registered Successfully", user: newUser });
  } catch (err) {
    console.error("Error in /register:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("Error in /login:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in /posts:", error.message);
    res.status(500).json({ message: "Error fetching posts", error: error.message });
  }
});

app.post("/upPosts", async (req, res) => {
  const { userId, title, imgLink, content } = req.body;
  if (!content || typeof content !== "string") {
    return res.status(400).json({ message: "Invalid content format, HTML expected" });
  }
  if (!userId || !title || !imgLink) {
    return res.status(400).json({ message: "userId, title, and imgLink are required" });
  }
  try {
    const post = await postModel.create({ userId, title, imgLink, content });
    res.status(201).json({ message: "Post created successfully", data: post });
  } catch (err) {
    console.error("Error in /upPosts:", err.message);
    res.status(500).json({ message: "Failed to create post", error: err.message });
  }
});

app.delete("/post/:id", async (req, res) => {
  try {
    const result = await postModel.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error in /post/:id (DELETE):", err.message);
    res.status(500).json({ message: "Failed to delete post", error: err.message });
  }
});

app.put("/posts/:id", async (req, res) => {
  try {
    const result = await postModel.updateOne({ _id: req.params.id }, req.body);
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post Updated" });
  } catch (err) {
    console.error("Error in /posts/:id (PUT):", err.message);
    res.status(500).json({ message: "Failed to update post", error: err.message });
  }
});

app.get("/blog/:id", async (req, res) => {
  try {
    const post = await postModel.findOne({ _id: req.params.id });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Error in /blog/:id:", error.message);
    res.status(500).json({ message: "Error fetching post", error: error.message });
  }
});

app.get("/post/:userid", async (req, res) => {
  const userid = req.params.userid;
  try {
    const posts = await postModel.find({ userId: userid }).populate("userId");
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error in /post/:userid:", err.message);
    res.status(500).json({ message: "Failed to fetch user posts", error: err.message });
  }
});

app.listen(8000, () => {
  console.log("Server Up and running on port 8000");
});