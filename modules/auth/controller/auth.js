import { userModel } from "../../../DB/model/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { myEmail } from "../../../services/sendEmail.js"




export const signup = async (req, res) => {
    try {
        const { email, password, userName } = req.body
        const user = await userModel.findOne({ email }).select("email") 
        if (user) {
            res.json({ message: "Email exist" })
        } else {
            const hashPassword = await bcrypt.hash(password, parseInt(process.env.saltRound))
            const newUser = new userModel({ email, password: hashPassword, userName })
            const savedUser = await newUser.save()
            const token = jwt.sign({ id: savedUser._id }, process.env.tokenEmailSignature, { expiresIn: 60 * 60 })
            const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`
            const message = `
            <a href ='${link}'> Follow to activate u account </a>
            `
            myEmail(savedUser.email, message)
            res.json({ message: "Done", savedUser, link })
        }
    } catch (error) {
        res.json({ message: "catch error", error })
    }
}


export const signin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email }) 
        if (!user) {
            res.json({ message: "in-valid login data email" })
        } else {
            if (!user.confirmEmail) {
                res.json({ message: "please confirm your email first" })
            } else {
                const match = await bcrypt.compare(password, user.password)
                if (!match) {
                    res.json({ message: "in-valid login data password" })

                } else {
                    const token = jwt.sign({ id: user._id, isLoggedIn: true }, process.env.tokenEmail, 
                        { expiresIn: (60 * 60) * 24 })
                    res.json({ message: "Done", token })
                }
            }
        }
    } catch (error) {
        res.json({ message: "catch error", error })
    }
}



export const confirmEmail = async (req, res) => {
    try {
        const { token } = req.params
        const decoded = jwt.verify(token, process.env.tokenEmailSignature)
        const user = await userModel.updateOne({ _id: decoded.id, confirmEmail: false },
            { confirmEmail: true }, { new: true })
        
        user.modifiedCount ? res.json({ message: "Done plz login" }) :
            res.json({ message: "In-valid account or already confirmed" })

    } catch (error) {
        res.json({ message: "catch error", error })

    }

}