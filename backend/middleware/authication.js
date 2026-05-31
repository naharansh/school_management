const jwt=require('jsonwebtoken')
const role=require('../modules/roles')
const authenticate=async (req,res,next)=>{
    try{
        const token=req.cookies.token
        if (!token) {
           return  res.status(500).json({message:'token is not found'})
        }   
        const verifyToken=jwt.verify(token,process.env.JWT_SECRET)
        if (!verifyToken) {
            return res.status(500).json({message:'token is not verified'})
        }
        const role_name=await role.findOne({where:{id:verifyToken.role_id}})
        if (!role_name) {
            return res.status(500).json({message:'role is not found'})
        }
        req.user=role_name.dataValues.role_name

        next()
        
    }catch(error){
        res.status(500).json({message:'some error is occured',error:error.mesage})
    }
}
module.exports=authenticate