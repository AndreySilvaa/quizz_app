import mongoose from "mongoose";

const {Schema, model} = mongoose

const userSchema = new Schema({
    name: {type: String, min: 4, unique: true, required: true},
    password: {type: String, required: true}
})

const userModel = model('User', userSchema)

export default userModel