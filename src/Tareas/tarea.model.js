import mongoose from "mongoose";
import Comment from '../Comments/Comment.model.js'

const TareaSchema = mongoose.Schema({
    title: {
        type: String,
        require: [true, 'El título es necesario']
    },
    description: {
        type: String,
        require : true
    },
    imagenUrl: {
        type: String,
        default: 'none'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    type: {
        type: String,
        enum: ['taller', 'tecnología', 'prácticas supervisadas'],
        required: true
    }
});

export default mongoose.model('Tarea', TareaSchema)