const coaches = require("../models/Coaches").model;


const get = async () => {
    const allCoaches = await coaches.find({}).exec();
    return allCoaches;
};


const create = async (coachData) => {
    const { 
        discipline,
        paymentService,
        comments,
        scoreStudent,
        video1,
        video2,
        } = coachData;
    const coach = new coaches({ 
        discipline,
        paymentService,
        comments,
        scoreStudent,
        video1,
        video2,
    });
    const savedCoach = await coach.save();
    return savedCoach;
};


const updateCoach = async (id, coachData) => {
    return await coaches.findByIdAndUpdate(id, coachData, { new: true })
};


module.exports = {
    get,
    create,
    updateCoach
};