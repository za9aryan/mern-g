const postsResolvers = require("./posts")
const usersResolvers = require('./users')
const carResolvers = require('./cars')
const commentsResolvers = require('./comments')

module.exports = {
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...carResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation
    }
}