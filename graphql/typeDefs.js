const gql = require("graphql-tag")

const typeDefs = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String
        username: String!
        comments: [Comment]!
        likes: [Like]!
    }
    type Comment {
        id: ID!
        username: String!
        createdAt: String!
        body: String!
    }
    type Like{
        id: ID!
        username: String!
        createdAt: String!
    }
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        password: String!
    }
    type Car {
        model: String!
        year: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    input Login {
        username: String!
        password: String!
    }
    input RegisterCar {
        model: String!
        year: String!
    }
    type Query {
        sayHi: String!,
        saySome: String,
        getPosts: [Post]
        getPost(postId: ID!): Post
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        login(login: Login): User!
        registerCar(car: RegisterCar): Car!
        createComment(postId: String!, body: String!): Post!
        deleteComment(postId: String!, commentId: String!): Post!
        likePost(postId: String!): Post!
        
    }
`

module.exports = typeDefs