const { json } = require("express");
// const User = require("../models/Users").schema;
// const Exercise = require("../models/Exercises").schema;
const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        maxlength: 40,
        minlength: 1,
    },
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'exercises'
    },
    rest: {
        type: String,
    },
    finishDate: {
        type: Date,
    },
    daysTraining: {
        type: Date,
    },
    daysCompleted: {
        type: JSON,        
    },
    workoutComplement: {
        type: JSON,
    },
    comments: {
        type: String,
        maxlength: 150,
    },
    status: {
        type: Boolean,
    },
}, { timestamps: true }); 

module.exports = {
    model: mongoose.model("routine", schema),
    schema,
}