const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
    },
    muscle: {
        type: String,
    },
    equipment: {
        type: String, // Probar con type {object} para pasar una lista
    },
    series: {
        type: String,
    },
    reps: {
        type: String,
    },
    rest: {
        type: String,
    },
    img: {
        type: String,
    },
    link: {
        type: String, // Investigar tipo de dato para link
    },
}, { timestamps: true });

module.exports = {
    model: mongoose.model("exersice", schema),
    schema,
}