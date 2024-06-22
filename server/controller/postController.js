import PostModel from "../model/postSchema.js";
import imgbbUploader from "imgbb-uploader";
import fs from 'fs';

export const addPost = async(req,res) => {
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
        const { description } = req.body;
        const postDoc = await PostModel.create({
            description,
            cover: newPath,
        })
       return res.json(postDoc);
    // })
}

export const getPost = async(req,res) => {
    try {
        const posts = await PostModel.find().sort({ createdAt: -1 }).limit(20);
    return res.json(posts);
    } catch (error) {
        console.log("cannot get post",error);
    }
}

export const likePost = async(req,res) => {
    const {id} = req.params;
    try {
      const updatedLike = await PostModel.findById(id);
      let newlike = updatedLike.like+1;
      await PostModel.updateOne({_id: id},{like: newlike})
      
      if (!updatedLike) {
        return res.status(404).json({ message: "profile not found" });
      }
  
      return res.json(updatedLike);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Server error" });
    }
}
