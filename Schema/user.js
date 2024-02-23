const { Schema, model } = require('mongoose')
const UserSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        }
    }

)

const User = model('user', UserSchema)
module.exports = User;