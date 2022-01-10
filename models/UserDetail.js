const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

const schema = new Schema({
    uuid: {
        type: String,
        maxlength: 150,
        minlength: 1,
    },
    userName: {
        type: String,
        maxlength: 40,
        minlength: 1,
        unique: true,
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
        match: /.+@.*\..*/
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        max: 99,
        min: 1,
    },
    birthDate: {
        type: Date,  // se tiene que guardar en formato ISODate ("yyyy-mm-dd")
    },
    gender: {
        type: String,
        maxlength: 10,
        minlength: 1,
    },
    initialTime: {
        type: Date,
    },
    status: {
        type: Boolean,
    },
    mobileNumber: {
        type: String,
        maxlength: 20,
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
    avatar: {
        type: String,
        maxlength: 150,
        minlength: 1,
    },
    account: {
        type: String,
        enum: ['usuario', 'entrenador', 'alumno'],
        required: true
    },
}, { timestamps: true }); 

module.exports = {
    model: mongoose.model("userDetail", schema),
    schema,
}