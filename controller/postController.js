const Subject = require("../models/subject");
const User = require("../models/user");
const Grades = require("../models/grade")

const createSubject = async (req, res) => {
    try {
        if (req.user.role !== "teacher") {
            return res.status(403).json({ 
                message: "Faqat o'qituvchilar fan yarata olishadi" 
            });
        }

        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ 
                message: "Fan nomi kiritilmagan" 
            });
        }

        const newSubject = new Subject({
            name,
            teacher: req.user._id
        });

        await newSubject.save();

        res.status(201).json({
            message: "Fan muvaffaqiyatli yaratildi",
            subject: newSubject
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Serverda xatolik yuz berdi", 
            error: error.message 
        });
    }
};

const getSubjects = async (req,res)=>{
    try {
        const subjects = await Subject.find().populate("teacher", "name");
        res.status(200).json({
            message: "Fanlar muvaffaqiyatli olishdi",
            subjects
        });
    } catch (error) {
        res.status(500).json({
            message: "Serverda xatolik yuz berdi",
            error: error.message
        });
    }
}

const createPostGrades = async(req,res)=>{
    try {
        if (req.user.role !== "teacher") {
            return res.status(403).json({ 
                message: "Faqat o'qituvchilar baho qo'yishi mumkin" 
            });
        }

        const {student, subject, grade} = req.body;

        // Check if student exists
        const studentExists = await User.findOne({ _id: student, role: "student" });
        if (!studentExists) {
            return res.status(404).json({ 
                message: "Talaba topilmadi" 
            });
        }

        // Check if subject exists and belongs to the teacher
        const subjectExists = await Subject.findOne({ _id: subject, teacher: req.user._id });
        if (!subjectExists) {
            return res.status(404).json({ 
                message: "Fan topilmadi yoki sizga tegishli emas" 
            });
        }

        const newGrade = new Grades({
            student,
            subject,
            grade,
            teacher: req.user._id
        })  

        await newGrade.save()

        res.status(201).json({
            message: "Baho muvaffaqiyatli yaratildi",
            grade: newGrade
        })  
    } catch (error) {
        res.status(500).json({
            message: "Serverda xatolik yuz berdi",
            error: error.message
        })
    }
}

const getStudents = async (req, res) => {
    try {
        const students = await User.find({ role: "student" }).select("_id fullName");
        res.status(200).json({
            message: "Talabalar muvaffaqiyatli olishdi",
            students
        });
    } catch (error) {
        res.status(500).json({
            message: "Serverda xatolik yuz berdi",
            error: error.message
        });
    }
};

const getGradesById = async (req, res) => {
    try {
        const {id} = req.params
        const grades = await Grades.find({student: id}).populate("subject", "name").populate("teacher", "name")
        res.status(200).json({
            message: "Baho muvaffaqiyatli olishdi",
            grades
        })
    } catch (error) {
        res.status(500).json({
            message: "Serverda xatolik yuz berdi",
            error: error.message
        })
    }
}

module.exports = {
    createSubject,
    getSubjects,
    createPostGrades,
    getStudents,
    getGradesById
};
