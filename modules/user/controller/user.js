import { userModel } from "../../../DB/model/user.model.js"

export const userProfile = async (req, res) => {
    const user = await userModel.findById(req.user._id)
    res.json({ message: "User module", user })
}


export const getShareProfile = async (req, res) => {
    const user = await userModel.findById(req.params.id).select('userName profilePic coverPic')
    res.json({ message: "User module", user })
}