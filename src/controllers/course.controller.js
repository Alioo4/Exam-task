const { prisma } = require("../helpers/connection")

const createCourse = async(req, res, next) => {
    try {
        const { name, description } = req.body

        const newCours = await prisma.cours.create({data: {
            name,
            description,
        }});

        res.status(201).json({message: "Success", data: newCours});
    } catch (error) {
        next(error)
    }
}

const getAllCourse = async(req, res, next) => {
    try {
        const allCourses = await prisma.cours.findMany();

        res.status(201).json({message: "Success", data: allCourses});
    } catch (error) {
        next(error)
    }
}

const changeCourse = async(req, res, next) => {
    try {
        const {id} = req.params;

        const { name, description } = req.body

        const findId = await prisma.cours.findFirst({where: {id}})

        if(!findId)
            return res.status(401).json({message: "This course not found!!!"})

        const changeCourse = await prisma.cours.update({where: {id}, data: {
            name,
            description
        }})

        res.status(201).json({message: "Success", data: changeCourse});
    } catch (error) {
        next(error)
    }
}

const removeCourse = async(req, res, next) => {
    try {
        const { id } = req.params

        const findId = await prisma.cours.findFirst({where: {id}})

        if(!findId)
            return res.status(401).json({message: "This course not found!!!"})

        await prisma.cours.delete({where:{id}})

        res.status(201).json({message: "Success"});
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createCourse,
    getAllCourse,
    changeCourse,
    removeCourse
}