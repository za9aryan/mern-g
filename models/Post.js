const { model, Schema } = require("mongoose");


const postsSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    commets: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
})

module.exports = model("Post", postsSchema)