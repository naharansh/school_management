const user = require('../modules/user')
const bycrypt = require('bcrypt');
const twilo = require('twilio')
const { where } = require('sequelize');
const { validate: isUuid } = require("uuid");
const generateOTP = () => {
    return (Math.random() * 1000000).toFixed()
}
const otp = generateOTP()
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, status, role_id, last_login } = req.body
        if (!email || !password || !role_id || !name) {
            return res.status(500).json({ message: 'fields are required' })
        }
        const hashedPassword = await bycrypt.hash(password, 15)
        console.log(hashedPassword)
        const new_user = await user.create({ name, email, password: hashedPassword, status: status || undefined, role_id, last_login })
        res.status(200).json({ mesage: 'user is created', new_user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ mesage: 'some error is occurred', error: error.mesage })
    }
}
exports.ALLUser = async (req, res) => {
    try {
        const allusers = await user.findAll()
        if (allusers.length === 0) {
            return res.status(500).json({ message: 'users are' })
        }
        res.status(200).json({ message: 'users are', allusers })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', error: error.mesage })
    }
}
exports.User = async (req, res) => {
    try {
        const { id } = req.params
        if (!isUuid(id)) {
            return res.status(500).json({ messgae: 'id is invalid' })
        }
        const users = await user.findByPk(id)
        if (!users) {
            return res.status(500).json({ message: 'user is not found' })
        }
        res.status(200).json({ message: 'all users', users })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', error: error.mesage })
    }
}
exports.UpdateUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!isUuid(id)) {
            return res.status(500).json({ messgae: 'id is invalid' })
        }
        const users = await user.findByPk(id)
        if (!users) {
            return res.status(500).json({ message: 'user is not found' })
        }
        const updateUser = await user.update(req.body, { where: { id: id } })
        if (!updateUser) {
            return res.status(500).json({ message: 'user cant be updated' })
        }
    } catch (error) {
        res.status(500).json({ message: 'user cant be updated' })
    }
}
exports.DeleteUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!isUuid(id)) {
            return res.status(500).json({ messgae: 'id is invalid' })
        }
        const users = await user.findByPk(id)
        if (!users) {
            return res.status(500).json({ message: 'user is not found' })
        }
        const deleteUser = await user.destroy({ where: { id: id } })
        if (!deleteUser) {
            return res.status(500).json({ message: 'user cant be deleted' })
        }
    } catch (error) {

    }
}
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(500).json({ message: 'all fields are required' })
        }
        const find_user = await user.findOne({ where: { email: email } })
        if (!find_user) {
            return res.status(500).json({ message: 'user is not found' })
        }
        const compare_password = await bycrypt.compare(password, find_user.dataValues.password)
        if (!compare_password) {
            return res.status(500).json({ message: 'password does not matched' })
        }
        if (find_user.dataValues.status !== 'active') {
            return res.status(500).json({ message: 'status is not activated' })
        }

        const otp_expiry = Date.now() + 5 * 60 * 1000
        console.log(otp_expiry)
        console.log(otp)
        await find_user.update({
            otp: otp,
            otp_expiry: otp_expiry
        })
        res.cookie('email', find_user.dataValues.email, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        res.status(200).json({ message: 'otp verified page', otp })

    } catch (error) {
        res.status(500).json({ message: 'some error is occured', error: error.mesage })
    }
}
exports.Mobile_Number = async (req, res) => {
    try {
        const { phone } = req.body
        if (!phone) {
            return res.status(500).json({ message: 'phone is required' })
        }
        const account_id = process.env.ACCOUNT_SID
        const auth_token = process.env.AUTH_TOKEN
        // const otp=generateOTP()
        const new_twilo = new twilo(account_id, auth_token)
        const response = await new_twilo.messages.create({
            from: process.env.T_NUMBER,
            to: phone,
            body: `your otp for the verification ${otp}`

        })
        res.status(200).json({ message: 'otp is send to your mobile', response })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'some error is occured', error: error.mesage })
    }
}
exports.Verify_OTP = async (req, res) => {
    try {
        const { otp } = req.body
        if (!otp) {
            return res.status(500).json({ message: 'otp is not find' })
        }
        const email = req.cookies.email
        console.log(email)
        if (!email) {
            return res.status(500).json({ message: 'email is not found' })
        }
        const find_users = await user.findOne({ where: { email } })
        if (!find_users) {
            return res.status(500).json({ message: 'user is not found' })
        }
        if (!find_users.otp) {
            return res.status(404).json({ message: "OTP not found" });
        }
        const now = Date.now();
        const expiryTime = new Date(find_users.dataValues.otp_expiry).getTime();
        const expired = now > expiryTime;


        if (expired) {
            return res.status(400).json({ message: "OTP expired" });
        }
        console.log(find_users.dataValues.otp)
        if (find_users.dataValues.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        res.status(200).json({ messageL: 'user is verified' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'some error is occured', error: error.mesage })
    }
}