const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

const schema = new Schema({
    firstName: {
        type: String,
        maxlength: 40,
        minlength: 1,
    },
    lastName: {
        type: String,
        maxlength: 50,
        minlength: 1,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+@.*\..*/
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        maxlength: 10,
        minlength: 1,
    },
    // idUser: {
    //     type: String,
    //     maxlength: 10,
    //     minlength: 1,
    // },
    // idCoach: {
    //     type: String,
    //     maxlength: 10,
    //     minlength: 1,
    // },
    healthGoal: {
        type: String,
        maxlength: 20,
        minlength: 1,
    },
    workoutFrequency: {
        type: String,
    },
    // timeExperience: {
    //     type: String,
    //     maxlength: 20,
    //     minlength: 1,
    // },
    payment: {
        type: String,
        maxlength: 20,
        minlength: 1, 
    },
    paymentStatus: {
        type: Boolean,
    },
    metricSystem: {
        type: String,
        maxlength: 30,
        minlength: 1,
    },
    // comments: {
    //     type: String,
    //     maxlength: 150,
    //     minlength: 1,
    // },
    scoreCoach: {
        type: Number,
        max: 5,
    },
    height: {
        type: Number,
    },
    weight: {
       type: Number,
    },
    age: {
        type: Number,
        max: 99,
        min: 1,
    },
    photoBody1: {
        type: String,
        maxlength: 150,
        minlength: 1,
    },
    photoBody2: {
        type: String,
        maxlength: 150,
        minlength: 1,
    },
    photobody3: {
        type: String,
        maxlength: 150,
        minlength: 1,
    },
    
}, { timestamps: true }); 

module.exports= {
    model: mongoose.model("students", schema),
    schema,
}