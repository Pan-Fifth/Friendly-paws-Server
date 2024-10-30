const prisma = require('../configs/prisma')
const createError = require('../utils/createError')

exports.aPets =async(req,res,next)=>{
    try {
        // const user = req.user
        // if(!user){
        //     return createError(402,"not Authorized")
        // }
        const allAvaiPets = await prisma.pets.findMany({
            where:{ 
                status : "AVAILABLE",
            },
            select:{
                id: true,
                name_en: true,
                name_th:true,
                age:true,
                gender:true,
                image:{
                    select:{
                        url:true
                    }

                }
            },
        })
        console.log("getApets")
        res.json(allAvaiPets)
    } catch (err) {
        next(err)
    }
}