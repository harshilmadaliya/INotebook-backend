// import mongoose from 'mongoose';
const mongoose = require('mongoose')
const { Schema } = mongoose;

const noteschema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: { type: String },
    discription: {type: String},
    tag: {type: String},
    // date: Date.now
});

module.exports = mongoose.model("Notes",noteschema)