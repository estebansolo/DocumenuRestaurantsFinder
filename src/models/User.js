import mongoose from "mongoose";

mongoose.set("useCreateIndex", true);

const userSchema = mongoose.Schema({
    username: String,
    email: {
        type: String,
        index: true,
        unique: true
    },
    salt: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", userSchema);

export default User;
