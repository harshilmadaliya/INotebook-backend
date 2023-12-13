const mongoose = require('mongoose');
const { Schema } = mongoose;


const AuthSchema = new Schema({
    name: { type: String },
    email: {type: String, unique: true},
    passWord: {type: String,  min: 5},

});
// AuthSchema.index({ email: 1 });
module.exports = mongoose.model("User",AuthSchema)