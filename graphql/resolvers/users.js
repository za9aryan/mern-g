const User = require('../../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../../config')
const { UserInputError } = require('apollo-server');
const validateInput = require('../../utils/validators')
const validateLogin = require('../../utils/validateLogin')

const getToken = (user) => {
    const token = jwt.sign({
        email: user.email,
        id: user._id,
        username: user.username
    }, SECRET_KEY, { expiresIn: "1h" })
    return token
}

module.exports = {
    Mutation: {
        async login(_, { login: { username, password } }) {
            // validate
            const { errors, valid } = validateLogin(username, password)
            if (!valid) {
                throw new UserInputError("Error", { errors })
            }
            // find
            const user = await User.findOne({ username })
            if (!user) {
                throw new UserInputError("User not found", { errors })
            }
            const validPass = await bcrypt.compare(password, user.password)
            if (!validPass) {
                throw new UserInputError("Password not valid", { errors })
            }
            // getToken
            const token = getToken(user)

            console.log(token)
            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        async register(parent, { registerInput: { username, email, password, confirmPassword } }, context, info) {
            // TODO validate user data
            console.log("7654")
            const valid = validateInput(email, password, username, confirmPassword)
            console.log(valid, "654")
            if (!valid.valid) {
                throw new UserInputError("Error", valid.errors)
            }
            // Make sure user doesnt exist
            const user = await User.findOne({ username })
            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: "Username is taken"
                    }
                })
            }
            // Hash password and create token
            password = await bcrypt.hash(password, 12)

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })

            const res = await newUser.save()

            const token = getToken(res)

            console.log(res, "res")
            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}