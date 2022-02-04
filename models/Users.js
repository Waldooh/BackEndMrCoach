const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

const schema = new Schema({
    uuid: {
        type: String,
        maxlength: 150,
        minlength: 1,
    },
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
    account: {
        type: String,
        enum: ['usuario', 'entrenador', 'alumno'],
        required: true,
    },
    // ------------------------ Student info -------------------------------
    healthGoal: {
        type: String,
    },
    workoutFrecuency: {
        type: String,
    },
    metricSystem: {
        type: String,
    },
    height: {
        type: Number,
        max: 300,
        min: 10,
    },
    weight: {
        type: Number,
        max: 300,
        min: 10,
    },
    age: {
        type: Number,
        max: 99,
        min: 1,
    },
    gender: {
        type: String,
        maxlength: 15,
        minlength: 1,
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
    // payment: {
    //     type: String,
    //     maxlength: 20,
    //     minlength: 1, 
    // },
    // paymentStatus: {
    //     type: Boolean,
    // },
    // scoreCoach: {
    //     type: Number,
    //     max: 5,
    // },
    // ------------------------ Coach info -------------------------------
    birthDate: {
        type: Date,  // se tiene que guardar en formato ISODate ("yyyy-mm-dd")
    },
    mobileNumber: {
        type: String,
        maxlength: 20,
        minlength: 1,
    },
    avatar: {
        type: String,
        maxlength: 150,
        minlength: 1,
    },
    country: {
        type: String,
        maxlength: 30,
        minlength: 1,
    },
    state: {
        type: String,
        maxlength: 30,
        minlength: 1,
    },
    city: {
        type: String,
        maxlength: 30,
        minlength: 1,
    },
    description: {
        type: String,
        maxlength: 150,
        minlength: 1,
    },
    coments: {
        type: String,
        maxlength: 150,
        minlength: 1,
    },
    scoreStudent: {
        type: Number,
        max: 5,
    },
    video1: {
        type: String,
        maxlength: 150,
        minlength: 1,
    },
    video2: {
        type: String,
        maxlength: 150,
        minlength: 1,
    },
    // scoreStudent: {
    //     type: Number,
    //     max: 5,
    // },
    // paymentService: {
    //     type: Number,
    //     max: 20,
    // },
}, { timestamps: true }); 

module.exports = {
    model: mongoose.model("users", schema),
    schema,
}