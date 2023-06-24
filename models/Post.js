const mongoose = required('mongoose')

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        max: 500,
    },
    img: {
        type: String
    },
    likes:{
        type: Array,
        default: []
    }
})