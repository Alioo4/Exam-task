const {Router} = require("express");

const { changeCourse, createCourse, getAllCourse, removeCourse } = require("../controllers/course.controller");

const isAdmin = require("../middlewares/is-admin-middleware");
const isAuth = require("../middlewares/is-auth-middleware");

const router = Router();

const route = "/course";

router.post(`${route}/`, createCourse);//isAdmin
router.get(`${route}/`, getAllCourse);//isAuth
router.put(`${route}/:id`, changeCourse);//isAdmin
router.delete(`${route}/:id`, removeCourse);//isAdmin


module.exports = router;