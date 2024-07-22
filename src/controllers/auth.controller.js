const bcrypt = require("bcrypt");

const Joi = require("joi");
const {createToken} = require("../helpers/jwt");
const { prisma } = require("../helpers/connection");

const registerController = async (req, res, next) => {
  try {
    const { phone, password, coursId } = req.body;

    const schema = Joi.object({
      phone: Joi.string().min(5).required(),
      password: Joi.string().min(5).required(),
      coursId: Joi.string().allow(null, '').optional(),
    });

    const { error } = schema.validate({ phone, password, coursId });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // const existingUser = await prisma.user.findUnique({where: {phone}})
    // if (existingUser) {
    //   return res.status(409).json({ message: "This phone number is already taken!" });
    // }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        phone,
        password: hashedPassword,
        coursId,
      },
    });

    const token = createToken({ id: newUser.id, isAdmin: newUser.isAdmin });

    res.json({ message: "Registration successful!", token });
  } catch (error) {
    next(error);
  }
};

  const loginController = async (req, res, next) => {
    try {
      const { phone, password } = req.body;
  
      const schema = Joi.object({
        phone: Joi.string().min(5).required(),
        password: Joi.string().min(5).required(),
      });
  
      const { error } = schema.validate({ phone, password });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      };
  
      const existingUser = await prisma.user.findUnique({where: {phone}})
      if (!existingUser) {
        return res.status(409).json({ message: "Phone or password incorrect!!!" });
      };
  
      const passwordMatch = await bcrypt.compare(password, existingUser.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Incorrect phone or password!!!" });
      };

      const token = createToken({ id: existingUser._id, isAdmin: existingUser.isAdmin });
  
      res.json({ message: "Login successful!!!", data: token });
    } catch (error) {
      next(error)
    }
  };
module.exports = {
    registerController,
    loginController,
}