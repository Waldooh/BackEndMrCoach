const students = require("../models/Students").model;


const get = async () => {
    const allStudents = await students.find({}).exec();
    return allStudents;
};


const create = async (studentData) => {
    const { 
        healthGoal,
        experience,
        timeExperience,
        payment,
        paymentStatus,
        metricStystem,
        comments,
        scoreCoach,
        height,
        weight,
        photoBody1,
        photoBody2,
        photoBody3
        } = studentData;
    const student = new students({ 
        healthGoal,
        experience,
        timeExperience,
        payment,
        paymentStatus,
        metricStystem,
        comments,
        scoreCoach,
        height,
        weight,
        photoBody1,
        photoBody2,
        photoBody3
    });
    const savedStudent = await student.save();
    return savedStudent;
};


const updateStudent = async (id, studentData) => {
    return await students.findByIdAndUpdate(id, studentData, { new: true })
};


module.exports = {
    get,
    create,
    updateStudent
};