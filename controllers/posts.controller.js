const PostModel = require('../models/post.model');
const decode = require('jwt-decode');
const User = require('../models/user');
exports.createPost = async (req, res) => {
    const userID = decode(req.headers.authorization.split(" ")[1]).id;
    const user = await User.findById(userID);
    const { title, body } = req.body;
    if (!title || !body) {
        res.status(400).json({ success: false, error: "Please fill in all fields" });
    } else {
        try {
            const lowercaseTitle = title.toLowerCase();
            const post = PostModel({
                title,
                lowercaseTitle,
                body,
                creator: user.username
            });
            await post.save();
            res.status(200).json({ success: true, post, userID });
        } catch (error) {
            res.status(400).json({ success: false, error });
        }
    }
}

exports.getPosts = async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.status(200).json({ success: true, posts });
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
}
