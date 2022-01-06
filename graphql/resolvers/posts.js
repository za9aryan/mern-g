const { AuthenticationError } = require('apollo-server')
const Post = require('../../models/Post')
const checkAuth = require('../../utils/check-auth')

module.exports = {
    Query: {
        sayHi: () => "Hello World!",
        saySome: () => "something",
        async getPosts() {
            try {
                const posts = await Post.find();
                return posts
            } catch (e) {
                console.log(e);
            }
        },
        async getPost(_, { postId }) {
            try {
                console.log(postId)
                const post = await Post.findById(postId)
                console.log(post)
                if (post) {
                    return post
                } else {
                    throw new Error("Post not found")
                }
            } catch (e) {
                console.log(e)
            }

        }
    },
    Mutation: {
        async createPost(parent, { body }, context, info) {
            const user = checkAuth(context)

            const newPost = new Post({
                body,
                user: user.indexOf,
                username: user.username,
                createdAt: new Date().toISOString()
            })

            const post = await newPost.save()

            return post
        },
        async deletePost(_, { postId }, context) {
            const user = checkAuth(context)

            try {
                const post = await Post.findById(postId)
                console.log(user.username, post.username)
                if (user.username === post.username) {
                    await post.delete()
                    return "Post deleted successfuly";
                } else {
                    throw new AuthenticationError("Action not allowed")
                }
            } catch (e) {
                throw new Error("Error")
            }
        }
    }
}