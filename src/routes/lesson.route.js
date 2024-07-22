const {Router} = require("express");

const { changeLesson, createLesson, getAllLesson, removeLesson } = require("../controllers/lesson.controller");

const isAdmin = require("../middlewares/is-admin-middleware");
const isAuth = require("../middlewares/is-auth-middleware");

const router = Router();

const route = "/lesson";

router.post(`${route}/`, createLesson);//isAdmin
router.get(`${route}/`, getAllLesson);//isAuth
router.put(`${route}/:id`, changeLesson);//isAdmin
router.delete(`${route}/:id`, removeLesson);//isAdmin


module.exports = router;