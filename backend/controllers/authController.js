const generateTokenAndSetCookie = require("../lib/generateTokenAndSetCookie.js");

const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
    try {
        const { fullname, password, email } = req.body; 
        console.log(req.body);

        const existingUser = await User.findOne({ fullname });
    if (existingUser) {
      const err = new Error("UserName Already Taken");
      err.statusCode = 400;
      return next(err);
        }
        
        const existingemail = await User.findOne({ email });
        if (existingemail) {
            const err = new Error("email Already Taken");
            err.statusCode = 400;
            return next(err);
        }

        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);

        const newUser = new User({
            fullname,
            email,
            password:hashedPassword,
        })
        console.log(newUser)

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
        
            })
        } else {
            const err = new Error("Invalid user Data");
            err.statusCode = 400;
            return next(err);
        }
    } catch(error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error:"email and password are required"
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({error: "Invalid username or password" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user.id,
            fullname: user.fullname,
            email: user.email,
            message:"login succesffully!"
          });
    }catch (error) {
        
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

const logout = async (req, res, next) => {
    try {
        res.clearCookie("jwt", {
            path: "/",
      httpOnly: true,
      sameSite: "none",
      secure: true,
        });
        res.status(200).json({
            message:"Logged out Successfully!",
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch {
        console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    }
}

const authControllers = {
    signup,login,logout,getMe
}

module.exports = authControllers;