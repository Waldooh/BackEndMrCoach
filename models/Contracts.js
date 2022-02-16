const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

const schema = new Schema({
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    // student: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'users',
    //     required: true
    // },
    routine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'routines',
    },
    exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'exercises',
    }
}, { timestamps: true });

module.exports = {
    model: mongoose.model("contracts", schema),
    schema,
}