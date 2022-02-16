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
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    idWorkout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercises'
    },
    finishDate: {
        type: Date,
    },
    typeRoutine: {
      type: String,
        maxlength: 10,
        minlength: 1,
    },
    daysTraining: {
        type: JSON,
    },
    daysTrained: {
        type: JSON,        
    },
    exercise: {
        type: JSON,
    },
    cardio: {
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