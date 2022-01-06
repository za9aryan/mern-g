const validateLogin = (username, password) => {
    const errors = {}
    if(username.trim() === "") {
        errors.general = "Username must not be empty"
    }
    if(password.trim() === "") {
        errors.general = "Password must not be empty"
    }
    return {
        errors,
        valid: Object.keys(errors) < 1
    }
}

module.exports = validateLogin