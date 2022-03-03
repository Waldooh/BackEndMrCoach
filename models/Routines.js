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
    exercise: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'exercises'
        }
    ],
    cardio: {
        type: String,
    },
    pic: {
        type: String,
    },
    level: {
        type: String,
    },
    group: {
        type: String,
    },
    start: {
        type: Date,
    },
    end: {
        type: Date,
    },
    days: [
        {
            type: String,        
        }
    ],
    notes: {
        type: String,
        maxlength: 250,
    },
    status: {
        type: Boolean,
    },
}, { timestamps: true }); 

module.exports = {
    model: mongoose.model("routine", schema),
    schema,
}