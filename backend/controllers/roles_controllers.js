const roles = require('../modules/roles')
const { validate: isUuid } = require("uuid");
exports.createRole = async (req, res) => {
    try {
        const { role_name, description } = req.body
        const create_Role = await roles.create({ role_name, description })
        res.status(200).json({ message: 'role is created', create_Role })

    } catch (error) {
        res.status(500).json(500).json({ message: 'some error is occured', error: error.message })
    }
}
exports.AllRole = async (req, res) => {
    try {
        const all_roles = await roles.findAll()
        if (all_roles.length === 0) {
            return res.status(400).json({ message: 'roles are not found' })
        }
        res.status(200).json({ message: 'all roles', all_roles })
    } catch (error) {
        res.status(200).json({ message: 'some error is occured', error: error.message })
    }
}
exports.Update_Roles = async (req, res) => {
    try {
        const { id } = req.params
        if (!isUuid(id)) {
            return res.status(400).json({ message: "Invalid UUID format" })
        }
        const findrole = await roles.findByPk(id)
        if (!findrole) {
            return res.status(500).json({ message: 'role is not found' })
        }
        const updated_role = await roles.update(req.body, { where: { id: id } })
        if (!updated_role) {
            return res.status(500).json({ message: 'role cant be updated' })
        }
        res.status(200).json({ message: 'roles are updated', updated_role })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}
exports.Delete_Roles=async (req,res) => {
    try {
          const { id } = req.params
        if (!isUuid(id)) {
            return res.status(400).json({ message: "Invalid UUID format" })
        }
        const findrole = await roles.findByPk(id)
        if (!findrole) {
            return res.status(500).json({ message: 'role is not found' })
        }
        const deleted_role = await roles.destroy({where:{id:id}})
        if (!deleted_role) {
            return res.status(500).json({ message: 'role cant be deleted' })
        }
        res.status(200).json({ message: 'roles are deleted', deleted_role })
    } catch (error) {
        
    }
}
exports.Role=async (req,res) => {
    try {
         const { id } = req.params
        if (!isUuid(id)) {
            return res.status(400).json({ message: "Invalid UUID format" })
        }
        const findrole = await roles.findByPk(id)
        if (!findrole) {
            return res.status(500).json({ message: 'role is not found' })
        }
        res.status(200).json({ message: 'role is',findrole })
    } catch (error) {
         res.status(500).json({ message: 'some error is occured',error:error.message        })
    }
}