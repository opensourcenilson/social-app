const mongoose = require('mongoose');

const PostModel = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [3, "Title must be at least 3 characters long"],
        maxlength: [50, "Title must be less than 50 characters long"]

    },
    lowercaseTitle: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: [true, "Body is required"],
    },
    creator: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
    },
    likedBy: {
        type: Array
    }
})

const Post = mongoose.model('Posts', PostModel);

module.exports = Post;