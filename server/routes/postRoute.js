import express from "express";
import multer from "multer"; 
import { addPost,getPost,likePost } from "../controller/postController.js";

const router = express.Router();
const uploadMiddlewear = multer({ dest: 'uploads' });


router.post('/addpost', uploadMiddlewear.single('file'), addPost);
router.get("/getpost",getPost);
router.post('/like/:id',likePost);


// router.post('/post', uploadMiddleware.single('file'), postController.createPost);

export default router;
