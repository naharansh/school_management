const Authorizated_Role = (...role) => {
    return (req, res, next) => {
        console.log(`dsd${req.user}`)

        if (!role.includes(req.user)) {
            return res.status(500).json({ message: 'you are not authorized to do this action' })
        }
        next()
    }
}
module.exports=Authorizated_Role