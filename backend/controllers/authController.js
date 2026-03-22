import User from "../models/userModel.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const isProduction = process.env.NODE_ENV === "production";

// Genrate jwt
const GenrateToken = (res, payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, {
        httpOnly: true,
        // secure:process.env.NODE_ENV ==="production",
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
        maxAge: 24 * 60 * 60 * 1000
    });
    return token;
}
// register User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ message: "please fill all the fields", success: false })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists", success: false })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        return res.json({ message: "message:User registered successfully", success: true })
    } catch (error) {
        console.log(error.message);
        return res.json({ message: "Internal server error", success: false })
    }
}
// login user

export const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: "please fill all the fields", success: false })

        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "User does not exist", success: false })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ message: "Incorrect password", success: false })

        }
        GenrateToken(res, { id: user._id, role: user.isAdmin ? "admin" : "user" });
        return res.json({
            message: "User logged in successfully",
            success: true,
            user: {
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        console.log(error.message);
        return res.json({ message: "Internal server error", success: false })

    }

}


//   logoutUser
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.json({ message: "User logged out successfully", success: true })
    } catch (error) {
        console.log(error.message);
        return res.json({ message: "internal server error", success: false })
    }
}
//   getuser profile
export const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res
                .status(404)
                .json({ message: "user not found", success: false });
        }
        res.json(user)
    } catch (error) {
        return res.json({ message: "Internal server error", success: false })
    }
}


// adminlogin
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: "Please fill all the fields", success: false })
        }
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminpassword = process.env.ADMIN_PASSWORD;

        if (email !== adminEmail || password !== adminpassword) {
            return res.json({ message: "Invalid credentials", success: false })

        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        })
        res.cookie("token", token, {
            httpOnly: true,
            // secure:process.env.NODE_ENV ==="production",
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction,
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.json({
            success: true,
            message: "Admin logged in successfully",
            admin: {
                admin: adminEmail
            }
        })
    } catch (error) {
        console.log(error.message);
        return res.json({ message: "internal server error", success: false })
    }
}


// prvent from user login
export const isAuth = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id).select("-passsword");
        res.json({ success: true, user });
    } catch (error) {
        return res.json({ message: "internal server error", success: false })
    }
}
//  preven from adminlogin 




