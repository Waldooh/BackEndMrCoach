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
    birthDate: {
        type: Date,  // se tiene que guardar en formato ISODate ("yyyy-mm-dd")
    },
    gender: {
        type: String,
        maxlength: 10,
        minlength: 1,
    },
    mobileNumber: {
        type: String,
        maxlength: 20,
        minlength: 1,
    },
    timeExperience: {
        type: Number,
        max: 2
    },
    discipline: {
        type: String,
        maxlength: 30,
        minlength: 1,
    },
    account: {
        type: String,
        required: true,
        // enum: ['usuario', 'entrenador', 'alumno'],
        // default: 'entrenador'
    },
    // paymentService: {
    //     type: Number,
    //     max: 20,
    // },
    comments: {
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
    
}, { timestamps: true }); 

module.exports = {
    model: mongoose.model("coaches", schema),
    schema,
}