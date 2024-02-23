require("dotenv").config();
const { connect } = require("mongoose");
const { hash, compare } = require("bcryptjs");
const UserSchema = require("../Schema/user");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      await connect(process.env.MONGO_URI);
      const checkUser = await UserSchema.findOne({ email });

      if (checkUser) {
        const decryptpass = await compare(password, checkUser.password);
        if (decryptpass) {
          res.json({
            message: "Succesfully Login",
            user: checkUser,
          });
        } else {
          res.status(400).json({ message: "Incorrect Password" });
        }
      } else {
        res.status(404).json({ message: "User Not Found" });
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    res.status(400).json({ message: "Required Field Missing" });
  }
};
const signup = async (req, res) => {
  const { username, password, email } = req.body;
  if (email && password && username) {
    try {
      await connect(process.env.MONGO_URI);
      const checkUser = await UserSchema.exists({ email });
      if (!checkUser) {
        await UserSchema.create({
          username,
          password: await hash(password, 10),
          email,
        });
        res.status(201).json({
          message: "User Created Successfully",
        });
      } else {
        res.json({
          message: "User Already Exist",
        });
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    res.status(403).json({
      message: "Required Missing Fields",
    });
  }
};

module.exports = { login, signup };
