import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
    text: {
        type: String,
        require: [true, 'El texto es necesario']
    },
    author: {
        type: String,
        require: [true, 'El autor es necesario']
    }
});

export default mongoose.model('Comment', CommentSchema)