const validateInput = (email, password, username, confirmPassword) => {
    const errors = {};
    if (username.trim() === "") {
        errors.username = "Username must not be empty"
    }
    if (email.trim() === "") {
        errors.email = "Email must not be empty";
    } else {
        const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        if (!regEx.test(email)) {
            errors.email = "Email must be a valid email address"
        }
    }
    if (password === "") {
        errors.password = "Password must not br empty"
    } else {
        if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords must match"
        }
    }

    return {
        errors,
        valid: Object.keys(errors) < 1
    }
}

module.exports = validateInput