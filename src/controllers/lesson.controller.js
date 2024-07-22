const { prisma } = require("../helpers/connection")

const createLesson = async(req, res, next) => {
    try {
        const { title, description } = req.body

        const newLesson = await prisma.lesson.create({data: {
            title,
            description
        }});

        res.status(201).json({message: "Success", data: newLesson});
    } catch (error) {
        next(error)
    }
}

const getAllLesson = async(req, res, next) => {
    try {
        const allLessons = await prisma.lesson.findMany();

        res.status(201).json({message: "Success", data: allLessons});
    } catch (error) {
        next(error)
    }
}

const changeLesson = async(req, res, next) => {
    try {
        const {id} = req.params;

        const { title, description } = req.body

        const findId = await prisma.lesson.findFirst({where: {id}})

        if(!findId)
            return res.status(401).json({message: "This teacher not found!!!"})

        const changeLesson = await prisma.lesson.update({where: {id}, data: {
            title,
            description
        }})

        res.status(201).json({message: "Success", data: changeLesson});
    } catch (error) {
        next(error)
    }
}

const removeLesson = async(req, res, next) => {
    try {
        const { id } = req.params

        const findId = await prisma.lesson.findFirst({where: {id}})

        if(!findId)
            return res.status(401).json({message: "This Teacher not found!!!"})

        await prisma.lesson.delete({where:{id}})

        res.status(201).json({message: "Success"});
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createLesson,
    getAllLesson,
    changeLesson,
    removeLesson
}