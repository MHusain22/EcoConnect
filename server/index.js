import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import multer from "multer"; 
import imgbbUploader from "imgbb-uploader";
import fs from 'fs';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
// app.use('/uploads', express.static(__dirname + '/uploads'));
const uploadMiddlewear = multer({ dest: 'uploads' });
dotenv.config();

mongoose
  .connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

const User =
  mongoose.models.User ||
  mongoose.model("User", {
    username: String,
    email: String,
    password: String,
  });

const Initiative =
  mongoose.models.Initiative ||
  mongoose.model("Initiative", {
    name: String,
    description: String,

  });

  const PostModel = 
  mongoose.models.PostModel ||
  mongoose.model("PostModel", {
    description: String,
    cover: String,
  });


  app.post('/post', uploadMiddlewear.single('file'), async (req, res) => {
    // path change
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    let newPath = path + '.' + ext;

    // img save
    fs.renameSync(path, newPath);
    const uplfilepath = newPath;

    // upload
    await imgbbUploader(process.env.IMGBB, newPath)
        .then((response) => {
            newPath = response.url;
        })
        .catch((error) => console.error(error));

    // img delete
    fs.unlinkSync(uplfilepath);

    // url save db
    // const { token } = req.cookies;
    // jwt.verify(token, secret, {}, async (err, info) => {
    //     if (err) throw err;
        const { description } = req.body;
        const postDoc = await PostModel.create({
            description,
            cover: newPath,
        })
       return res.json(postDoc);
    // })
})

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    // Find the article by ID and update it with the new data
    const updatedProfile = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProfile) {
      return res.status(404).json({ message: "profile not found" });
    }

    res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get('/post', async (req, res) => {
    const posts = await PostModel.find().sort({ createdAt: -1 }).limit(20);
    return res.json(posts);
})

app.post("/addinitiative", async (req, res) => {
  const { name, description } = req.body;
  console.log(name, description);
  try {
    const newInit = new Initiative({ name, description });
    await newInit.save();
    return res.status(200).json({ message: "successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/getinitiative", async (req, res) => {
  try {
    const initiative = await Initiative.find();
    return res.json(initiative);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email);
  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup failed:", error);
    res.status(500).json({ error: "Signup failed" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Replace 'YourUserModel' with your actual user model name or logic
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    //   console.log(user._id);
    const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token,user });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
