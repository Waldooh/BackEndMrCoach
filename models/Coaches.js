const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

const schema = new Schema({
    uuid:{
        type: String,
        maxlength: 10,
        minlength: 1,
    },
    idUser: {
        type: String,
        maxlength: 10,
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
    paymentService: {
        type: Number,
        max: 20,
    },
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